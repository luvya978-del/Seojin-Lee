import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  PortfolioMasterData, 
  HeroData, 
  CompetitionItem, 
  ProjectDetail, 
  SkillItem, 
  AwardItem, 
  ExternalLinkItem, 
  ProfileInfo 
} from '../types';
import { DEFAULT_PORTFOLIO_DATA } from '../data/portfolioData';

interface PortfolioContextType {
  data: PortfolioMasterData;
  loading: boolean;
  isAdminUnlocked: boolean;
  adminUsername: string | null;
  authLoading: boolean;
  currentRoute: string;
  isAdminAuthModalOpen: boolean;
  isEditorOpen: boolean;
  editorSection: string;
  editorItem: any;
  // Navigation
  navigate: (path: string) => void;
  // Auth
  loginAdmin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  openAdminAuthModal: () => void;
  closeAdminAuthModal: () => void;
  unlockAdmin: (password: string) => boolean;
  lockAdmin: () => void;
  // Editor
  openEditor: (section?: string, item?: any) => void;
  closeEditor: () => void;
  // Updaters
  updatePortfolio: (newData: PortfolioMasterData) => Promise<void>;
  updateHero: (hero: HeroData) => Promise<void>;
  updateCompetitions: (items: CompetitionItem[]) => Promise<void>;
  addOrUpdateCompetition: (item: CompetitionItem) => Promise<void>;
  deleteCompetition: (id: string) => Promise<void>;
  updateProjects: (projects: ProjectDetail[]) => Promise<void>;
  addOrUpdateProject: (project: ProjectDetail) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateSkills: (skills: SkillItem[]) => Promise<void>;
  updateAwards: (awards: AwardItem[]) => Promise<void>;
  addOrUpdateAward: (award: AwardItem) => Promise<void>;
  deleteAward: (id: string) => Promise<void>;
  updateExternalLinks: (links: ExternalLinkItem[]) => Promise<void>;
  addOrUpdateExternalLink: (link: ExternalLinkItem) => Promise<void>;
  deleteExternalLink: (id: string) => Promise<void>;
  updateProfile: (profile: ProfileInfo) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const MASTER_DOC_PATH = 'portfolio/data';
const ADMIN_TOKEN_KEY = 'seojin_admin_auth_token';
const LOCAL_STORAGE_DATA_KEY = 'seojin_portfolio_master_data_v2';

// Recursively remove any `undefined` values from an object or array so Firestore never throws unsupported field value error
function cleanForFirestore<T>(input: T): T {
  if (input === null || input === undefined) {
    return null as any;
  }
  if (Array.isArray(input)) {
    return input
      .filter((item) => item !== undefined)
      .map((item) => cleanForFirestore(item)) as any;
  }
  if (typeof input === 'object' && !(input instanceof Date)) {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(input as Record<string, any>)) {
      if (value !== undefined) {
        cleaned[key] = cleanForFirestore(value);
      }
    }
    return cleaned as T;
  }
  return input;
}

// Offloads base64 data URLs to server uploads API if available, otherwise retains compressed dataUrl safely
async function offloadDataUrlToBackend(val: string | undefined, prefix: string): Promise<string> {
  if (!val || typeof val !== 'string') return val || '';
  if (!val.startsWith('data:image/')) return val;

  // Try server image upload API (if backend is running)
  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl: val, filename: prefix })
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.url) {
        return json.url;
      }
    }
  } catch (_) {
    // Backend upload endpoint not available (e.g., static host); retain compressed dataUrl safely
  }

  return val;
}

// Safely processes portfolio fields to offload images when possible
async function processAndOffloadPortfolioImages(input: PortfolioMasterData): Promise<PortfolioMasterData> {
  const cloned: PortfolioMasterData = JSON.parse(JSON.stringify(input));

  try {
    if (cloned.hero) {
      cloned.hero.heroImage = await offloadDataUrlToBackend(cloned.hero.heroImage, 'hero_main');
      cloned.hero.secondaryHeroImage = await offloadDataUrlToBackend(cloned.hero.secondaryHeroImage, 'hero_sub');
    }

    if (cloned.competitions && Array.isArray(cloned.competitions)) {
      for (let i = 0; i < cloned.competitions.length; i++) {
        const c = cloned.competitions[i];
        if (c.image) {
          c.image = await offloadDataUrlToBackend(c.image, `comp_${c.id || i}`);
        }
      }
    }

    if (cloned.projects && Array.isArray(cloned.projects)) {
      for (let i = 0; i < cloned.projects.length; i++) {
        const p = cloned.projects[i];
        if (p.image) {
          p.image = await offloadDataUrlToBackend(p.image, `proj_${p.id || i}`);
        }
      }
    }

    if (cloned.awards && Array.isArray(cloned.awards)) {
      for (let i = 0; i < cloned.awards.length; i++) {
        const a = cloned.awards[i];
        if (a.image) {
          a.image = await offloadDataUrlToBackend(a.image, `award_${a.id || i}`);
        }
      }
    }

    if (cloned.profile) {
      cloned.profile.avatarUrl = await offloadDataUrlToBackend(cloned.profile.avatarUrl, 'profile_avatar');
    }
  } catch (err) {
    console.warn('Image offload non-critical notice:', err);
  }

  return cloned;
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioMasterData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        }
      } catch (_) {}
    }
    return DEFAULT_PORTFOLIO_DATA;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      return pathname.startsWith('/admin') ? '/admin' : '/';
    }
    return '/';
  });

  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editorSection, setEditorSection] = useState<string>('all');
  const [editorItem, setEditorItem] = useState<any>(null);

  // Client-side Navigation Handler
  const navigate = (path: string) => {
    const targetPath = path.startsWith('/admin') ? '/admin' : '/';
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentRoute(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      setCurrentRoute(pathname.startsWith('/admin') ? '/admin' : '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Verify and restore Admin Session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem(ADMIN_TOKEN_KEY);
        if (!token) {
          setIsAdminUnlocked(false);
          setAdminUsername(null);
          setAuthLoading(false);
          return;
        }

        const res = await fetch('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          const json = await res.json();
          if (json.authenticated) {
            setIsAdminUnlocked(true);
            setAdminUsername(json.user?.username || 'david0131');
          } else {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            setIsAdminUnlocked(false);
            setAdminUsername(null);
          }
        } else {
          // If server /api/admin/me returns 404 or fails (e.g. Vercel client deployment), check local token format
          if (token && token.length > 10) {
            setIsAdminUnlocked(true);
            setAdminUsername('david0131');
          } else {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            setIsAdminUnlocked(false);
            setAdminUsername(null);
          }
        }
      } catch (err) {
        console.warn('Session verification fallback:', err);
      } finally {
        setAuthLoading(false);
      }
    };

    checkSession();
  }, []);

  // Sanitize loaded data to remove obsolete VEX / CAD links and guarantee images
  const sanitizeData = (raw: any): PortfolioMasterData => {
    const rawCompetitions: CompetitionItem[] = Array.isArray(raw?.competitions) 
      ? raw.competitions 
      : DEFAULT_PORTFOLIO_DATA.competitions;

    const defaultCompMap = new Map(DEFAULT_PORTFOLIO_DATA.competitions.map(c => [c.id, c.image]));
    const defaultAwardMap = new Map(DEFAULT_PORTFOLIO_DATA.awards.map(a => [a.id, a.image]));

    const cleanedCompetitions = rawCompetitions.map((comp) => {
      // Check if external link points to CAD or mentions VEX/CAD
      const isCadOrVexLink = 
        Boolean(comp.externalLink?.includes('onshape') ||
        comp.externalLink?.includes('cad') ||
        comp.linkText?.toLowerCase().includes('cad') ||
        comp.linkText?.toLowerCase().includes('vex'));

      const cleanExternalLink = isCadOrVexLink ? '' : (comp.externalLink || '');
      const cleanLinkText = isCadOrVexLink ? '' : (comp.linkText || '');

      let title = comp.title || '';
      let description = comp.description || '';
      let reflection = comp.reflection || '';
      const roles = (comp.roles || []).map((r) => r.replace(/V5\s*Pro|VEX/gi, '로봇 제어').trim());

      if (title.toLowerCase().includes('vex')) {
        title = 'First Lego League (FLL)';
      }
      if (description) {
        description = description.replace(/V5\s*Pro|VEX/gi, '자율주행 시스템');
      }
      if (reflection) {
        reflection = reflection.replace(/V5\s*Pro|VEX/gi, '정밀 자율주행');
      }

      // Ensure valid image
      const fallbackImg = defaultCompMap.get(comp.id) || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80";
      const image = (comp.image && comp.image.trim() !== '') ? comp.image : fallbackImg;

      const item: CompetitionItem = {
        ...comp,
        title,
        description,
        reflection,
        roles,
        image
      };

      if (cleanExternalLink) {
        item.externalLink = cleanExternalLink;
      } else {
        delete item.externalLink;
      }

      if (cleanLinkText) {
        item.linkText = cleanLinkText;
      } else {
        delete item.linkText;
      }

      return item;
    });

    const rawAwards: AwardItem[] = Array.isArray(raw?.awards)
      ? raw.awards
      : DEFAULT_PORTFOLIO_DATA.awards;

    const cleanedAwards = rawAwards.map((award) => {
      const fallbackAwardImg = defaultAwardMap.get(award.id) || "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80";
      const image = (award.image && award.image.trim() !== '') ? award.image : fallbackAwardImg;
      return {
        ...award,
        image
      };
    });

    const rawHero = { ...DEFAULT_PORTFOLIO_DATA.hero, ...(raw?.hero || {}) };
    if (rawHero.badge?.toLowerCase().includes('v5') || rawHero.badge?.toLowerCase().includes('vex')) {
      rawHero.badge = '자율주행 / 로봇공학';
    }

    return {
      hero: rawHero,
      competitions: cleanedCompetitions,
      projects: Array.isArray(raw?.projects) ? raw.projects : DEFAULT_PORTFOLIO_DATA.projects,
      skills: Array.isArray(raw?.skills) ? raw.skills : DEFAULT_PORTFOLIO_DATA.skills,
      awards: cleanedAwards,
      externalLinks: Array.isArray(raw?.externalLinks) ? raw.externalLinks : DEFAULT_PORTFOLIO_DATA.externalLinks,
      profile: { ...DEFAULT_PORTFOLIO_DATA.profile, ...(raw?.profile || {}) },
      updatedAt: raw?.updatedAt || new Date().toISOString()
    };
  };

  // Synchronize with Firebase Firestore
  useEffect(() => {
    const portfolioDocRef = doc(db, 'portfolio', 'data');

    // Real-time listener (strictly read-only, never auto-write to prevent write loops)
    const unsubscribe = onSnapshot(
      portfolioDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetched = docSnap.data() as PortfolioMasterData;
          const sanitized = sanitizeData(fetched);
          setData(sanitized);
          try {
            localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(sanitized));
          } catch (_) {}
        } else {
          // If remote doc does not exist yet, try to seed once quietly
          setDoc(portfolioDocRef, cleanForFirestore(DEFAULT_PORTFOLIO_DATA)).catch((err) => {
            console.warn('Initial Firestore seed warning:', err);
          });
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, MASTER_DOC_PATH);
        // On error (e.g. quota-exhausted or offline), ensure local cache is loaded
        try {
          const saved = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
          if (saved) {
            setData(JSON.parse(saved));
          }
        } catch (_) {}
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save changes to LocalStorage and Firestore
  const updatePortfolio = async (newData: PortfolioMasterData) => {
    try {
      // 1. Offload large base64 images if server is available
      const offloaded = await processAndOffloadPortfolioImages(newData);

      const sanitizedData: PortfolioMasterData = {
        ...offloaded,
        updatedAt: new Date().toISOString()
      };

      // 2. Immediately update state and LocalStorage for zero latency and offline persistence
      setData(sanitizedData);
      try {
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(sanitizedData));
      } catch (lsErr) {
        console.warn('LocalStorage save notice:', lsErr);
      }

      // 3. Sync to Firestore (non-blocking for quota errors)
      const portfolioDocRef = doc(db, 'portfolio', 'data');
      await setDoc(portfolioDocRef, cleanForFirestore(sanitizedData));
    } catch (error) {
      console.warn('Firestore sync notice during update:', error);
      handleFirestoreError(error, OperationType.WRITE, MASTER_DOC_PATH);
      // We do not throw error so the user's admin changes remain saved in local state and LocalStorage
    }
  };

  // Server-side login implementation
  const loginAdmin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();
      if (res.ok && json.success && json.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, json.token);
        setIsAdminUnlocked(true);
        setAdminUsername(json.user?.username || username);
        setIsAdminAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, error: json.error || '아이디 또는 비밀번호가 일치하지 않습니다.' };
      }
    } catch (err: any) {
      console.error('Login error:', err);
      // Fallback for offline / direct testing if server request fails
      if (username.trim() === 'david0131' && (password.trim() === 'seojin0131' || password.trim() === '0131')) {
        setIsAdminUnlocked(true);
        setAdminUsername('david0131');
        setIsAdminAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: '서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.' };
    }
  };

  // Logout method
  const logoutAdmin = async () => {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY);
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      console.warn('Logout notification error:', err);
    } finally {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      setIsAdminUnlocked(false);
      setAdminUsername(null);
      setIsEditorOpen(false);
    }
  };

  // Auth methods for quick modal
  const unlockAdmin = (password: string): boolean => {
    if (password.trim() === 'seojin0131' || password.trim() === '0131') {
      loginAdmin('david0131', password.trim());
      setIsAdminUnlocked(true);
      setAdminUsername('david0131');
      setIsAdminAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    logoutAdmin();
  };

  const openAdminAuthModal = () => {
    setIsAdminAuthModalOpen(true);
  };

  const closeAdminAuthModal = () => {
    setIsAdminAuthModalOpen(false);
  };

  const openEditor = (section: string = 'all', item: any = null) => {
    setEditorSection(section);
    setEditorItem(item);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditorItem(null);
  };

  // Section Specific Updaters
  const updateHero = async (hero: HeroData) => {
    await updatePortfolio({ ...data, hero });
  };

  const updateCompetitions = async (competitions: CompetitionItem[]) => {
    await updatePortfolio({ ...data, competitions });
  };

  const addOrUpdateCompetition = async (item: CompetitionItem) => {
    const exists = data.competitions.some((c) => c.id === item.id);
    let updated: CompetitionItem[];
    if (exists) {
      updated = data.competitions.map((c) => (c.id === item.id ? item : c));
    } else {
      updated = [item, ...data.competitions];
    }
    await updateCompetitions(updated);
  };

  const deleteCompetition = async (id: string) => {
    const updated = data.competitions.filter((c) => c.id !== id);
    await updateCompetitions(updated);
  };

  const updateProjects = async (projects: ProjectDetail[]) => {
    await updatePortfolio({ ...data, projects });
  };

  const addOrUpdateProject = async (project: ProjectDetail) => {
    const exists = data.projects.some((p) => p.id === project.id);
    let updated: ProjectDetail[];
    if (exists) {
      updated = data.projects.map((p) => (p.id === project.id ? project : p));
    } else {
      updated = [project, ...data.projects];
    }
    await updateProjects(updated);
  };

  const deleteProject = async (id: string) => {
    const updated = data.projects.filter((p) => p.id !== id);
    await updateProjects(updated);
  };

  const updateSkills = async (skills: SkillItem[]) => {
    await updatePortfolio({ ...data, skills });
  };

  const updateAwards = async (awards: AwardItem[]) => {
    await updatePortfolio({ ...data, awards });
  };

  const addOrUpdateAward = async (award: AwardItem) => {
    const exists = data.awards.some((a) => a.id === award.id);
    let updated: AwardItem[];
    if (exists) {
      updated = data.awards.map((a) => (a.id === award.id ? award : a));
    } else {
      updated = [award, ...data.awards];
    }
    await updateAwards(updated);
  };

  const deleteAward = async (id: string) => {
    const updated = data.awards.filter((a) => a.id !== id);
    await updateAwards(updated);
  };

  const updateExternalLinks = async (externalLinks: ExternalLinkItem[]) => {
    await updatePortfolio({ ...data, externalLinks });
  };

  const addOrUpdateExternalLink = async (link: ExternalLinkItem) => {
    const exists = data.externalLinks.some((l) => l.id === link.id);
    let updated: ExternalLinkItem[];
    if (exists) {
      updated = data.externalLinks.map((l) => (l.id === link.id ? link : l));
    } else {
      updated = [link, ...data.externalLinks];
    }
    await updateExternalLinks(updated);
  };

  const deleteExternalLink = async (id: string) => {
    const updated = data.externalLinks.filter((l) => l.id !== id);
    await updateExternalLinks(updated);
  };

  const updateProfile = async (profile: ProfileInfo) => {
    await updatePortfolio({ ...data, profile });
  };

  const resetToDefault = async () => {
    if (window.confirm('모든 데이터를 초기 기본값으로 복원하시겠습니까?')) {
      await updatePortfolio(DEFAULT_PORTFOLIO_DATA);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        isAdminUnlocked,
        adminUsername,
        authLoading,
        currentRoute,
        navigate,
        loginAdmin,
        logoutAdmin,
        isAdminAuthModalOpen,
        isEditorOpen,
        editorSection,
        editorItem,
        openAdminAuthModal,
        closeAdminAuthModal,
        unlockAdmin,
        lockAdmin,
        openEditor,
        closeEditor,
        updatePortfolio,
        updateHero,
        updateCompetitions,
        addOrUpdateCompetition,
        deleteCompetition,
        updateProjects,
        addOrUpdateProject,
        deleteProject,
        updateSkills,
        updateAwards,
        addOrUpdateAward,
        deleteAward,
        updateExternalLinks,
        addOrUpdateExternalLink,
        deleteExternalLink,
        updateProfile,
        resetToDefault
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

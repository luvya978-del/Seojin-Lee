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
  isAdminAuthModalOpen: boolean;
  isEditorOpen: boolean;
  editorSection: string;
  editorItem: any;
  // Auth
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
const ADMIN_STORAGE_KEY = 'seojin_portfolio_admin_unlocked_0131';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioMasterData>(DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editorSection, setEditorSection] = useState<string>('all');
  const [editorItem, setEditorItem] = useState<any>(null);

  // Synchronize with Firebase Firestore
  useEffect(() => {
    const portfolioDocRef = doc(db, 'portfolio', 'data');

    // Check if initial document exists, if not seed with DEFAULT_PORTFOLIO_DATA
    getDoc(portfolioDocRef)
      .then((snap) => {
        if (!snap.exists()) {
          setDoc(portfolioDocRef, DEFAULT_PORTFOLIO_DATA).catch((err) => {
            console.warn('Initial Firestore seed warning:', err);
          });
        }
      })
      .catch((err) => {
        console.warn('Initial Firestore check warning:', err);
      });

    // Real-time listener
    const unsubscribe = onSnapshot(
      portfolioDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetched = docSnap.data() as PortfolioMasterData;
          // Merge with defaults to guarantee all required fields exist
          setData({
            hero: { ...DEFAULT_PORTFOLIO_DATA.hero, ...(fetched.hero || {}) },
            competitions: Array.isArray(fetched.competitions) ? fetched.competitions : DEFAULT_PORTFOLIO_DATA.competitions,
            projects: Array.isArray(fetched.projects) ? fetched.projects : DEFAULT_PORTFOLIO_DATA.projects,
            skills: Array.isArray(fetched.skills) ? fetched.skills : DEFAULT_PORTFOLIO_DATA.skills,
            awards: Array.isArray(fetched.awards) ? fetched.awards : DEFAULT_PORTFOLIO_DATA.awards,
            externalLinks: Array.isArray(fetched.externalLinks) ? fetched.externalLinks : DEFAULT_PORTFOLIO_DATA.externalLinks,
            profile: { ...DEFAULT_PORTFOLIO_DATA.profile, ...(fetched.profile || {}) },
            updatedAt: fetched.updatedAt || new Date().toISOString()
          });
        } else {
          setData(DEFAULT_PORTFOLIO_DATA);
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, MASTER_DOC_PATH);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save changes to Firestore
  const updatePortfolio = async (newData: PortfolioMasterData) => {
    try {
      const sanitizedData: PortfolioMasterData = {
        ...newData,
        updatedAt: new Date().toISOString()
      };
      setData(sanitizedData);
      const portfolioDocRef = doc(db, 'portfolio', 'data');
      await setDoc(portfolioDocRef, sanitizedData);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, MASTER_DOC_PATH);
    }
  };

  // Auth methods for password "0131"
  const unlockAdmin = (password: string): boolean => {
    if (password.trim() === '0131') {
      setIsAdminUnlocked(true);
      sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      setIsAdminAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsEditorOpen(false);
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

export interface Role {
  name: string;
}

export interface ExternalLinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: 'video' | 'github' | 'cad' | 'blog' | 'document' | 'other';
  icon?: string;
  isHighlight?: boolean;
}

export interface HeroData {
  name: string;
  titleSuffix: string;
  badge: string;
  studentBadge: string;
  tagline: string;
  pastCompetitions: string;
  bulletPoints: { icon: string; text: string }[];
  currentGoal: string;
  quote: string;
  systemStatus: {
    label: string;
    value: string;
    healthPercent: number;
  };
  heroImage: string;
  secondaryHeroImage: string;
  externalLinks?: ExternalLinkItem[];
}

export interface CompetitionItem {
  id: string;
  year: string;
  date?: string;
  category: string;
  categoryType: 'cospace' | 'robomission' | 'vex' | 'wro' | 'fll' | 'other';
  title: string;
  team: string;
  roles: string[];
  wins: string;
  reflection: string;
  description?: string;
  image?: string;
  externalLink?: string;
  linkText?: string;
  featured?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  score: number; // e.g. 5 for 5/5, 4 for 4/5
  maxScore: number;
  percentage?: number;
  category: 'core' | 'technical' | 'soft';
  icon: string;
  description?: string;
  externalLink?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category?: string;
  iconType: 'trophy' | 'star' | 'medal' | 'shield' | 'award';
  badgeColor?: string;
  description?: string;
  image?: string;
  externalLink?: string;
  linkText?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  techStack: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
  externalLink?: string;
  linkText?: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  email: string;
  location: string;
  school: string;
  interests: string[];
  bio: string;
  avatarUrl?: string;
  stats: {
    label: string;
    value: string;
  }[];
  externalLinks?: ExternalLinkItem[];
}

export interface PortfolioMasterData {
  hero: HeroData;
  competitions: CompetitionItem[];
  projects: ProjectDetail[];
  skills: SkillItem[];
  awards: AwardItem[];
  externalLinks: ExternalLinkItem[];
  profile: ProfileInfo;
  updatedAt?: string;
}

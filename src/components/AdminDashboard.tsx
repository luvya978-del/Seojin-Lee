import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RobotLogoIcon } from './RobotLogo';
import { 
  LogOut, 
  ExternalLink, 
  Edit3, 
  Plus, 
  Trash2, 
  Trophy, 
  Sparkles, 
  FolderGit2, 
  Award, 
  Link2, 
  User, 
  Save, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  Eye,
  Sliders
} from 'lucide-react';
import { CompetitionItem, AwardItem, ProjectDetail, ExternalLinkItem } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    data, 
    adminUsername, 
    logoutAdmin, 
    navigate, 
    openEditor, 
    deleteCompetition, 
    deleteProject, 
    deleteAward, 
    deleteExternalLink,
    resetToDefault
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'overview' | 'competitions' | 'projects' | 'awards' | 'links' | 'profile'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-xl bg-[#7864f6]/20 border border-[#7864f6]/30 text-[#7864f6]">
            <RobotLogoIcon className="w-6 h-6" color="#7864f6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-wide font-['Outfit']">
                SEOJIN<span className="text-[#7864f6]">.DEV</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#7864f6]/20 text-[#9b8afb] border border-[#7864f6]/30">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              실시간 포트폴리오 관리 시스템
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>관리자: <strong className="text-white font-mono">{adminUsername || 'david0131'}</strong></span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
            title="공개 포트폴리오 사이트 보기"
          >
            <Eye className="w-4 h-4 text-[#7864f6]" />
            <span className="hidden sm:inline">공개 사이트 보기</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => openEditor('all')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all shadow-md shadow-[#7864f6]/20 cursor-pointer font-['Outfit']"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>전체 수정 콘솔</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 border border-slate-700/80 transition-colors cursor-pointer"
            title="로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800 scrollbar-none text-xs font-bold font-['Outfit']">
          {[
            { id: 'overview', label: '대시보드 개요', icon: Layers },
            { id: 'competitions', label: `대회 여정 (${data.competitions?.length || 0})`, icon: Trophy },
            { id: 'projects', label: `프로젝트 & 기술 (${data.projects?.length || 0})`, icon: FolderGit2 },
            { id: 'awards', label: `수상 & 인증 (${data.awards?.length || 0})`, icon: Award },
            { id: 'links', label: `외부 링크 (${data.externalLinks?.length || 0})`, icon: Link2 },
            { id: 'profile', label: '프로필 및 소개', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7864f6] text-white shadow-lg shadow-[#7864f6]/25'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Status Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>대회 출전 이력</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {data.competitions?.length || 0}개
                </div>
                <div className="text-[11px] text-slate-500 mt-1">로보컵, FLL, WRO 등</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>프로젝트 &amp; 모델</span>
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {data.projects?.length || 0}개
                </div>
                <div className="text-[11px] text-slate-500 mt-1">자율주행 및 제어 알고리즘</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>수상 및 인증</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {data.awards?.length || 0}개
                </div>
                <div className="text-[11px] text-slate-500 mt-1">공식 수상 실적</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>외부 연결 링크</span>
                  <Link2 className="w-4 h-4 text-[#7864f6]" />
                </div>
                <div className="text-2xl font-black text-white font-['Outfit']">
                  {data.externalLinks?.length || 0}개
                </div>
                <div className="text-[11px] text-slate-500 mt-1">GitHub, 유튜브, 자료 등</div>
              </div>
            </div>

            {/* Quick Section Editors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Section Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-['Outfit'] text-[#9b8afb] uppercase tracking-wider">
                      히어로 헤더 설정
                    </span>
                    <button
                      onClick={() => openEditor('hero')}
                      className="text-xs text-[#7864f6] hover:text-[#9b8afb] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> 수정
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {data.hero?.name} {data.hero?.titleSuffix}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-3">
                    "{data.hero?.tagline}"
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {data.hero?.currentGoal}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>배지: <strong className="text-slate-300">{data.hero?.badge}</strong></span>
                  <span>대회 태그: <strong className="text-slate-300">{data.hero?.pastCompetitions}</strong></span>
                </div>
              </div>

              {/* Profile Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-['Outfit'] text-[#9b8afb] uppercase tracking-wider">
                      프로필 정보
                    </span>
                    <button
                      onClick={() => openEditor('profile')}
                      className="text-xs text-[#7864f6] hover:text-[#9b8afb] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> 수정
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={data.profile?.avatarUrl}
                      alt={data.profile?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#7864f6]/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{data.profile?.name}</h4>
                      <p className="text-xs text-slate-400">{data.profile?.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {data.profile?.bio}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>위치: <strong className="text-slate-300">{data.profile?.location}</strong></span>
                  <span>학교: <strong className="text-slate-300">{data.profile?.school}</strong></span>
                </div>
              </div>
            </div>

            {/* Global Settings & Reset */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-['Outfit']">
                  전체 데이터 관리 및 기본값 복원
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  모든 수정 사항은 데이터베이스(Firebase Firestore)에 즉시 저장되어 공개 포트폴리오에 실시간 반영됩니다.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefault}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>초기 데이터로 복원</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Competitions */}
        {activeTab === 'competitions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">대회 여정 관리</h3>
                <p className="text-xs text-slate-400">국내외 로봇 대회 출전 이력 및 성과를 편집합니다.</p>
              </div>
              <button
                onClick={() => openEditor('competitions')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer font-['Outfit'] shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>대회 추가/수정</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.competitions?.map((comp: CompetitionItem) => (
                <div
                  key={comp.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-[#7864f6]/20 text-[#9b8afb] text-[10px] font-mono font-bold">
                          {comp.year} • {comp.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{comp.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditor('competitions', comp)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${comp.title}' 항목을 삭제하시겠습니까?`)) {
                              deleteCompetition(comp.id);
                              showToast('대회 항목이 삭제되었습니다.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-emerald-400 font-semibold mb-2">
                      🏆 {comp.wins}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {comp.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>역할: {comp.roles?.join(', ')}</span>
                    <span className="font-mono text-slate-400">{comp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">프로젝트 및 기술 스펙 관리</h3>
                <p className="text-xs text-slate-400">자율주행 알고리즘, 하드웨어 기구, 소프트웨어 프로젝트 목록입니다.</p>
              </div>
              <button
                onClick={() => openEditor('projects')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer font-['Outfit'] shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>프로젝트 추가/수정</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects?.map((proj: ProjectDetail) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                          {proj.badge}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{proj.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditor('projects', proj)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${proj.title}' 프로젝트를 삭제하시겠습니까?`)) {
                              deleteProject(proj.id);
                              showToast('프로젝트가 삭제되었습니다.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>기술: {proj.techStack?.join(', ')}</span>
                    <span className="font-mono text-cyan-400">{proj.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Awards */}
        {activeTab === 'awards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">수상 및 인증 관리</h3>
                <p className="text-xs text-slate-400">공식 수상 내역 및 로봇/코딩 자격 인증서 목록입니다.</p>
              </div>
              <button
                onClick={() => openEditor('awards')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer font-['Outfit'] shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>수상/자격증 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.awards?.map((award: AwardItem) => (
                <div
                  key={award.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                          {award.category || '수상'} • {award.year}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{award.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditor('awards', award)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${award.title}' 항목을 삭제하시겠습니까?`)) {
                              deleteAward(award.id);
                              showToast('수상 항목이 삭제되었습니다.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {award.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>구분: {award.subtitle}</span>
                    <span className="font-mono text-emerald-400">{award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: External Links */}
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">외부 링크 &amp; 연구 미디어</h3>
                <p className="text-xs text-slate-400">GitHub, 오픈소스 코드, Onshape CAD 도면, 유튜브 등 링크를 관리합니다.</p>
              </div>
              <button
                onClick={() => openEditor('links')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer font-['Outfit'] shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>외부 링크 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.externalLinks?.map((link: ExternalLinkItem) => (
                <div
                  key={link.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold uppercase">
                          {link.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">{link.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditor('links', link)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${link.title}' 링크를 삭제하시겠습니까?`)) {
                              deleteExternalLink(link.id);
                              showToast('링크가 삭제되었습니다.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {link.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7864f6] hover:underline flex items-center gap-1 truncate max-w-[200px]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">{link.url}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">프로필 및 자기소개 관리</h3>
                <p className="text-xs text-slate-400">이서진 학생의 사진, 연락처, 관심 분야 및 비전 소개글입니다.</p>
              </div>
              <button
                onClick={() => openEditor('profile')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer font-['Outfit'] shadow-md"
              >
                <Edit3 className="w-4 h-4" />
                <span>프로필 수정하기</span>
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={data.profile?.avatarUrl}
                  alt={data.profile?.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-[#7864f6]/30 shadow-lg"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-xl font-bold text-white">{data.profile?.name}</h4>
                  <p className="text-xs text-[#9b8afb] font-medium">{data.profile?.school}</p>
                  <p className="text-xs text-slate-400">{data.profile?.email} • {data.profile?.location}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h5 className="text-xs font-bold text-slate-300 font-['Outfit'] uppercase tracking-wider mb-2">
                  소개글 (Bio)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {data.profile?.bio}
                </p>
              </div>

              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-300 font-['Outfit'] uppercase tracking-wider mb-2">
                  관심 분야 (Interests)
                </h5>
                <div className="flex flex-wrap gap-2">
                  {data.profile?.interests?.map((interest: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#7864f6]/10 text-[#9b8afb] border border-[#7864f6]/20 text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

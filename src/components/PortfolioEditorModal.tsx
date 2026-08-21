import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  Trophy, 
  Wrench, 
  Code, 
  Award, 
  User, 
  Check, 
  Sparkles,
  Link2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { 
  ExternalLinkItem, 
  CompetitionItem, 
  ProjectDetail, 
  SkillItem, 
  AwardItem, 
  HeroData, 
  ProfileInfo 
} from '../types';
import { ImageUploadInput } from './ImageUploadInput';

export const PortfolioEditorModal: React.FC = () => {
  const { 
    isEditorOpen, 
    closeEditor, 
    editorSection, 
    data, 
    updatePortfolio, 
    resetToDefault 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<string>('links');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [formData, setFormData] = useState(data);

  // Sync when editor opens
  useEffect(() => {
    if (isEditorOpen) {
      setFormData(data);
      if (editorSection && editorSection !== 'all') {
        setActiveTab(editorSection);
      }
    }
  }, [isEditorOpen, data, editorSection]);

  if (!isEditorOpen) return null;

  const handleSaveAll = async () => {
    setSaveStatus('저장 중...');
    try {
      await updatePortfolio(formData);
      setSaveStatus('Firebase에 저장 완료!');
      setTimeout(() => {
        setSaveStatus('');
        closeEditor();
      }, 1200);
    } catch (err) {
      setSaveStatus('저장 실패. 다시 시도해주세요.');
    }
  };

  // Helper for Hero
  const handleHeroChange = (field: keyof HeroData, val: any) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  };

  // Helper for External Links
  const handleAddLink = () => {
    const newLink: ExternalLinkItem = {
      id: `link-${Date.now()}`,
      title: '새 외부 링크',
      url: 'https://',
      description: '설명을 입력하세요',
      category: 'video',
      icon: 'Link',
      isHighlight: true
    };
    setFormData(prev => ({
      ...prev,
      externalLinks: [newLink, ...prev.externalLinks]
    }));
  };

  const handleUpdateLink = (id: string, field: keyof ExternalLinkItem, val: any) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.map(l => l.id === id ? { ...l, [field]: val } : l)
    }));
  };

  const handleDeleteLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter(l => l.id !== id)
    }));
  };

  // Helper for Competitions
  const handleAddCompetition = () => {
    const newComp: CompetitionItem = {
      id: `comp-${Date.now()}`,
      year: '2026',
      category: '로봇 대회',
      categoryType: 'wro',
      title: '새 대회 이름',
      team: '팀 이름',
      roles: ['프로그래밍', '테스팅'],
      wins: '수상 내역',
      reflection: '배운 점 및 소감',
      description: '대회 미션 설명',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      externalLink: 'https://',
      linkText: '대회 영상 보기'
    };
    setFormData(prev => ({
      ...prev,
      competitions: [newComp, ...prev.competitions]
    }));
  };

  const handleUpdateCompetition = (id: string, field: keyof CompetitionItem, val: any) => {
    setFormData(prev => ({
      ...prev,
      competitions: prev.competitions.map(c => c.id === id ? { ...c, [field]: val } : c)
    }));
  };

  const handleDeleteCompetition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      competitions: prev.competitions.filter(c => c.id !== id)
    }));
  };

  // Helper for Projects
  const handleAddProject = () => {
    const newProj: ProjectDetail = {
      id: `proj-${Date.now()}`,
      title: '새 로봇 프로젝트',
      badge: 'Pybricks',
      subtitle: '로봇 서브타이틀',
      description: '로봇 한 줄 요약',
      fullDescription: '로봇 상세 설명',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80'
      ],
      techStack: ['Pybricks', 'PID 제어', 'C++'],
      specifications: [
        { label: '구동부', value: '4모터 디퍼렌셜' },
        { label: '센서', value: '광학 컬러 센서, 자이로' }
      ],
      keyFeatures: ['정밀 PID 자율주행', '모듈형 기구 그리퍼'],
      externalLink: 'https://github.com',
      linkText: 'GitHub 소스코드'
    };
    setFormData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const handleUpdateProject = (id: string, field: keyof ProjectDetail, val: any) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: val } : p)
    }));
  };

  const handleDeleteProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Helper for Awards
  const handleAddAward = () => {
    const newAward: AwardItem = {
      id: `award-${Date.now()}`,
      title: '새 수상 실적',
      subtitle: '금상 / 최우수상',
      year: '2026',
      category: '전국대회 부문',
      iconType: 'trophy',
      description: '수상 상세 사유 및 성과',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
      externalLink: 'https://',
      linkText: '공식 인증서 링크'
    };
    setFormData(prev => ({
      ...prev,
      awards: [newAward, ...prev.awards]
    }));
  };

  const handleUpdateAward = (id: string, field: keyof AwardItem, val: any) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.map(a => a.id === id ? { ...a, [field]: val } : a)
    }));
  };

  const handleDeleteAward = (id: string) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Banner */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7864f6] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold font-['Outfit']">
                  포트폴리오 관리자 수정 콘솔
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Firebase 실시간 연동
                </span>
              </div>
              <p className="text-xs text-slate-400">
                전체 메뉴의 이미지 URL, 외부 링크, 대회, 프로젝트 및 텍스트를 실시간으로 편집합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all shadow-md cursor-pointer font-['Outfit']"
            >
              <Save className="w-4 h-4" />
              <span>{saveStatus || 'Firebase에 저장'}</span>
            </button>
            <button
              onClick={closeEditor}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-bold font-['Outfit']">
          {[
            { id: 'links', label: '외부 링크 & 허브', icon: Link2 },
            { id: 'hero', label: '히어로 & 메인 이미지', icon: ImageIcon },
            { id: 'competitions', label: '대회 여정 & 영상링크', icon: Trophy },
            { id: 'projects', label: '로봇 프로젝트 & CAD/코드', icon: Wrench },
            { id: 'skills', label: '보유 역량 매트릭스', icon: Code },
            { id: 'awards', label: '수상 실적 & 인증', icon: Award },
            { id: 'profile', label: '프로필 정보', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7864f6] text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white space-y-6">
          
          {/* TAB 1: EXTERNAL LINKS HUB */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-[#7864f6]" />
                    전체 외부 링크 관리자 (External Links Hub)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    유튜브 경기 영상, 깃허브 코드, Onshape 3D CAD 도면, 노션 일지 등의 외부 링크를 등록하고 관리합니다.
                  </p>
                </div>
                <button
                  onClick={handleAddLink}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7864f6]/10 hover:bg-[#7864f6]/20 text-[#7864f6] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 링크 추가</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.externalLinks.map((link, idx) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#7864f6]/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase">
                            링크 제목
                          </label>
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                            placeholder="예: WRO 2026 주행 영상"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#7864f6]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-500 uppercase">
                            외부 URL 주소
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#7864f6]"
                            />
                            {link.url && (
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                                title="링크 테스트"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">
                          부가 설명 (옵션)
                        </label>
                        <input
                          type="text"
                          value={link.description || ''}
                          onChange={(e) => handleUpdateLink(link.id, 'description', e.target.value)}
                          placeholder="예: 경기장 라인트레이싱 시연 영상"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#7864f6]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">
                          카테고리 분류
                        </label>
                        <select
                          value={link.category || 'video'}
                          onChange={(e) => handleUpdateLink(link.id, 'category', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#7864f6]"
                        >
                          <option value="video">유튜브 / 동영상 (Video)</option>
                          <option value="github">GitHub / 소스코드</option>
                          <option value="cad">3D CAD 도면 (Onshape 등)</option>
                          <option value="document">노션 / 연구 일지 (Document)</option>
                          <option value="blog">블로그 / 웹사이트</option>
                          <option value="other">기타 외부 링크</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HERO & MAIN IMAGES */}
          {activeTab === 'hero' && (
            <div className="space-y-5">
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#7864f6]" />
                히어로 섹션 및 대표 이미지 편집
              </h4>

              {/* Image Upload Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploadInput
                  label="메인 히어로 로봇 사진"
                  value={formData.hero.heroImage}
                  onChange={(val) => handleHeroChange('heroImage', val)}
                  aspectRatio="video"
                  recommendedSize="1200x800 이상 (16:9)"
                  helperText="홈페이지 최상단 대표 비주얼로 표시됩니다. 내 사진 파일 업로드 또는 URL 입력이 가능합니다."
                />

                <ImageUploadInput
                  label="보조 히어로 로봇 그래픽"
                  value={formData.hero.secondaryHeroImage}
                  onChange={(val) => handleHeroChange('secondaryHeroImage', val)}
                  aspectRatio="video"
                  recommendedSize="800x600 권장"
                  helperText="헤더 서브 카드 및 모바일 뷰 비주얼에 활용됩니다."
                />
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">이름 및 타이틀</label>
                  <input
                    type="text"
                    value={formData.hero.name}
                    onChange={(e) => handleHeroChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:outline-none focus:border-[#7864f6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">타이틀 접미사</label>
                  <input
                    type="text"
                    value={formData.hero.titleSuffix}
                    onChange={(e) => handleHeroChange('titleSuffix', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:outline-none focus:border-[#7864f6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">좌우명 / 슬로건</label>
                  <input
                    type="text"
                    value={formData.hero.tagline}
                    onChange={(e) => handleHeroChange('tagline', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#7864f6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">참가 대회 목록</label>
                  <input
                    type="text"
                    value={formData.hero.pastCompetitions}
                    onChange={(e) => handleHeroChange('pastCompetitions', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#7864f6]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">현재 목표 및 엔지니어링 철학</label>
                  <textarea
                    rows={2}
                    value={formData.hero.currentGoal}
                    onChange={(e) => handleHeroChange('currentGoal', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#7864f6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPETITIONS & IMAGES/LINKS */}
          {activeTab === 'competitions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#7864f6]" />
                    대회 여정 &amp; 이미지 / 외부 링크 편집
                  </h4>
                  <p className="text-xs text-slate-500">
                    대회별 사진 이미지 URL과 대회 주행 영상 / 결과 공지 링크를 설정할 수 있습니다.
                  </p>
                </div>
                <button
                  onClick={handleAddCompetition}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7864f6]/10 hover:bg-[#7864f6]/20 text-[#7864f6] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 대회 추가</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.competitions.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-[#7864f6]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#7864f6]/10 text-[#7864f6] font-mono font-bold text-xs">
                          {comp.year}
                        </span>
                        <h5 className="font-bold text-slate-800 text-sm">{comp.title}</h5>
                      </div>
                      <button
                        onClick={() => handleDeleteCompetition(comp.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">대회명 (공식 명칭)</label>
                        <input
                          type="text"
                          value={comp.title}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">연도</label>
                        <input
                          type="text"
                          value={comp.year}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'year', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">부문 / 리그</label>
                        <input
                          type="text"
                          value={comp.category}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'category', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <ImageUploadInput
                        label="대회 현장 및 로봇 사진"
                        value={comp.image || ''}
                        onChange={(val) => handleUpdateCompetition(comp.id, 'image', val)}
                        aspectRatio="video"
                        recommendedSize="800x500 권장"
                        helperText="대회 경기 현장, 로봇 제작 과정 또는 수상 기념 사진을 등록합니다."
                      />

                      <div>
                        <label className="text-[11px] font-bold text-slate-500">대회 영상 / 외부 링크 URL (유튜브 등)</label>
                        <input
                          type="url"
                          value={comp.externalLink || ''}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'externalLink', e.target.value)}
                          placeholder="https://youtube.com/..."
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">수상 내역 (WINS)</label>
                        <input
                          type="text"
                          value={comp.wins}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'wins', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#7864f6]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">팀 명칭</label>
                        <input
                          type="text"
                          value={comp.team}
                          onChange={(e) => handleUpdateCompetition(comp.id, 'team', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500">참가 소감 및 배운 점</label>
                      <textarea
                        rows={2}
                        value={comp.reflection}
                        onChange={(e) => handleUpdateCompetition(comp.id, 'reflection', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS & CAD/CODE LINKS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#7864f6]" />
                    로봇 프로젝트 &amp; CAD/코드 링크 편집
                  </h4>
                  <p className="text-xs text-slate-500">
                    프로젝트 메인 이미지, 갤러리 이미지 및 CAD 도면/GitHub 외부 링크를 설정합니다.
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7864f6]/10 hover:bg-[#7864f6]/20 text-[#7864f6] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 프로젝트 추가</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-[#7864f6]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-800 text-sm">{proj.title}</h5>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">프로젝트 명칭</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">뱃지 / 플랫폼</label>
                        <input
                          type="text"
                          value={proj.badge}
                          onChange={(e) => handleUpdateProject(proj.id, 'badge', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <ImageUploadInput
                        label="프로젝트 및 기구 사진"
                        value={proj.image || ''}
                        onChange={(val) => handleUpdateProject(proj.id, 'image', val)}
                        aspectRatio="video"
                        recommendedSize="900x600 권장"
                        helperText="로봇 완성체, 3D CAD 렌더링 샷, 회로 기판 등의 사진을 등록합니다."
                      />

                      <div>
                        <label className="text-[11px] font-bold text-slate-500">외부 CAD / GitHub 링크 URL (Onshape, GitHub 등)</label>
                        <input
                          type="url"
                          value={proj.externalLink || ''}
                          onChange={(e) => handleUpdateProject(proj.id, 'externalLink', e.target.value)}
                          placeholder="https://cad.onshape.com or github"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500">상세 설명</label>
                      <textarea
                        rows={2}
                        value={proj.fullDescription}
                        onChange={(e) => handleUpdateProject(proj.id, 'fullDescription', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <Code className="w-5 h-5 text-[#7864f6]" />
                보유 역량 &amp; 기술 매트릭스 편집
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.skills.map((skill, i) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">{skill.name}</span>
                      <span className="font-mono text-xs text-[#7864f6] font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">점수 (1-5)</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={skill.score}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setFormData(prev => ({
                              ...prev,
                              skills: prev.skills.map((s, idx) => idx === i ? { ...s, score: val, percentage: Math.round((val / 5) * 100) } : s)
                            }));
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">백분율 (%)</label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={skill.percentage || 100}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setFormData(prev => ({
                              ...prev,
                              skills: prev.skills.map((s, idx) => idx === i ? { ...s, percentage: val } : s)
                            }));
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AWARDS */}
          {activeTab === 'awards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#7864f6]" />
                    수상 실적 &amp; 공식 인증서 링크
                  </h4>
                  <p className="text-xs text-slate-500">
                    상장 이미지 URL 및 대회 공식 인증 페이지 외부 링크를 등록합니다.
                  </p>
                </div>
                <button
                  onClick={handleAddAward}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7864f6]/10 hover:bg-[#7864f6]/20 text-[#7864f6] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 수상 실적 추가</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.awards.map((awd) => (
                  <div
                    key={awd.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 hover:border-[#7864f6]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-800 text-sm">{awd.title}</h5>
                      <button
                        onClick={() => handleDeleteAward(awd.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">대회명</label>
                        <input
                          type="text"
                          value={awd.title}
                          onChange={(e) => handleUpdateAward(awd.id, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">수상 타이틀</label>
                        <input
                          type="text"
                          value={awd.subtitle}
                          onChange={(e) => handleUpdateAward(awd.id, 'subtitle', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#7864f6]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500">연도</label>
                        <input
                          type="text"
                          value={awd.year}
                          onChange={(e) => handleUpdateAward(awd.id, 'year', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <ImageUploadInput
                        label="상장 및 인증서 사진"
                        value={awd.image || ''}
                        onChange={(val) => handleUpdateAward(awd.id, 'image', val)}
                        aspectRatio="video"
                        recommendedSize="800x600 권장"
                        helperText="공식 상장, 인증서, 트로피 사진을 등록합니다."
                      />

                      <div>
                        <label className="text-[11px] font-bold text-slate-500">공식 웹사이트 / 외부 링크 (대회 주최측 공지 등)</label>
                        <input
                          type="url"
                          value={awd.externalLink || ''}
                          onChange={(e) => handleUpdateAward(awd.id, 'externalLink', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <User className="w-5 h-5 text-[#7864f6]" />
                프로필 및 소개 정보 편집
              </h4>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <ImageUploadInput
                  label="프로필 사진 (아바타)"
                  value={formData.profile.avatarUrl || ''}
                  onChange={(val) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, avatarUrl: val } }))}
                  aspectRatio="square"
                  recommendedSize="400x400 (정사각형)"
                  helperText="개발자 프로필 및 관리자 헤더에 사용될 본인 사진을 등록합니다."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">이름</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, name: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">역할 / 직함</label>
                  <input
                    type="text"
                    value={formData.profile.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, role: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">이메일</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, email: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">지역 / 거주지</label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, location: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">자기소개</label>
                  <textarea
                    rows={3}
                    value={formData.profile.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, bio: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>기본 데이터로 초기화</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={closeEditor}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold shadow-md transition-all cursor-pointer font-['Outfit']"
            >
              <Check className="w-4 h-4" />
              <span>{saveStatus || 'Firebase에 변경사항 저장하기'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

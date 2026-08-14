import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowRight, 
  Cpu, 
  GraduationCap, 
  Wrench, 
  Code2, 
  Sparkles, 
  Quote, 
  CheckCircle2,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenSpecs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenSpecs }) => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();
  const { hero } = data;

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-12 left-1/4 -z-10 w-96 h-96 bg-[#7864f6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 -z-10 w-80 h-80 bg-[#7864f6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* V5 PRO / ROBOTICS Eyebrow Tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#7864f6] rounded-full"></span>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7864f6] uppercase font-['Outfit']">
                {hero.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#7864f6]/10 text-[#7864f6] border border-[#7864f6]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7864f6] animate-pulse"></span>
                {hero.studentBadge}
              </span>

              {isAdminUnlocked && (
                <button
                  onClick={() => openEditor('hero')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#7864f6]/15 hover:bg-[#7864f6]/25 text-[#7864f6] text-[11px] font-bold transition-colors cursor-pointer"
                  title="히어로 섹션 수정"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>수정</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4">
              <span className="block font-['Outfit']">{hero.name}</span>
              <span className="block font-['Outfit'] text-[#7864f6]">
                {hero.titleSuffix}
              </span>
            </h1>

            {/* Korean Tagline */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight mb-2">
              &quot;{hero.tagline}&quot;
            </p>

            {/* Past Competitions Ribbon */}
            <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mb-6">
              {hero.pastCompetitions}
            </p>

            {/* Core Capability Badges */}
            <div className="w-full max-w-xl bg-white border border-[#7864f6]/20 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2 text-slate-800 bg-[#7864f6]/5 p-2.5 rounded-xl border border-[#7864f6]/15">
                  <GraduationCap className="w-4 h-4 text-[#7864f6] shrink-0" />
                  <span className="truncate">로봇공학 학습</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 bg-[#7864f6]/5 p-2.5 rounded-xl border border-[#7864f6]/15">
                  <Wrench className="w-4 h-4 text-[#7864f6] shrink-0" />
                  <span className="truncate">로봇 메커니즘 &amp; 제어</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800 bg-[#7864f6]/5 p-2.5 rounded-xl border border-[#7864f6]/15">
                  <Code2 className="w-4 h-4 text-[#7864f6] shrink-0" />
                  <span className="truncate">C++ &amp; Python</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="uppercase tracking-wider font-semibold text-[11px] block text-[#7864f6] mb-0.5">
                    현재 목표 (Current Goal)
                  </strong>
                  {hero.currentGoal}
                </p>
              </div>
            </div>

            {/* Call to Action and Quote */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onExplore}
                id="hero-explore-btn"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-[#7864f6]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-['Outfit']"
              >
                <span>대회 여정 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Goal Quote Box */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#7864f6]/20 shadow-2xs">
                <Quote className="w-4 h-4 text-[#7864f6] fill-[#7864f6]/20 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700 italic">
                  {hero.quote}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - High Tech Robotics Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1.5 bg-[#7864f6]/20 rounded-3xl blur-lg"></div>

              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-2xl group cursor-pointer"
                   onClick={onOpenSpecs}
                   title="클릭하여 하드웨어 시스템 사양 보기">
                
                {/* Robot Gear / Hardware Photo */}
                <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden">
                  <img
                    src={hero.heroImage}
                    alt="고정밀 로봇 기어박스 조립체"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 contrast-105"
                  />
                  {/* Tech Overlay Grid */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-[#7864f6] border border-[#7864f6]/40 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7864f6] animate-ping"></span>
                      실시간 시스템
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-slate-700">
                      자율주행 시스템
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7864f6] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7864f6]"></span>
                    </span>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#7864f6]/10 text-[#7864f6] shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">
                        {hero.systemStatus?.label || '시스템 상태'}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight truncate font-['Outfit']">
                        {hero.systemStatus?.value || '대회 출전 최적화 완료'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        준비 완료
                      </span>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#7864f6] h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${hero.systemStatus?.healthPercent || 98}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Decorative Tech Nodes */}
              <div className="hidden sm:block absolute -top-3 -right-3 p-2 bg-white rounded-xl shadow-md border border-[#7864f6]/20 text-[#7864f6]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

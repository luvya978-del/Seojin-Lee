import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CompetitionItem } from '../types';
import { Trophy, Award, ExternalLink, Edit3, Plus, Video } from 'lucide-react';
import { motion } from 'motion/react';

interface CompetitionJourneyProps {
  onSelectCompetition?: (item: CompetitionItem) => void;
}

export const CompetitionJourney: React.FC<CompetitionJourneyProps> = ({ onSelectCompetition }) => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | '2026' | 'past'>('all');

  const filteredItems = data.competitions.filter(item => {
    if (activeFilter === '2026') return item.year === '2026';
    if (activeFilter === 'past') return item.year !== '2026';
    return true;
  });

  return (
    <section id="journey" className="py-20 bg-white relative">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#7864f6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7864f6] uppercase font-mono">
              주요 성과 및 이력
            </span>
            {isAdminUnlocked && (
              <button
                onClick={() => openEditor('competitions')}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7864f6]/10 text-[#7864f6] text-xs font-bold hover:bg-[#7864f6]/20 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>대회 관리</span>
              </button>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight mt-2 font-serif-heading">
            대회 여정 (Competition Journey)
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            로봇 공학 챔피언십 출전 기록과 기술적 문제 해결 및 팀워크 성장 스토리입니다.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-['Outfit'] ${
                activeFilter === 'all'
                  ? 'bg-[#7864f6] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              전체 이력
            </button>
            <button
              onClick={() => setActiveFilter('2026')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-['Outfit'] ${
                activeFilter === '2026'
                  ? 'bg-[#7864f6] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              2026 시즌
            </button>
            <button
              onClick={() => setActiveFilter('past')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer font-['Outfit'] ${
                activeFilter === 'past'
                  ? 'bg-[#7864f6] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              2023 - 2024
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#7864f6]/30 -translate-x-1/2"></div>
          
          {/* Mobile Left Vertical Line */}
          <div className="lg:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-[#7864f6]/30"></div>

          <div className="space-y-12 lg:space-y-16">
            {filteredItems.map((comp, index) => {
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-5 lg:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full bg-[#7864f6] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                      {comp.year === '2026' ? (
                        <Trophy className="w-4 h-4" />
                      ) : (
                        <Award className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Card Container */}
                  <div
                    className={`pl-12 lg:pl-0 ${
                      isRight
                        ? 'lg:col-start-2 lg:pl-10'
                        : 'lg:col-start-1 lg:pr-10 lg:text-left'
                    }`}
                  >
                    <div
                      onClick={() => onSelectCompetition?.(comp)}
                      className="bg-white rounded-2xl p-6 sm:p-7 border border-[#7864f6]/20 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer hover:border-[#7864f6] relative overflow-hidden"
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#7864f6]/10 text-[#7864f6] font-mono">
                          {comp.year}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#7864f6]/10 text-[#7864f6] border border-[#7864f6]/20 font-['Outfit']">
                          {comp.category}
                        </span>
                      </div>

                      {/* Main Competition Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#7864f6] transition-colors font-['Outfit']">
                        {comp.title}
                      </h3>

                      {/* Team Name */}
                      <div className="text-xs sm:text-sm font-bold text-[#7864f6] mt-1 mb-4 font-['Outfit']">
                        {comp.team}
                      </div>

                      {/* Roles */}
                      <div className="mb-4">
                        <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase font-mono mb-1.5">
                          담당 역할 (ROLES)
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {comp.roles.map((role, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-xs font-medium px-2.5 py-0.8 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Wins */}
                      <div className="mb-4">
                        <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase font-mono mb-1">
                          수상 내역 (WINS)
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800">
                          {comp.wins}
                        </div>
                      </div>

                      {/* Reflection Box */}
                      <div className="mt-4 p-3.5 rounded-xl bg-[#7864f6]/5 border border-[#7864f6]/15">
                        <div className="text-[10px] font-bold tracking-wider text-[#7864f6] uppercase font-mono mb-1">
                          회고 및 배운 점 (REFLECTION)
                        </div>
                        <p className="text-xs sm:text-[13px] italic text-slate-700 leading-relaxed">
                          &quot;{comp.reflection}&quot;
                        </p>
                      </div>

                      {/* External Link or Video Pill */}
                      {comp.externalLink && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <a
                            href={comp.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7864f6] hover:text-[#6550e8] hover:underline"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>{comp.linkText || '대회 영상 / 외부 링크'}</span>
                          </a>
                          <ExternalLink className="w-3.5 h-3.5 text-[#7864f6]" />
                        </div>
                      )}

                      {/* Hover Learn More indicator */}
                      <div className="mt-3 flex items-center justify-end text-[11px] font-bold text-[#7864f6] opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <span>상세 사진 &amp; 모달 보기</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Empty placeholder for alignment on desktop opposite side */}
                  <div
                    className={`hidden lg:block ${
                      isRight ? 'lg:col-start-1' : 'lg:col-start-2'
                    }`}
                  ></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

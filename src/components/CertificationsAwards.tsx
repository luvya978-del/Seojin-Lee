import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AwardItem } from '../types';
import { 
  ShieldCheck, 
  Star, 
  Trophy, 
  Medal, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface CertificationsAwardsProps {
  onSelectAward?: (award: AwardItem) => void;
}

export const CertificationsAwards: React.FC<CertificationsAwardsProps> = ({ onSelectAward }) => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();
  const [selectedYear, setSelectedYear] = useState<'all' | '2026' | '2024' | '2023'>('all');

  const triggerConfetti = (e: React.MouseEvent, award: AwardItem) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#7864f6', '#9a8cf8', '#5d46e2', '#c4bbfd', '#ffffff']
    });

    onSelectAward?.(award);
  };

  const getAwardIcon = (type: string) => {
    switch (type) {
      case 'shield':
        return (
          <div className="w-10 h-10 rounded-full bg-[#7864f6]/10 text-[#7864f6] flex items-center justify-center border border-[#7864f6]/20 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        );
      case 'star':
        return (
          <div className="w-10 h-10 rounded-full bg-[#7864f6]/10 text-[#7864f6] flex items-center justify-center border border-[#7864f6]/20 shrink-0">
            <Star className="w-5 h-5" />
          </div>
        );
      case 'medal':
        return (
          <div className="w-10 h-10 rounded-full bg-[#7864f6]/10 text-[#7864f6] flex items-center justify-center border border-[#7864f6]/20 shrink-0">
            <Medal className="w-5 h-5" />
          </div>
        );
      case 'trophy':
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-[#7864f6]/10 text-[#7864f6] flex items-center justify-center border border-[#7864f6]/20 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
        );
    }
  };

  const filteredAwards = data.awards.filter(award => {
    if (selectedYear === 'all') return true;
    return award.year === selectedYear;
  });

  return (
    <section id="awards" className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7864f6] uppercase font-mono">
              수상 및 공인 인증
            </span>
            {isAdminUnlocked && (
              <button
                onClick={() => openEditor('awards')}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7864f6]/10 text-[#7864f6] text-xs font-bold hover:bg-[#7864f6]/20 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>수상 실적 수정</span>
              </button>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight mt-1 font-serif-heading">
            수상 및 인증 (Certifications &amp; Awards)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            항목을 클릭하면 상세한 수상 부문과 심사위원 코멘트를 확인할 수 있습니다.
          </p>

          {/* Year Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {(['all', '2026', '2024', '2023'] as const).map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer font-['Outfit'] ${
                  selectedYear === year
                    ? 'bg-[#7864f6] text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {year === 'all' ? '전체 연도' : `${year}년`}
              </button>
            ))}
          </div>
        </div>

        {/* Awards Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#7864f6]/20 shadow-xs max-w-3xl mx-auto">
          <div className="space-y-3">
            {filteredAwards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={(e) => triggerConfetti(e, award)}
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white hover:shadow-md border border-slate-200/80 hover:border-[#7864f6] transition-all duration-200 cursor-pointer group"
              >
                {/* Left Side: Icon & Titles */}
                <div className="flex items-center gap-4 min-w-0">
                  {getAwardIcon(award.iconType)}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#7864f6] transition-colors font-['Outfit'] truncate">
                        {award.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {award.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Side: Year Pill */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#7864f6]/10 group-hover:text-[#7864f6] font-mono transition-colors border border-slate-200/50">
                    {award.year}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#7864f6] transition-colors hidden sm:block" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

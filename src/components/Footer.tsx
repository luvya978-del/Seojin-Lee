import React from 'react';
import { RobotLogoIcon } from './RobotLogo';
import { ArrowUp, Lock, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { openAdminAuthModal, isAdminUnlocked, openEditor } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-100 bg-white py-12 pb-24 md:pb-12 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <RobotLogoIcon className="w-5 h-5 text-[#7864f6]" color="#7864f6" />
              <span className="font-extrabold text-slate-800 tracking-wider font-['Outfit']">
                SEOJIN<span className="text-[#7864f6]">.DEV</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium text-xs mt-1">
              &copy; 2026 이서진 포트폴리오 (Lee Seojin Portfolio). All rights reserved.
            </p>
          </div>

          {/* Right: Get In Touch & Secret Menu Entry */}
          <div className="flex flex-col items-center sm:items-end gap-1 text-center sm:text-right">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase font-mono">
              이메일 문의
            </span>
            <a
              href="mailto:sjleedavid0131@gmail.com"
              className="font-bold text-[#7864f6] hover:text-[#6550e8] transition-colors font-['Outfit']"
            >
              sjleedavid0131@gmail.com
            </a>
          </div>

        </div>

        {/* Bottom Bar with Back to Top & Secret Admin Entry */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              로봇공학 &amp; AI 엔지니어링을 향한 끝없는 열정
            </p>
            {/* Subtle discreet corner admin button */}
            <button
              onClick={isAdminUnlocked ? () => openEditor('all') : openAdminAuthModal}
              className="text-[10px] font-mono text-slate-400 hover:text-[#7864f6] transition-colors flex items-center gap-1 underline underline-offset-2 opacity-60 hover:opacity-100 cursor-pointer"
              title="시스템 관리자 설정"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{isAdminUnlocked ? '[관리자 콘솔]' : '[시스템]'}</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-[#7864f6] transition-colors cursor-pointer"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

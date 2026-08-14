import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Unlock, Edit3, Link2, Sparkles, LogOut, Plus } from 'lucide-react';

export const AdminToolbar: React.FC = () => {
  const { 
    isAdminUnlocked, 
    openAdminAuthModal, 
    lockAdmin, 
    openEditor 
  } = usePortfolio();

  return (
    <>
      {/* Corner Secret Access Button (Shown subtly at bottom right) */}
      {!isAdminUnlocked ? (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={openAdminAuthModal}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#7864f6] text-slate-400 hover:text-white border border-slate-200 hover:border-[#7864f6] shadow-sm hover:shadow-md transition-all text-[11px] font-mono cursor-pointer backdrop-blur-xs"
            title="시스템 관리자 메뉴"
          >
            <Lock className="w-3.5 h-3.5 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-semibold tracking-wider">시스템</span>
          </button>
        </div>
      ) : (
        /* Floating Unlocked Admin Bar */
        <aside 
          aria-label="관리자 제어 도구"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] bg-slate-950/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-purple-500/30 flex items-center gap-2 sm:gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 whitespace-nowrap hidden sm:inline">
              수정 모드 활성화
            </span>
          </div>

          <button
            onClick={() => openEditor('links')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap border border-purple-500/30"
          >
            <Link2 className="w-3.5 h-3.5 text-[#7864f6]" />
            <span>외부 링크 관리</span>
          </button>

          <button
            onClick={() => openEditor('all')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-all cursor-pointer shadow-md whitespace-nowrap"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>전체 수정 콘솔</span>
          </button>

          <button
            onClick={lockAdmin}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 transition-colors cursor-pointer"
            title="관리자 모드 종료"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </aside>
      )}
    </>
  );
};

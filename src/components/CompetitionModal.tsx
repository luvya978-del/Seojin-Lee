import React from 'react';
import { CompetitionItem } from '../types';
import { X, Trophy, MessageSquareQuote } from 'lucide-react';

interface CompetitionModalProps {
  item: CompetitionItem | null;
  onClose: () => void;
}

export const CompetitionModal: React.FC<CompetitionModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative p-6 bg-[#7864f6] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-mono font-bold border border-white/30">
              {item.year}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30">
              {item.category}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold font-['Outfit'] tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 font-semibold mt-1">
            {item.team}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          {/* Competition Photo */}
          {item.image && (
            <div className="h-52 sm:h-60 w-full rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner border border-slate-200">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono font-medium">
                대회 현장 기록 사진
              </div>
            </div>
          )}

          {/* Wins Banner */}
          <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-[#7864f6] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#7864f6] uppercase font-mono">
                수상 및 성과 (WINS)
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {item.wins}
              </div>
            </div>
          </div>

          {/* Roles */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">
              담당 역할 (ROLES)
            </div>
            <div className="flex flex-wrap gap-2">
              {item.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-white text-slate-800 border border-[#7864f6]/20"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Description / Summary */}
          {item.description && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase font-mono">
                대회 및 미션 내용 요약
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Reflection */}
          <div className="p-4 rounded-2xl bg-[#7864f6]/5 border border-[#7864f6]/20">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7864f6] uppercase font-mono mb-1">
              <MessageSquareQuote className="w-4 h-4" />
              참가 소감 및 배운 점 (REFLECTION)
            </div>
            <p className="text-xs sm:text-sm italic text-slate-800 leading-relaxed">
              &quot;{item.reflection}&quot;
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};

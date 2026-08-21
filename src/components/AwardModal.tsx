import React from 'react';
import { AwardItem } from '../types';
import { X, Trophy } from 'lucide-react';

interface AwardModalProps {
  award: AwardItem | null;
  onClose: () => void;
}

export const AwardModal: React.FC<AwardModalProps> = ({ award, onClose }) => {
  if (!award) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="relative p-6 text-center bg-white border-b border-slate-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-[#7864f6] text-white flex items-center justify-center mx-auto mb-3 shadow-lg ring-8 ring-[#7864f6]/10">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#7864f6]/10 text-[#7864f6] border border-[#7864f6]/20">
            {award.year} 공식 수상 인증
          </span>

          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-3">
            {award.title}
          </h3>
          <p className="text-sm font-semibold text-[#7864f6] mt-0.5">
            {award.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-white max-h-[60vh] overflow-y-auto">
          {/* Certificate / Award Photo */}
          {award.image && (
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200 shadow-inner">
              <img
                src={award.image}
                alt={award.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono font-medium">
                공식 상장 및 인증 사진
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {award.description || '탁월한 기술적 완성도, 자율주행 알고리즘의 정밀성 및 로봇 공학적 창의성을 인정받아 수상하였습니다.'}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
            <span>참가 부문</span>
            <span className="text-slate-900 font-bold">{award.category || '전국대회 부문'}</span>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>수상자</span>
            <span className="text-slate-900 font-bold">이서진 (Lee Seojin)</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-colors cursor-pointer font-['Outfit']"
          >
            수상 인증서 닫기
          </button>
        </div>

      </div>
    </div>
  );
};

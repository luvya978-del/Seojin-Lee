import React from 'react';
import { X, Cpu, Zap, Gauge, Activity } from 'lucide-react';

interface HardwareSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HardwareSpecsModal: React.FC<HardwareSpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative p-6 bg-slate-950 text-white border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7864f6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7864f6]"></span>
            </span>
            <span className="text-xs font-mono text-[#7864f6] font-bold uppercase">
              온라인 • 원격 텔레메트리 활성화
            </span>
          </div>

          <h3 className="text-2xl font-extrabold font-['Outfit']">
            V5 Pro 하드웨어 아키텍처
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            국내 및 국제 대회 출전을 위해 최적화된 로봇 시스템 사양
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20">
              <div className="flex items-center gap-2 text-[#7864f6] text-xs font-bold font-mono">
                <Cpu className="w-4 h-4" />
                메인 프로세서
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                ARM Cortex-A9 듀얼
              </div>
              <div className="text-[11px] text-slate-500">V5 Brain @ 667MHz</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20">
              <div className="flex items-center gap-2 text-[#7864f6] text-xs font-bold font-mono">
                <Gauge className="w-4 h-4" />
                기어비 구성
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                3:1 초고속 세팅
              </div>
              <div className="text-[11px] text-slate-500">블루 카트리지 (600 RPM)</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20">
              <div className="flex items-center gap-2 text-[#7864f6] text-xs font-bold font-mono">
                <Zap className="w-4 h-4" />
                배터리 및 전원
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                12.8V LiFePO4
              </div>
              <div className="text-[11px] text-slate-500">고방전율 안전 셀</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#7864f6]/20">
              <div className="flex items-center gap-2 text-[#7864f6] text-xs font-bold font-mono">
                <Activity className="w-4 h-4" />
                자이로 센서
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">
                관성 6축 자이로
              </div>
              <div className="text-[11px] text-slate-500">0.05&deg;/s 이하 저드리프트</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#7864f6]/5 border border-[#7864f6]/20 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-[#7864f6] uppercase font-mono">
              자율주행 알고리즘 검증
            </div>
            <p className="leading-relaxed">
              모든 구동 베이스는 50회 이상의 시뮬레이션 및 광학 캘리브레이션을 거쳐 2분간의 경기 시간 동안 오도메트리 누적 오차를 0.8% 이내로 유지하도록 엄격히 검증되었습니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            진단 닫기
          </button>
        </div>

      </div>
    </div>
  );
};

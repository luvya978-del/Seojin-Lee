import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RobotLogoIcon } from './RobotLogo';
import { 
  X, 
  MapPin, 
  GraduationCap, 
  Send,
  Edit3
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();
  const profile = data.profile;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Cover */}
        <div className="relative p-6 bg-[#7864f6] text-white">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {isAdminUnlocked && (
              <button
                onClick={() => {
                  onClose();
                  openEditor('profile');
                }}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer text-xs flex items-center gap-1 px-2.5 font-bold"
                title="프로필 수정"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>수정</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <RobotLogoIcon className="w-12 h-12" color="#7864f6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-['Outfit']">
                  {profile.name}
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs text-purple-100 font-medium">
                {profile.role}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-purple-100 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl border border-[#7864f6]/20 text-center">
            {profile.stats?.map((st, i) => (
              <div key={i} className="p-1">
                <div className="text-base sm:text-lg font-black text-[#7864f6] font-['Outfit']">
                  {st.value}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              자기소개 (Student Statement)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#7864f6]/5 p-3.5 rounded-2xl border border-[#7864f6]/15">
              {profile.bio}
            </p>
          </div>

          {/* Key Interests & Skills Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              주요 전문 관심 분야
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests?.map((interest, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#7864f6]/5 text-slate-700 border border-[#7864f6]/15"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Education Track */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#7864f6]/20 text-xs">
            <GraduationCap className="w-5 h-5 text-[#7864f6] shrink-0" />
            <div>
              <div className="font-bold text-slate-800">중학교 로봇 &amp; AI 동아리 / 자율 연구 트랙</div>
              <div className="text-slate-500">K.F.C Codechaser 팀 리더 &amp; 메인 프로그래머</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">{profile.email}</span>
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7864f6] text-white text-xs font-bold hover:bg-[#6550e8] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>메시지 보내기</span>
          </button>
        </div>

      </div>
    </div>
  );
};

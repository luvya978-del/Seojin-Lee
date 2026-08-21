import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, User, KeyRound, X, CheckCircle2, AlertCircle, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthModalOpen, closeAdminAuthModal, loginAdmin, navigate } = usePortfolio();
  const [username, setUsername] = useState('david0131');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await loginAdmin(username.trim(), password.trim());
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setError(null);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7864f6', '#10b981', '#3b82f6', '#ffffff']
      });
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
        closeAdminAuthModal();
      }, 900);
    } else {
      setError(res.error || '아이디 또는 비밀번호가 일치하지 않습니다.');
      setSuccess(false);
    }
  };

  const handleGoToAdminPage = () => {
    closeAdminAuthModal();
    navigate('/admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#7864f6] text-white text-center relative">
          <button
            onClick={closeAdminAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white text-[#7864f6] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-['Outfit']">
            포트폴리오 관리자 인증
          </h3>
          <p className="text-xs text-purple-100 mt-1">
            서버 보안 인증을 통해 실시간 수정 모드를 활성화합니다.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 bg-white space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Username Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 font-['Outfit']">
                관리자 아이디 (ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  placeholder="david0131"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7864f6] focus:ring-2 focus:ring-[#7864f6]/10 text-xs font-mono font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 font-['Outfit']">
                비밀번호 (PW)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7864f6] focus:ring-2 focus:ring-[#7864f6]/10 text-xs font-mono font-bold text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-600 font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>인증 성공! 수정 모드가 열립니다.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-['Outfit'] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>인증 확인 중...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>관리자 로그인</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Route to Full /admin page */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={handleGoToAdminPage}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#7864f6] font-semibold transition-colors cursor-pointer"
            >
              <span>관리자 전용 대시보드(/admin)로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

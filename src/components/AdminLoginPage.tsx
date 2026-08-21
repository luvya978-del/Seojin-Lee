import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RobotLogoIcon } from './RobotLogo';
import { Lock, User, KeyRound, ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate } = usePortfolio();
  const [username, setUsername] = useState('david0131');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const result = await loginAdmin(username.trim(), password.trim());
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#7864f6', '#10b981', '#3b82f6', '#ffffff']
      });
    } else {
      setErrorMessage(result.error || '아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header / Back link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-slate-800/80 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#7864f6]" />
          <span>공개 포트폴리오로 돌아가기</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>보안 서버 인증</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7864f6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Title */}
          <div className="text-center mb-8 relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7864f6] to-[#9b8afb] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#7864f6]/30">
              <RobotLogoIcon className="w-8 h-8" color="#ffffff" />
            </div>
            <h1 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
              포트폴리오 관리자 콘솔
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">
              인증된 관리자만 포트폴리오 콘텐츠를 수정할 수 있습니다.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>로그인 성공! 관리자 대시보드로 이동합니다...</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 font-['Outfit'] uppercase tracking-wider">
                관리자 아이디 (ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="아이디를 입력하세요"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#7864f6] focus:ring-2 focus:ring-[#7864f6]/20 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 font-['Outfit'] uppercase tracking-wider">
                비밀번호 (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#7864f6] focus:ring-2 focus:ring-[#7864f6]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#7864f6]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-['Outfit']"
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

          {/* Security Note Footer inside card */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
            <p>
              비밀번호는 안전한 PBKDF2 단방향 해시로 서버 측에서 검증됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center text-xs text-slate-500 font-medium">
        &copy; 2026 이서진 포트폴리오 관리자 시스템
      </div>
    </div>
  );
};

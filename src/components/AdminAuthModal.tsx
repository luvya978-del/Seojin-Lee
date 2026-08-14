import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, KeyRound, X, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthModalOpen, closeAdminAuthModal, unlockAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockAdmin(password)) {
      setSuccess(true);
      setError(false);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7864f6', '#10b981', '#3b82f6', '#ffffff']
      });
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
      }, 1000);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (password.length < 8) {
      const next = password + digit;
      setPassword(next);
      setError(false);
      if (next === '0131') {
        unlockAdmin(next);
        setSuccess(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7864f6', '#10b981', '#3b82f6', '#ffffff']
        });
        setTimeout(() => {
          setSuccess(false);
          setPassword('');
        }, 1000);
      }
    }
  };

  const handleBackspace = () => {
    setPassword(prev => prev.slice(0, -1));
    setError(false);
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
            비밀번호를 입력하여 실시간 수정 모드를 활성화합니다.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 bg-white space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative flex items-center justify-center mb-2">
                <input
                  type="password"
                  maxLength={6}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="••••"
                  autoFocus
                  className="w-full text-center tracking-[0.6em] text-2xl font-mono py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#7864f6] focus:ring-4 focus:ring-[#7864f6]/10 font-bold"
                />
              </div>

              {error && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  <span>비밀번호가 올바르지 않습니다.</span>
                </div>
              )}

              {success && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>인증 성공! 수정 모드가 열립니다.</span>
                </div>
              )}
            </div>

            {/* Quick numeric touch keypad */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="py-3 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7864f6] active:scale-95 font-mono text-lg font-bold text-slate-700 transition-all cursor-pointer border border-slate-100 shadow-2xs"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPassword('')}
                className="py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-500 transition-all cursor-pointer border border-slate-100"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-3 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7864f6] active:scale-95 font-mono text-lg font-bold text-slate-700 transition-all cursor-pointer border border-slate-100 shadow-2xs"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-xs font-semibold text-slate-500 transition-all cursor-pointer border border-slate-100"
              >
                지우기
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-['Outfit'] mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>관리자 모드 해제하기</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

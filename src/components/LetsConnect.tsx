import React, { useState } from 'react';
import { Mail, Send, Check, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetsConnectProps {
  onOpenMessageModal: () => void;
}

export const LetsConnect: React.FC<LetsConnectProps> = ({ onOpenMessageModal }) => {
  const [copied, setCopied] = useState(false);
  const email = 'sjleedavid0131@gmail.com';

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x, y },
      colors: ['#7864f6', '#a78bfa', '#ffffff', '#c4b5fd']
    });

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-20 relative bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Brand Gradient Card with Dotted Pattern */}
        <div className="relative rounded-3xl overflow-hidden bg-[#7864f6] text-white p-8 sm:p-14 lg:p-16 text-center shadow-2xl">
          
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none"></div>
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Top Mail Icon Badge */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-6 shadow-inner transition-transform hover:scale-110 duration-200">
              <Mail className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight font-serif-heading mb-4">
              문의 및 소통 (Let&apos;s Connect)
            </h2>

            {/* Korean Description */}
            <p className="text-sm sm:text-base text-purple-100/90 font-normal leading-relaxed mb-8 max-w-xl">
              로봇 공학과 코딩에 대한 열정을 함께 나눌 분들의 연락을 기다립니다. 언제든 이메일로 문의해주세요.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              
              {/* Primary Email Pill Button */}
              <div className="relative group">
                <button
                  onClick={handleCopyEmail}
                  id="copy-email-btn"
                  title="클릭하여 이메일 주소 복사"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm sm:text-base tracking-tight shadow-lg hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Outfit']"
                >
                  <span className="text-slate-800">{email}</span>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-50" />
                  ) : (
                    <Send className="w-4 h-4 text-[#7864f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>

                {/* Copied Toast Banner */}
                {copied && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-emerald-300 bg-slate-900/90 px-3 py-1 rounded-full shadow-md animate-in fade-in slide-in-from-top-1">
                    ✨ 이메일 주소가 복사되었습니다!
                  </div>
                )}
              </div>

              {/* Direct Mailto Action */}
              <a
                href={`mailto:${email}?subject=이서진%20학생%20로봇%20포트폴리오%20문의`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold border border-white/20 transition-colors"
                title="메일 앱으로 보내기"
              >
                <span>직접 메일 발송</span>
                <Mail className="w-4 h-4" />
              </a>

              {/* Message modal trigger */}
              <button
                onClick={onOpenMessageModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold border border-white/20 transition-colors cursor-pointer"
                title="빠른 메시지 작성"
              >
                <MessageSquare className="w-4 h-4" />
                <span>빠른 메시지</span>
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

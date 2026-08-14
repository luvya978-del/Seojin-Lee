import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactMessageModal: React.FC<ContactMessageModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7864f6', '#a78bfa', '#ffffff', '#c4b5fd']
    });

    setTimeout(() => {
      const mailtoUrl = `mailto:sjleedavid0131@gmail.com?subject=${encodeURIComponent(`[로봇 포트폴리오 문의] ${name || '방문자'}`)}&body=${encodeURIComponent(`보낸 사람: ${name} (${email})\n\n내용:\n${message}`)}`;
      window.location.href = mailtoUrl;
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#7864f6] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-xl font-bold font-['Outfit']">
            빠른 메시지 작성
          </h3>
          <p className="text-xs text-purple-100 mt-1">
            이서진 학생에게 로봇 프로젝트 협업이나 문의 사항을 직접 전달할 수 있습니다.
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 bg-white">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-[#7864f6]/10 text-[#7864f6] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-['Outfit']">
                이메일 앱을 여는 중입니다...
              </h4>
              <p className="text-xs text-slate-500">
                메시지가 준비되었습니다. sjleedavid0131@gmail.com 으로 발송됩니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-mono mb-1.5">
                  보내시는 분 이름
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 김민준 / 지도교사"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7864f6] focus:border-[#7864f6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-mono mb-1.5">
                  답변받으실 이메일 주소
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7864f6] focus:border-[#7864f6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 font-mono mb-1.5">
                  메시지 내용
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="로봇 대회, 기술 피드백, 협업 제안 등 편하게 남겨주세요..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7864f6] focus:border-[#7864f6] resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-['Outfit']"
              >
                <span>메시지 전송하기</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

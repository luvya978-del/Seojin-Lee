import React, { useState } from 'react';
import { ProjectDetail } from '../types';
import { 
  X, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'code'>('overview');
  const [codeCopied, setCodeCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#7864f6]/20 text-[#7864f6] text-xs font-mono font-bold border border-[#7864f6]/40">
                &lt;&gt; {project.badge}
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                자율주행 미션 로봇 (Autonomous Mission Bot)
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-slate-100 bg-white text-xs sm:text-sm font-bold font-['Outfit']">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#7864f6] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
          >
            개요 (Overview)
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-[#7864f6] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
          >
            하드웨어 스펙
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#7864f6] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
          >
            PID 제어 알고리즘
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Image banner */}
              <div className="rounded-2xl overflow-hidden h-56 w-full relative bg-slate-900 shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#7864f6] font-mono">
                  프로젝트 및 미션 개요
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#7864f6]/20">
                <h4 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7864f6]" />
                  엔지니어링 핵심 특징
                </h4>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External link if provided */}
              {project.externalLink && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800">외부 리소스 링크</span>
                    <p className="text-xs text-slate-500">{project.externalLink}</p>
                  </div>
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold transition-colors"
                  >
                    <span>{project.linkText || '바로가기'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#7864f6] font-mono">
                하드웨어 아키텍처 및 액추에이터
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-[#7864f6]/20 space-y-1"
                  >
                    <div className="text-xs font-mono font-semibold text-slate-500">
                      {spec.label}
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-['Outfit']">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#7864f6]/5 border border-[#7864f6]/20 space-y-2">
                <div className="text-xs font-bold text-[#7864f6] uppercase font-mono">
                  제어 루프 주기 (Control Loop Rate)
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  차체는 100Hz 고속 폐루프 타이머를 통해 실시간 PID 미분값을 갱신하며, 최고 대회 주행 속도에서도 라인 진동 오차를 &plusmn;1.2mm 이내로 안정적으로 제어합니다.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && project.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                  <Code2 className="w-4 h-4 text-[#7864f6]" />
                  <span>main_pid_follower.py (Pybricks MicroPython)</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs font-bold text-[#7864f6] bg-[#7864f6]/10 hover:bg-[#7864f6]/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? '복사됨' : '코드 복사'}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};

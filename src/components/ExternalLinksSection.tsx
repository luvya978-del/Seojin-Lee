import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Link2, 
  ExternalLink, 
  Youtube, 
  Github, 
  Boxes, 
  BookOpen, 
  Globe, 
  Plus, 
  Edit3, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';
import { ExternalLinkItem } from '../types';

export const ExternalLinksSection: React.FC = () => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();

  const getLinkIcon = (category?: string, icon?: string) => {
    switch (category) {
      case 'video':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'github':
        return <Github className="w-5 h-5 text-slate-800" />;
      case 'cad':
        return <Boxes className="w-5 h-5 text-[#7864f6]" />;
      case 'document':
        return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'blog':
      default:
        return <Globe className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'video':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">YouTube 영상</span>;
      case 'github':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">GitHub 소스</span>;
      case 'cad':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#7864f6] border border-purple-200">3D CAD 도면</span>;
      case 'document':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">연구 일지 / 문서</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">외부 웹사이트</span>;
    }
  };

  return (
    <section id="links-hub" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7864f6] uppercase font-mono">
                외부 리소스 &amp; 미디어
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#7864f6]/10 text-[#7864f6] font-bold">
                <Sparkles className="w-3 h-3" />
                실시간 연동
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 font-['Outfit']">
              외부 링크 &amp; 연구 미디어 허브
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              경기 주행 비디오, 오픈소스 GitHub 알고리즘, Onshape 3D CAD 기구 도면을 직접 확인하세요.
            </p>
          </div>

          {isAdminUnlocked && (
            <button
              onClick={() => openEditor('links')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7864f6] hover:bg-[#6550e8] text-white text-xs font-bold shadow-sm transition-all cursor-pointer font-['Outfit'] shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>새 외부 링크 등록</span>
            </button>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {data.externalLinks.map((link: ExternalLinkItem, idx: number) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#7864f6] hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-[#7864f6]/10 border border-slate-100 group-hover:border-[#7864f6]/30 transition-colors shrink-0">
                {getLinkIcon(link.category, link.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  {getCategoryBadge(link.category)}
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#7864f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#7864f6] transition-colors truncate font-['Outfit']">
                  {link.title}
                </h3>

                {link.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {link.description}
                  </p>
                )}

                <div className="mt-2 text-[11px] font-mono text-slate-400 group-hover:text-slate-600 truncate">
                  {link.url}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

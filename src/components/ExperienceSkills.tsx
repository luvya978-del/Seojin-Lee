import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Cpu, 
  LayoutGrid, 
  Code, 
  Sparkles, 
  Brain, 
  Users, 
  Presentation, 
  Hammer, 
  BookOpen, 
  Boxes,
  ArrowUpRight,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceSkillsProps {
  onOpenProject: () => void;
}

export const ExperienceSkills: React.FC<ExperienceSkillsProps> = ({ onOpenProject }) => {
  const { data, isAdminUnlocked, openEditor } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'soft'>('all');

  const featuredProject = data.projects[0] || {
    id: 'wro-robot',
    title: 'WRO Robot',
    badge: 'Pybricks',
    description: 'WRO 2026 Korea 대회를 위해 제작한 자율주행 로봇.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Pybricks', 'PID 제어', 'C++']
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes': return <Boxes className="w-4 h-4 text-[#7864f6]" />;
      case 'Code': return <Code className="w-4 h-4 text-[#7864f6]" />;
      case 'Presentation': return <Presentation className="w-4 h-4 text-[#7864f6]" />;
      case 'Users': return <Users className="w-4 h-4 text-[#7864f6]" />;
      case 'Brain': return <Brain className="w-4 h-4 text-[#7864f6]" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-[#7864f6]" />;
      case 'Hammer': return <Hammer className="w-4 h-4 text-[#7864f6]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#7864f6]" />;
      default: return <Sparkles className="w-4 h-4 text-[#7864f6]" />;
    }
  };

  const filteredSkills = data.skills.filter(skill => {
    if (activeCategory === 'technical') return skill.category === 'technical' || skill.category === 'core';
    if (activeCategory === 'soft') return skill.category === 'soft';
    return true;
  });

  return (
    <section id="experience" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12 flex items-center justify-between">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7864f6] uppercase font-mono">
              역량 매트릭스
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight mt-1 font-serif-heading">
              경험 및 역량 (Experience &amp; Skills)
            </h2>
          </div>

          {isAdminUnlocked && (
            <button
              onClick={() => openEditor('skills')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7864f6]/10 text-[#7864f6] text-xs font-bold hover:bg-[#7864f6]/20 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>역량/프로젝트 수정</span>
            </button>
          )}
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Technical Proficiency */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#7864f6]/20 shadow-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#7864f6]/10 text-[#7864f6]">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
                  보유 기술 및 전문성
                </h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === 'all' ? 'bg-[#7864f6] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setActiveCategory('technical')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === 'technical' ? 'bg-[#7864f6] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  기술/하드웨어
                </button>
                <button
                  onClick={() => setActiveCategory('soft')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === 'soft' ? 'bg-[#7864f6] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  소프트 스킬
                </button>
              </div>
            </div>

            {/* Skills List with score indicators */}
            <div className="space-y-4">
              {filteredSkills.map((skill, idx) => {
                const percent = (skill.score / skill.maxScore) * 100;
                return (
                  <div key={skill.id} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                      <div className="flex items-center gap-2 text-slate-800">
                        {getSkillIcon(skill.icon)}
                        <span className="group-hover:text-[#7864f6] transition-colors font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#7864f6]/10 text-[#7864f6] border border-[#7864f6]/20">
                        {skill.score}/{skill.maxScore}
                      </span>
                    </div>

                    {/* Progress Bar with #7864f6 */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
                        className="bg-[#7864f6] h-2 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Featured Project Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#7864f6]/10 text-[#7864f6]">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
                  대표 프로젝트
                </h3>
              </div>
              {isAdminUnlocked && (
                <button
                  onClick={() => openEditor('projects')}
                  className="text-xs font-bold text-[#7864f6] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>프로젝트 수정</span>
                </button>
              )}
            </div>

            {/* High Impact Project Card */}
            <div 
              onClick={onOpenProject}
              className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group cursor-pointer flex-1 flex flex-col justify-end min-h-[440px]"
            >
              {/* Project Image */}
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-70"
              />
              
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              {/* Top Tech Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-mono font-semibold text-[#7864f6] border border-[#7864f6]/40">
                  <span className="text-[#7864f6] font-bold">&lt;&gt;</span>
                  {featuredProject.badge}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 p-6 sm:p-8">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-['Outfit'] group-hover:text-[#7864f6] transition-colors">
                  {featuredProject.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-6 leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.techStack?.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-slate-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Learn More Button */}
                <button
                  id="project-learn-more-btn"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/15 hover:bg-[#7864f6] backdrop-blur-md text-white text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/20 transition-all font-['Outfit']"
                >
                  <span>프로젝트 상세 보기</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

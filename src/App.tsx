/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompetitionJourney } from './components/CompetitionJourney';
import { ExperienceSkills } from './components/ExperienceSkills';
import { CertificationsAwards } from './components/CertificationsAwards';
import { ExternalLinksSection } from './components/ExternalLinksSection';
import { LetsConnect } from './components/LetsConnect';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProjectModal } from './components/ProjectModal';
import { ProfileModal } from './components/ProfileModal';
import { CompetitionModal } from './components/CompetitionModal';
import { AwardModal } from './components/AwardModal';
import { HardwareSpecsModal } from './components/HardwareSpecsModal';
import { ContactMessageModal } from './components/ContactMessageModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';
import { AdminToolbar } from './components/AdminToolbar';
import { CompetitionItem, AwardItem, ProjectDetail } from './types';

function PortfolioAppContent() {
  const { data } = usePortfolio();

  // Modal states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

  // Active section for mobile bottom nav
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'journey', 'experience', 'awards', 'links-hub', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec === 'awards' || sec === 'links-hub' ? 'experience' : sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          onExplore={() => scrollToSection('journey')}
          onOpenSpecs={() => setIsSpecsOpen(true)}
        />

        {/* Competition Journey Milestones */}
        <CompetitionJourney
          onSelectCompetition={(comp) => setSelectedCompetition(comp)}
        />

        {/* Experience & Skills Capability Matrix */}
        <ExperienceSkills
          onOpenProject={() => setSelectedProject(data.projects[0] || null)}
        />

        {/* Certifications & Awards */}
        <CertificationsAwards
          onSelectAward={(award) => setSelectedAward(award)}
        />

        {/* External Links & Research Media Hub */}
        <ExternalLinksSection />

        {/* Let's Connect Banner */}
        <LetsConnect
          onOpenMessageModal={() => setIsContactModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Admin Floating Control Toolbar */}
      <AdminToolbar />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenContact={() => {
          setIsProfileOpen(false);
          setIsContactModalOpen(true);
        }}
      />

      <CompetitionModal
        item={selectedCompetition}
        onClose={() => setSelectedCompetition(null)}
      />

      <AwardModal
        award={selectedAward}
        onClose={() => setSelectedAward(null)}
      />

      <HardwareSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      <ContactMessageModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Admin Password & Content Editor Modals */}
      <AdminAuthModal />
      <PortfolioEditorModal />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}

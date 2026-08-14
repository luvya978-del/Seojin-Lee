import React, { useState, useEffect } from 'react';
import { RobotLogoIcon } from './RobotLogo';
import { User, Menu, X, Link2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenProfile: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="navbar-brand"
        >
          <div className="relative flex items-center justify-center p-1 rounded-lg bg-[#7864f6]/10 border border-[#7864f6]/20 group-hover:bg-[#7864f6]/20 transition-colors">
            <RobotLogoIcon className="w-6 h-6 text-[#7864f6]" color="#7864f6" />
          </div>
          <span className="text-sm sm:text-base font-extrabold tracking-wider text-slate-800 font-['Outfit']">
            SEOJIN<span className="text-[#7864f6]">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold tracking-wider text-slate-600 font-['Outfit']">
          <button
            onClick={() => scrollToSection('journey')}
            className="hover:text-[#7864f6] transition-colors cursor-pointer"
            id="nav-link-journey"
          >
            대회 여정
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-[#7864f6] transition-colors cursor-pointer"
            id="nav-link-experience"
          >
            경험 및 역량
          </button>
          <button
            onClick={() => scrollToSection('awards')}
            className="hover:text-[#7864f6] transition-colors cursor-pointer"
            id="nav-link-awards"
          >
            수상 및 인증
          </button>
          <button
            onClick={() => scrollToSection('links-hub')}
            className="hover:text-[#7864f6] transition-colors cursor-pointer flex items-center gap-1"
            id="nav-link-links"
          >
            <Link2 className="w-3.5 h-3.5 text-[#7864f6]" />
            <span>외부 링크</span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#7864f6] transition-colors cursor-pointer"
            id="nav-link-contact"
          >
            연락처
          </button>
        </nav>

        {/* Right Action Profile & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            id="nav-profile-btn"
            title="프로필 보기"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#7864f6] text-white shadow-xs hover:shadow-md hover:bg-[#6550e8] hover:scale-105 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            {data.profile?.avatarUrl ? (
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 text-sm font-semibold tracking-wider text-slate-700 font-['Outfit']">
            <button
              onClick={() => scrollToSection('journey')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-[#7864f6]/10 hover:text-[#7864f6] transition-colors"
            >
              🏆 대회 여정
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-[#7864f6]/10 hover:text-[#7864f6] transition-colors"
            >
              ⚡ 경험 및 역량
            </button>
            <button
              onClick={() => scrollToSection('awards')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-[#7864f6]/10 hover:text-[#7864f6] transition-colors"
            >
              🎖️ 수상 및 인증
            </button>
            <button
              onClick={() => scrollToSection('links-hub')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-[#7864f6]/10 hover:text-[#7864f6] transition-colors flex items-center gap-2"
            >
              <Link2 className="w-4 h-4 text-[#7864f6]" />
              <span>외부 링크 / 연구 미디어</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-[#7864f6]/10 hover:text-[#7864f6] transition-colors"
            >
              📬 연락처
            </button>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="flex items-center gap-2 text-[#7864f6] font-bold text-xs"
              >
                <User className="w-4 h-4" /> 이서진 프로필
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="text-xs bg-[#7864f6] hover:bg-[#6550e8] text-white px-3 py-1.5 rounded-md font-medium"
              >
                문의하기
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

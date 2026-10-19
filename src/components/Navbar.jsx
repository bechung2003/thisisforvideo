import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar = ({ theme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="brand-logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Bechung Khumlo Home"
        >
          <div className="brand-symbol">BK</div>
          <span className="brand-name">
            {portfolioData.profile.name}
            <span className="brand-dot">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navItems.map((item) => {
            const sectionKey = item.href.slice(1);
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Theme Mode Toggle (Dark/Light) */}
          <button
            className="btn-icon theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="btn-icon mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            {navItems.map((item) => {
              const sectionKey = item.href.slice(1);
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

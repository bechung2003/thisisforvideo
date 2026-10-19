import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const { profile } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="site-footer">
      <div className="section-container">
        {/* Top Footer Row */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <div className="brand-symbol" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                BK
              </div>
              <span className="footer-brand-name">{profile.name}</span>
            </div>
            <p className="footer-tagline">
              {profile.role} — Passionate about building useful digital experiences and continuously learning.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="footer-nav-links" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="btn btn-secondary back-to-top-btn"
            title="Scroll to top of page"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Footer Row */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {CURRENT_YEAR} {profile.name}. All rights reserved.
          </div>

          <div className="footer-social-links">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="footer-social-icon"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            )}

            <a
              href={`mailto:${profile.socials.email}`}
              className="footer-social-icon"
              title="Email"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const Hero = () => {
  const { profile } = portfolioData;

  return (
    <section id="hero" className="section-wrapper hero-wrapper">
      <div className="section-container">
        <div className="hero-grid">
          {/* Left Column: Hero Text & Actions */}
          <div className="hero-content-col">
            {/* Status / Welcome Pill */}
            <div className="hero-status-pill">
              <span className="status-beacon">
                <span className="status-beacon-ping"></span>
                <span className="status-beacon-dot"></span>
              </span>
              <span>{profile.status.badgeText}</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">{profile.name}</span>.
            </h1>

            {/* Subheading */}
            <h2 className="hero-subtitle">
              {profile.subheadline}
            </h2>

            {/* Short Introduction */}
            <p className="hero-bio">
              {profile.shortBio}
            </p>

            {/* Two Action Buttons */}
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">
                <span>View My Projects</span>
                <ArrowRight size={18} />
              </a>

              <a href="#contact" className="btn btn-secondary">
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="hero-socials">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hero-social-pill"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>

              <a
                href={`mailto:${profile.socials.email}`}
                className="hero-social-pill"
                aria-label="Direct Email"
              >
                <Mail size={16} />
                <span>{profile.socials.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Existing Profile Photo */}
          <div className="hero-visual-col">
            <div className="hero-visual-card">
              <div className="hero-avatar-wrapper">
                <img
                  src="/images/avatar.jpg"
                  alt={`${profile.name} - Profile Photo`}
                  className="hero-avatar-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

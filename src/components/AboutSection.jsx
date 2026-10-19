import React from 'react';
import { User, Compass, BookOpen, Target } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <User size={14} />
            <span>Getting To Know Me</span>
          </div>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            A look into my journey as a student, my passion for software development, and what drives me to learn every day.
          </p>
        </div>

        {/* Main About Layout */}
        <div className="about-layout-grid">
          {/* Left Column: Natural Narrative */}
          <div className="glass-card about-narrative-card">
            <div className="about-narrative-header">
              <span className="about-badge-small">Student Journey</span>
              <h3 className="about-narrative-title">Building My Path in Technology</h3>
            </div>

            <div className="about-paragraphs">
              <p>{about.intro}</p>
              <p>{about.interests}</p>
              <p>{about.learning}</p>
              <p>{about.goals}</p>
            </div>
          </div>

          {/* Right Column: Key Focus Areas */}
          <div className="about-pillars-col">
            <div className="glass-card about-pillar-card">
              <div className="pillar-icon-box">
                <Compass size={22} />
              </div>
              <div>
                <h4 className="pillar-title">Interests in Technology</h4>
                <p className="pillar-desc">
                  Curious about how modern web apps and tools work under the hood. Passionate about interactive, user-friendly digital experiences.
                </p>
              </div>
            </div>

            <div className="glass-card about-pillar-card">
              <div className="pillar-icon-box" style={{ color: '#0284c7', background: 'rgba(2, 132, 199, 0.1)' }}>
                <BookOpen size={22} />
              </div>
              <div>
                <h4 className="pillar-title">What I'm Learning</h4>
                <p className="pillar-desc">
                  Sharpening web fundamentals in HTML5, CSS3, JavaScript, and building component-based interfaces with React and Vite.
                </p>
              </div>
            </div>

            <div className="glass-card about-pillar-card">
              <div className="pillar-icon-box" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                <Target size={22} />
              </div>
              <div>
                <h4 className="pillar-title">Future Goals</h4>
                <p className="pillar-desc">
                  Growing into a well-rounded software engineer, contributing to real-world software, and collaborating with development teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

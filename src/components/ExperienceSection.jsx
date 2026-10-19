import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const ExperienceSection = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career Path</span>
          </div>
          <h2 className="section-title">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
          <p className="section-subtitle">
            A track record of engineering leadership, scalable product delivery, and continuous learning.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="timeline-toggle-wrapper">
          <div className="timeline-toggle-pill">
            <button
              className={`timeline-toggle-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => {
                playSound('click', soundEnabled);
                setActiveTab('experience');
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={16} />
                <span>Work Experience</span>
              </span>
            </button>

            <button
              className={`timeline-toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => {
                playSound('click', soundEnabled);
                setActiveTab('education');
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={16} />
                <span>Education &amp; Certifications</span>
              </span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          <div className="timeline-items">
            {activeTab === 'experience' ? (
              portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="timeline-entry">
                  <div className="timeline-node"></div>
                  <div className="glass-card timeline-card">
                    {/* Header Row */}
                    <div className="timeline-role-row">
                      <h3 className="timeline-role-title">{exp.role}</h3>
                      <span className="timeline-period-badge">{exp.period}</span>
                    </div>

                    {/* Company & Location */}
                    <div className="timeline-company-row">
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {exp.company}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="timeline-summary">{exp.summary}</p>

                    {/* Bullet Achievements */}
                    <ul className="timeline-bullets">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="timeline-bullet">
                          <CheckCircle size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {exp.skills.map((skill) => (
                        <span key={skill} className="tag-pill" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              portfolioData.education.map((edu, idx) => (
                <div key={idx} className="timeline-entry">
                  <div className="timeline-node"></div>
                  <div className="glass-card timeline-card">
                    <div className="timeline-role-row">
                      <h3 className="timeline-role-title">{edu.degree}</h3>
                      <span className="timeline-period-badge">{edu.period}</span>
                    </div>

                    <div className="timeline-company-row">
                      <span style={{ fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={16} />
                        {edu.institution}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

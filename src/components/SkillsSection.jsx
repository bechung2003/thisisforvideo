import React from 'react';
import { Cpu, Code2, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection = () => {
  const getCategoryIcon = (category) => {
    if (category.includes('Frontend')) return <Code2 size={20} />;
    if (category.includes('Tools')) return <Wrench size={20} />;
    return <Sparkles size={20} />;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Proficient':
        return 'status-proficient';
      case 'Active Learning':
        return 'status-learning';
      default:
        return 'status-exploring';
    }
  };

  return (
    <section id="skills" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>Technical Foundation</span>
          </div>
          <h2 className="section-title">
            My <span className="text-gradient">Skills</span> &amp; Toolkit
          </h2>
          <p className="section-subtitle">
            Technologies and developer tools I actively use and am continuously learning as an aspiring developer.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {portfolioData.skills.map((category) => (
            <div key={category.category} className="glass-card skill-category-card">
              {/* Category Header */}
              <div className="skill-category-header">
                <div className="skill-cat-icon-wrap">
                  {getCategoryIcon(category.category)}
                </div>
                <div>
                  <h3 className="skill-category-name">{category.category}</h3>
                  <p className="skill-category-desc">{category.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="skill-items-list">
                {category.items.map((skill) => (
                  <div key={skill.name} className="skill-item-row">
                    <div className="skill-item-main">
                      <CheckCircle2 size={16} className="skill-check-icon" />
                      <span className="skill-name-text">{skill.name}</span>
                    </div>

                    <div className="skill-item-meta">
                      <span className={`skill-status-tag ${getStatusClass(skill.status)}`}>
                        {skill.status}
                      </span>
                    </div>

                    {skill.note && (
                      <div className="skill-note-text">
                        {skill.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

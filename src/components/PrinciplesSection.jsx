import React from 'react';
import { Compass, Zap, Eye, Accessibility, GitFork } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const PrinciplesSection = () => {
  const icons = [<Zap size={24} />, <Eye size={24} />, <Accessibility size={24} />, <GitFork size={24} />];

  return (
    <section className="section-wrapper" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Core Tenets</span>
          </div>
          <h2 className="section-title">
            Engineering <span className="text-gradient">Philosophy</span>
          </h2>
          <p className="section-subtitle">
            The foundation of every production system and interface I architect.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {portfolioData.principles.map((p, i) => (
            <div key={p.number} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ color: 'var(--primary)' }}>{icons[i]}</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {p.number}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

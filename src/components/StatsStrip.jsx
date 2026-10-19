import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const StatsStrip = () => {
  const { stats } = portfolioData;

  return (
    <section className="section-container" style={{ marginBottom: '80px' }}>
      <div className="stats-strip">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card stat-card">
            <div className="stat-value text-gradient">
              {stat.value}
            </div>
            <div className="stat-label">
              {stat.label}
            </div>
            <div className="stat-sub">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

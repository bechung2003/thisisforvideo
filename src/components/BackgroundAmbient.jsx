import React from 'react';

export const BackgroundAmbient = () => {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Subtle modern soft gradient blurs */}
      <div className="ambient-glow ambient-glow-coral"></div>
      <div className="ambient-glow ambient-glow-blue"></div>
      <div className="ambient-grid-subtle"></div>
    </div>
  );
};

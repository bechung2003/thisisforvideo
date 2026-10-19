import React, { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, Box, Wand2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const PlaygroundSection = ({ 
  currentAccent, 
  setCurrentAccent, 
  soundEnabled, 
  showToast 
}) => {
  const [borderRadius, setBorderRadius] = useState(20);
  const [blurAmount, setBlurAmount] = useState(16);
  const [glowStrength, setGlowStrength] = useState(60);
  const [copied, setCopied] = useState(false);

  const generatedCss = `/* Custom UI Glassmorphism Token */
.custom-card {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(${blurAmount}px);
  -webkit-backdrop-filter: blur(${blurAmount}px);
  border-radius: ${borderRadius}px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 ${glowStrength}px ${currentAccent.glow};
  accent-color: ${currentAccent.primary};
}`;

  const handleCopyCss = () => {
    playSound('success', soundEnabled);
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    showToast('CSS Tokens copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="lab" className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Wand2 size={14} />
            <span>Interactive Frontend Lab</span>
          </div>
          <h2 className="section-title">
            Dynamic UI <span className="text-gradient">Token Studio</span>
          </h2>
          <p className="section-subtitle">
            Experiment with CSS custom properties, glassmorphism blur filters, and accent palettes in real time.
          </p>
        </div>

        {/* Lab Workspace Card */}
        <div className="glass-card lab-card">
          {/* Controls Column */}
          <div className="lab-controls">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} style={{ color: 'var(--primary)' }} />
              <span>Design System Parameters</span>
            </h3>

            {/* Accent Theme Selection */}
            <div className="lab-control-group">
              <label className="lab-label">
                <span>Color Palette Preset</span>
                <span style={{ color: 'var(--primary)' }}>{currentAccent.name}</span>
              </label>
              <div className="theme-swatches">
                {portfolioData.accentThemes.map((thm) => (
                  <button
                    key={thm.id}
                    className={`theme-swatch-btn ${currentAccent.id === thm.id ? 'active' : ''}`}
                    style={{ background: thm.primary, color: thm.primary }}
                    onClick={() => {
                      playSound('toggle', soundEnabled);
                      setCurrentAccent(thm);
                    }}
                    title={thm.name}
                  />
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="lab-control-group">
              <label className="lab-label">
                <span>Border Radius</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{borderRadius}px</span>
              </label>
              <input
                type="range"
                min="6"
                max="36"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="lab-slider"
              />
            </div>

            {/* Glass Blur Amount */}
            <div className="lab-control-group">
              <label className="lab-label">
                <span>Backdrop Blur Filter</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{blurAmount}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="32"
                value={blurAmount}
                onChange={(e) => setBlurAmount(Number(e.target.value))}
                className="lab-slider"
              />
            </div>

            {/* Glow Intensity */}
            <div className="lab-control-group">
              <label className="lab-label">
                <span>Ambient Glow Spread</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{glowStrength}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                value={glowStrength}
                onChange={(e) => setGlowStrength(Number(e.target.value))}
                className="lab-slider"
              />
            </div>
          </div>

          {/* Real-Time Preview Column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div 
              className="lab-preview-box"
              style={{
                borderRadius: `${borderRadius}px`,
                backdropFilter: `blur(${blurAmount}px)`,
                WebkitBackdropFilter: `blur(${blurAmount}px)`,
                boxShadow: `0 0 ${glowStrength}px ${currentAccent.glow}, var(--shadow-md)`,
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-glass)',
              }}
            >
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: `${Math.min(borderRadius, 18)}px`,
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  marginBottom: '16px',
                }}
              >
                <Sparkles size={28} />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                Adaptive Token Preview
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '320px' }}>
                All styles compile directly to native CSS custom properties without runtime overhead.
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '20px', borderRadius: `${Math.min(borderRadius, 14)}px` }}
                onClick={() => playSound('click', soundEnabled)}
              >
                Interactive Element
              </button>
            </div>

            {/* Generated CSS Snippet */}
            <div style={{ position: 'relative' }}>
              <pre className="lab-code-output">
                <code>{generatedCss}</code>
              </pre>
              <button
                onClick={handleCopyCss}
                className="btn-icon"
                style={{
                  position: 'absolute',
                  top: '28px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
                title="Copy CSS Snippet"
              >
                {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

export const ResumeModal = ({ isOpen, onClose, soundEnabled, showToast }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('click', soundEnabled);
    window.print();
  };

  const handleDownloadSim = () => {
    playSound('success', soundEnabled);
    triggerConfetti();
    showToast('Resume PDF downloaded successfully!');
  };

  return (
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playSound('click', soundEnabled);
          onClose();
        }
      }}
    >
      <div 
        className="modal-window resume-modal-window"
        style={{ maxWidth: '880px', maxHeight: '92vh' }}
      >
        {/* Top Control Bar */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '16px 28px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-glass-strong)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Curriculum Vitae</span>
            <span className="tag-pill" style={{ fontSize: '0.75rem' }}>Updated 2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
              onClick={handlePrint}
              title="Print Resume"
            >
              <Printer size={15} />
              <span>Print</span>
            </button>

            <button 
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
              onClick={handleDownloadSim}
              title="Download PDF"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>

            <button 
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              onClick={() => {
                playSound('click', soundEnabled);
                onClose();
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div style={{ padding: '36px', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--border-glass)', paddingBottom: '24px', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{portfolioData.profile.name}</h1>
            <div style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '12px' }}>
              {portfolioData.profile.role}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> {portfolioData.profile.socials.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> {portfolioData.profile.status.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> Available Worldwide
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-highlight)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Executive Summary
            </h3>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              {portfolioData.profile.shortBio} Proven history of boosting core web vitals, building accessible design token systems, and delivering low-latency interfaces that serve millions of end users.
            </p>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-highlight)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Production Engineering Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {portfolioData.experience.map((exp, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--border-glass)', paddingLeft: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontWeight: 750, fontSize: '1.05rem', color: 'var(--text-highlight)' }}>
                      {exp.role} — <span style={{ color: 'var(--primary)' }}>{exp.company}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)', marginTop: '2px' }}>▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-highlight)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Core Technical Competencies
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {portfolioData.skills.map((cat) => (
                <div key={cat.category} className="glass-panel" style={{ padding: '14px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
                    {cat.category}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {cat.items.map(item => item.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-highlight)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Education &amp; Credentials
            </h3>
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-highlight)' }}>
                  {edu.degree} — {edu.institution} ({edu.period})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {edu.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

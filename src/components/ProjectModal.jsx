import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { Github } from './Icons';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-window">
        {/* Modal Banner */}
        <div className="modal-header-hero">
          <img
            src={project.image}
            alt={project.title}
            className="modal-hero-img"
          />
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span className="category-pill">{project.category}</span>
            </div>
            <h2 id="modal-title" style={{ fontSize: '1.75rem', marginBottom: '6px' }}>
              {project.title}
            </h2>
            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', marginBottom: '16px' }}>
              {project.subtitle}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.65' }}>
              {project.description || project.summary}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="modal-case-section">
              <h3 className="modal-case-title">
                <Layers size={18} style={{ color: 'var(--primary)' }} />
                <span>Highlights &amp; Features</span>
              </h3>
              <ul className="modal-feature-list">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle2 size={16} className="modal-feature-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>
              Technologies Used
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* External Action Links */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="btn btn-primary"
                onClick={onClose}
              >
                <span>View Project</span>
                <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <Github size={16} />
                <span>Source Code on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ExternalLink, PlusCircle, Sparkles, ArrowUpRight, Plus, Trash2, Database } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { AddProjectModal } from './AddProjectModal';

const API_BASE = 'http://localhost:5000/api';

export const Projects = ({ onSelectProject, showToast = () => {} }) => {
  const [projectsList, setProjectsList] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch projects from SQLite REST API backend, with fallback to portfolioData + localStorage
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        setProjectsList(data);
        setIsBackendConnected(true);
        return;
      }
    } catch {
      // Backend is offline, fall back gracefully to local storage and static data
      setIsBackendConnected(false);
    }

    try {
      const localCustom = localStorage.getItem('portfolio_custom_projects');
      const parsed = localCustom ? JSON.parse(localCustom) : [];
      setProjectsList([...parsed, ...portfolioData.projects]);
    } catch {
      setProjectsList(portfolioData.projects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (newProject) => {
    if (isBackendConnected) {
      try {
        const res = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        });

        if (res.ok) {
          const created = await res.json();
          setProjectsList((prev) => [created, ...prev]);
          showToast(`Saved "${created.title}" to SQLite Database!`);
          return;
        }
      } catch (err) {
        console.warn('Backend POST failed, storing locally:', err);
      }
    }

    // Fallback to local state & localStorage if backend is not responding
    setProjectsList((prev) => [newProject, ...prev]);
    try {
      const currentSaved = JSON.parse(localStorage.getItem('portfolio_custom_projects') || '[]');
      localStorage.setItem('portfolio_custom_projects', JSON.stringify([newProject, ...currentSaved]));
    } catch {}
    showToast(`Saved "${newProject.title}" to portfolio.`);
  };

  const handleDeleteProject = async (projectId, projectTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${projectTitle}" from your portfolio?`)) {
      return;
    }

    if (isBackendConnected) {
      try {
        const res = await fetch(`${API_BASE}/projects/${projectId}`, { method: 'DELETE' });
        if (res.ok) {
          setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
          showToast(`Deleted "${projectTitle}" from SQLite Database.`);
          return;
        }
      } catch (err) {
        console.warn('Backend DELETE failed:', err);
      }
    }

    // Local fallback
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
    try {
      const currentSaved = JSON.parse(localStorage.getItem('portfolio_custom_projects') || '[]');
      const filtered = currentSaved.filter((p) => p.id !== projectId);
      localStorage.setItem('portfolio_custom_projects', JSON.stringify(filtered));
    } catch {}
    showToast(`Removed "${projectTitle}".`);
  };

  return (
    <section id="projects" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header" style={{ position: 'relative' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>My Work</span>
          </div>

          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <p className="section-subtitle">
            Applications and experiments I have built or am currently developing during my learning journey.
          </p>

          {/* Backend Connection Indicator & Add Button */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsAddModalOpen(true)}
              style={{ padding: '9px 18px', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Upload / Add Another Project</span>
            </button>

            {isBackendConnected && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#059669',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  fontWeight: 600,
                }}
              >
                <Database size={13} />
                <span>REST API &amp; SQLite Connected</span>
              </span>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {projectsList.map((project) => {
            const isPlaceholder = project.isPlaceholder;
            const isCustom = project.isCustom;

            return (
              <div
                key={project.id}
                className={`glass-card project-card ${isPlaceholder ? 'project-card-placeholder' : ''}`}
              >
                {/* Project Image Preview */}
                <div className="project-image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/project-fintech.jpg';
                    }}
                  />
                  <div className="project-badge-overlay">
                    <span className="category-pill">{project.category}</span>
                  </div>

                  {/* Delete button if user added this project */}
                  {isCustom && (
                    <button
                      type="button"
                      className="project-delete-btn"
                      onClick={() => handleDeleteProject(project.id, project.title)}
                      title="Delete this project from database"
                      aria-label="Delete project"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-subtitle">{project.subtitle}</div>

                  <p className="project-summary">{project.summary}</p>

                  {/* Technologies Used */}
                  <div className="project-tags-wrap">
                    {project.tags &&
                      project.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* Project Links & Actions */}
                  <div className="project-actions">
                    {isPlaceholder ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary project-full-btn"
                      >
                        <Github size={16} />
                        <span>Follow Progress on GitHub</span>
                        <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => onSelectProject(project)}
                        >
                          <span>View Details</span>
                          <ArrowUpRight size={16} />
                        </button>

                        <div className="project-icon-links">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              className="btn-icon"
                              title="Live Demo"
                            >
                              <ExternalLink size={17} />
                            </a>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-icon"
                              title="Source Code on GitHub"
                            >
                              <Github size={17} />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Welcoming Placeholder Card encouraging adding more projects */}
          <div className="glass-card project-placeholder-card">
            <div className="placeholder-icon-wrap">
              <PlusCircle size={36} />
            </div>
            <h3 className="placeholder-title">Got a new project?</h3>
            <p className="placeholder-desc">
              Upload your new project screenshot, title, and links directly to your SQLite database!
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: '16px' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              <span>+ Add Your Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
        showToast={showToast}
      />
    </section>
  );
};

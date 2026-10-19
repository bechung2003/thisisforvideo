import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Plus, Check, Code } from 'lucide-react';

export const AddProjectModal = ({ isOpen, onClose, onAddProject, showToast }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [summary, setSummary] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showCodeExport, setShowCodeExport] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle local image file upload (PNG, JPG, WebP)
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const categories = [
    'Web Development',
    'React App',
    'JavaScript Project',
    'Frontend UI',
    'Full Stack',
    'Mobile / Other',
  ];

  const presetImages = [
    { label: 'Gradient Tech', url: '/images/project-fintech.jpg' },
    { label: 'Creative Studio', url: '/images/project-ai.jpg' },
    { label: 'Cloud & Code', url: '/images/project-cloud.jpg' },
    { label: 'Storefront', url: '/images/project-ecommerce.jpg' },
  ];

  const generatedTags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      showToast('Please provide at least a project title and summary.');
      return;
    }

    const newProject = {
      id: `project-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Personal Web Project',
      category: category || 'Web Development',
      summary: summary.trim(),
      image: imagePreview || presetImages[0].url,
      tags: generatedTags.length > 0 ? generatedTags : ['HTML5', 'CSS3', 'JavaScript'],
      githubUrl: githubUrl.trim() || null,
      liveUrl: liveUrl.trim() || null,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    onAddProject(newProject);
    showToast(`"${newProject.title}" has been added to your portfolio!`);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle('');
    setSubtitle('');
    setCategory('Web Development');
    setSummary('');
    setTagsInput('');
    setGithubUrl('');
    setLiveUrl('');
    setImagePreview('');
    setShowCodeExport(false);
  };

  // Generate code snippet for easy copy-pasting into portfolioData.js
  const codeSnippet = `{
  id: "${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'my-project'}",
  title: "${title || 'My Project'}",
  subtitle: "${subtitle || 'Web Application'}",
  category: "${category}",
  image: "${imagePreview.startsWith('data:') ? '/images/your-screenshot.jpg' : (imagePreview || '/images/project-fintech.jpg')}",
  tags: ${JSON.stringify(generatedTags.length > 0 ? generatedTags : ['React', 'JavaScript', 'CSS3'])},
  summary: "${summary || 'Description of the project.'}",
  githubUrl: "${githubUrl || ''}",
  liveUrl: "${liveUrl || ''}",
},`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard! Paste it into portfolioData.js');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-project-title"
    >
      <div className="modal-window add-project-modal">
        {/* Header */}
        <div className="add-project-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-symbol" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
              <Plus size={16} />
            </div>
            <div>
              <h2 id="add-project-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Upload &amp; Add New Project
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Add details and screenshot for your new project
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="add-project-form">
          {/* Image Upload Area */}
          <div className="form-group">
            <label className="form-label">Project Screenshot / Cover Image</label>
            <div className="image-upload-zone">
              {imagePreview ? (
                <div className="image-preview-box">
                  <img src={imagePreview} alt="Project preview" className="preview-thumbnail" />
                  <div className="preview-overlay">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={14} />
                      <span>Change Image</span>
                    </button>
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ background: 'rgba(239, 68, 68, 0.85)', color: '#fff', border: 'none' }}
                      onClick={() => setImagePreview('')}
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <div className="upload-dropzone-icon">
                    <ImageIcon size={28} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-highlight)', marginBottom: '4px' }}>
                    Click to upload screenshot from your computer
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Supports PNG, JPG, or WebP
                  </div>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageFileChange}
              />

              {/* Or select a preset */}
              {!imagePreview && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Or pick a preset placeholder:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {presetImages.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        className="preset-img-btn"
                        onClick={() => setImagePreview(preset.url)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Weather Forecast Dashboard"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div className="form-group">
            <label className="form-label">Subtitle / Short Headline</label>
            <input
              type="text"
              placeholder="e.g. Responsive weather app using OpenWeather API"
              className="form-input"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Project Summary / Description *</label>
            <textarea
              required
              rows="3"
              placeholder="Briefly explain what this project does, what problem it solves, and what you learned..."
              className="form-textarea"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {/* Technologies Used (Comma Separated) */}
          <div className="form-group">
            <label className="form-label">Technologies Used (separated by commas)</label>
            <input
              type="text"
              placeholder="e.g. React, JavaScript, CSS Grid, Weather API"
              className="form-input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
            {generatedTags.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {generatedTags.map((tag) => (
                  <span key={tag} className="tag-pill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Links: GitHub & Live Demo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">GitHub Repository URL (Optional)</label>
              <input
                type="url"
                placeholder="https://github.com/bechung2003/your-repo"
                className="form-input"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Live Demo URL (Optional)</label>
              <input
                type="url"
                placeholder="https://your-project.vercel.app"
                className="form-input"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flexGrow: 1, padding: '12px 20px' }}
            >
              <Plus size={16} />
              <span>Save &amp; Display on Portfolio</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowCodeExport(!showCodeExport)}
              title="Get code to paste into portfolioData.js"
            >
              <Code size={16} />
              <span>{showCodeExport ? 'Hide Code' : 'Get Code Snippet'}</span>
            </button>
          </div>

          {/* Optional Code Snippet for Permanent Inclusion */}
          {showCodeExport && (
            <div className="code-export-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  CODE TO PASTE IN `src/data/portfolioData.js`:
                </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  onClick={handleCopyCode}
                >
                  {copiedCode ? (
                    <>
                      <Check size={12} color="var(--success)" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy Code</span>
                  )}
                </button>
              </div>
              <pre className="code-snippet-pre">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

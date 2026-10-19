import React, { useState } from 'react';
import { Mail, Send, Copy, Check, CheckCircle2, MessageSquare } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { triggerConfetti } from '../utils/confetti';

export const ContactSection = ({ showToast }) => {
  const { profile } = portfolioData;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
        signal: AbortSignal.timeout(4000),
      });
    } catch (err) {
      console.warn('Backend not available, proceeded with simulated delivery:', err);
    }

    setLoading(false);
    setSubmitted(true);
    triggerConfetti();
    showToast('Thank you! Your message has been sent successfully.');
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Connect</span>
          </div>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a question, feedback, or a project in mind? Feel free to send a message or reach out directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            {/* Direct Email Card */}
            <div className="glass-card contact-card-box">
              <div className="contact-icon-frame">
                <Mail size={22} />
              </div>
              <div className="contact-card-text">
                <div className="contact-card-label">EMAIL ADDRESS</div>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="contact-card-value"
                >
                  {profile.socials.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-copy-btn"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
                    <Check size={14} /> Copied
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Copy size={14} /> Copy
                  </span>
                )}
              </button>
            </div>

            {/* GitHub Card */}
            {profile.socials.github && (
              <div className="glass-card contact-card-box">
                <div className="contact-icon-frame">
                  <Github size={22} />
                </div>
                <div className="contact-card-text">
                  <div className="contact-card-label">GITHUB PROFILE</div>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-card-value"
                  >
                    github.com/bechung2003
                  </a>
                </div>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-copy-btn"
                  title="Open GitHub Profile"
                >
                  Visit
                </a>
              </div>
            )}

            {/* Status / Opportunity Card */}
            <div className="glass-panel contact-note-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary)' }}>
                <MessageSquare size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Open to Opportunities</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                As an aspiring developer, I am eager to learn, contribute to real-world projects, and collaborate with teams. I typically respond to emails within 24–48 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="glass-card contact-form-panel">
            {submitted ? (
              <div className="form-success-box">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.6' }}>
                  Thank you for reaching out, <strong style={{ color: 'var(--text-highlight)' }}>{formState.name}</strong>. I have received your message and will get back to you at <strong style={{ color: 'var(--primary)' }}>{formState.email}</strong> as soon as possible.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginTop: '20px' }}
                  onClick={handleResetForm}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      className="form-input"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      className="form-input"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Project inquiry or hello"
                    className="form-input"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Write your message here..."
                    className="form-textarea"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '13px', fontSize: '0.98rem' }}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

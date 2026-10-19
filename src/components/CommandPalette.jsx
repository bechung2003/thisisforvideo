import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowRight, Sun, Moon, Volume2, FileText, 
  Mail, Sparkles, X, Terminal 
} from 'lucide-react';
import { playSound } from '../utils/sound';

export const CommandPalette = ({
  isOpen,
  onClose,
  soundEnabled,
  setSoundEnabled,
  theme,
  setTheme,
  openResume,
  showToast,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else openPalette();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openPalette = () => {
    setQuery('');
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  const actions = [
    {
      id: 'projects',
      label: 'Jump to Featured Projects',
      category: 'Navigation',
      icon: <Sparkles size={16} />,
      execute: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      label: 'Jump to Technical Skills & Architecture',
      category: 'Navigation',
      icon: <Terminal size={16} />,
      execute: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'experience',
      label: 'Jump to Experience & Education',
      category: 'Navigation',
      icon: <ArrowRight size={16} />,
      execute: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'lab',
      label: 'Jump to UI Lab & Design Tokens',
      category: 'Navigation',
      icon: <Sparkles size={16} />,
      execute: () => {
        document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      label: 'Jump to Contact Form & Availability',
      category: 'Navigation',
      icon: <Mail size={16} />,
      execute: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'resume',
      label: 'View Curriculum Vitae / Resume',
      category: 'Document',
      icon: <FileText size={16} />,
      execute: () => {
        onClose();
        openResume();
      },
    },
    {
      id: 'theme',
      label: `Toggle Theme (Currently ${theme === 'dark' ? 'Dark' : 'Light'})`,
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      execute: () => {
        setTheme(t => t === 'dark' ? 'light' : 'dark');
        onClose();
      },
    },
    {
      id: 'sound',
      label: `Toggle Audio Feedback (Currently ${soundEnabled ? 'Enabled' : 'Muted'})`,
      category: 'Preferences',
      icon: <Volume2 size={16} />,
      execute: () => {
        setSoundEnabled(s => !s);
        onClose();
      },
    },
    {
      id: 'copy-email',
      label: 'Copy Email to Clipboard',
      category: 'Contact',
      icon: <Mail size={16} />,
      execute: () => {
        navigator.clipboard.writeText('alex.vance.dev@gmail.com');
        showToast('Email copied to clipboard: alex.vance.dev@gmail.com');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action) => {
    playSound('click', soundEnabled);
    action.execute();
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
      <div className="palette-window">
        {/* Input */}
        <div className="palette-input-wrap">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or section name..."
            className="palette-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button 
            className="btn-icon" 
            style={{ width: '28px', height: '28px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Action List */}
        <div className="palette-list">
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((action, idx) => (
              <div
                key={action.id}
                className={`palette-item ${selectedIndex === idx ? 'active' : ''}`}
                onClick={() => handleSelect(action)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>{action.icon}</span>
                  <span style={{ fontWeight: 600 }}>{action.label}</span>
                </div>
                <span className="tag-pill" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                  {action.category}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div 
          style={{ 
            padding: '10px 20px', 
            background: 'var(--bg-tertiary)', 
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>Use <kbd className="cmd-kbd">ESC</kbd> to exit</span>
          <span>Fast navigation command launcher</span>
        </div>
      </div>
    </div>
  );
};

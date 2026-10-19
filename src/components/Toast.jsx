import React from 'react';
import { Sparkles } from 'lucide-react';

export const Toast = ({ toasts }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <Sparkles size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

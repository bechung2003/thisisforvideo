import React, { useState } from 'react';
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const TestimonialsSection = ({ soundEnabled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = portfolioData.testimonials;

  const handlePrev = () => {
    playSound('click', soundEnabled);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playSound('click', soundEnabled);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  return (
    <section id="testimonials" className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <MessageSquareQuote size={14} />
            <span>Endorsements</span>
          </div>
          <h2 className="section-title">
            What <span className="text-gradient">Leaders</span> Say
          </h2>
          <p className="section-subtitle">
            Feedback from engineering leaders, product executives, and design partners.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="testimonials-slider">
          <div className="glass-card testimonial-card">
            {/* Star Rating & Quote Icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="testimonial-stars">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <Quote size={28} style={{ color: 'var(--primary)', opacity: 0.5 }} />
            </div>

            {/* Testimonial Quote */}
            <blockquote className="testimonial-quote">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Row */}
            <div className="testimonial-author-row">
              <div className="author-avatar">
                {current.avatarInitials}
              </div>
              <div>
                <div className="author-name">{current.author}</div>
                <div className="author-role">{current.role} • {current.company}</div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="slider-nav-controls">
            <button 
              className="btn-icon" 
              onClick={handlePrev}
              title="Previous recommendation"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {items.map((_, idx) => (
                <div
                  key={idx}
                  className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>

            <button 
              className="btn-icon" 
              onClick={handleNext}
              title="Next recommendation"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

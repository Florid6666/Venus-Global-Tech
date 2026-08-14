import React from 'react';
import './AgenticHero.css';

const AgenticHero = () => {
  return (
    <section className="agentic-hero-replica">
      {/* Blue Ambient Glow Effects */}
      <div className="agentic-hero-blue-glow" />
      <div className="agentic-hero-blue-glow-secondary" />

      <div className="agentic-hero-replica-container">
        {/* Left Column: Headline, Description & CTAs */}
        <div className="agentic-hero-replica-left">
          {/* Top Pill Badge */}
          <div className="agentic-hero-pill-badge">
            <svg
              className="badge-flow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="18" r="3"></circle>
              <circle cx="6" cy="6" r="3"></circle>
              <path d="M6 21V9a3 3 0 0 1 3-3h9"></path>
            </svg>
            <span>EFFORTLESS AUTOMATION</span>
          </div>

          {/* Main Headline */}
          <h1 className="agentic-hero-main-title">
            Stop Clicking, Start<br />
            Scaling with <span className="title-bold-accent">Agentic AI</span>
          </h1>

          {/* Sub Description */}
          <p className="agentic-hero-sub-description">
            Automate transforms your operations with seamless AI integration, turning complex processes into effortless flows. Reclaim your time and energy for what truly matters.
          </p>

          {/* Action Buttons */}
          <div className="agentic-hero-cta-row">
            <button
              className="agentic-btn-primary-blue"
              onClick={() => (window.location.href = '/contact')}
            >
              Explore Solutions
            </button>
            <button
              className="agentic-btn-secondary-outline"
              onClick={() => (window.location.href = '/contact')}
            >
              Start Free Trial <span className="btn-arrow-icon">→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Testimonial Card (Positioned lower, no hover, footer removed) */}
        <div className="agentic-hero-replica-right">
          <div className="agentic-testimonial-card-box">
            <p className="testimonial-quote-text">
              "Automate saved our team over 15 hours a week just in lead qualification alone, making our sales cycle faster."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticHero;

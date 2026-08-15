import React from 'react';
import './AgenticHero.css';

const AgenticHero = () => {
  return (
    <section className="agentic-hero-new">
      {/* Static Grid Pattern */}
      <div className="hero-grid-pattern" />

      <div className="agentic-hero-new-container">
        {/* Main Title */}
        <h1 className="hero-new-title">
          Welcome to the Era of <span className="blue-gradient-text">Agentic AI</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-new-subtitle">
          Autonomous agents that think, adapt, and collaborate
        </p>

        {/* Floating Stat Window Card */}
        <div className="hero-stat-card">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-teal" />
          </div>

          <div className="hero-stat-grid">
            <div className="stat-item">
              <div className="stat-number-blue">100K+</div>
              <div className="stat-label-mono">Community Members</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-blue">Open Source</div>
              <div className="stat-label-mono">Transparent &amp; Collaborative</div>
            </div>

            <div className="stat-item">
              <div className="stat-number-blue">Global</div>
              <div className="stat-label-mono">Worldwide Movement</div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hero-cta-wrapper">
          <button
            className="hero-join-btn"
            onClick={() => (window.location.href = '/contact')}
          >
            Join the Community <span className="btn-chevron">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgenticHero;

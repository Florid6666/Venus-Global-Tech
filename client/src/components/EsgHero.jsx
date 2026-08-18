import React from 'react';
import './EsgHero.css';

const EsgHero = () => {
  return (
    <section className="esg-hero-custom">
      {/* Background Blueprint Grid Pattern & Ambient Radial Glow */}
      <div className="esg-hero-grid-bg" />
      <div className="esg-hero-radial-glow" />

      <div className="esg-hero-custom-container">
        {/* Top Trust Pill Badge */}
        <div className="esg-trust-pill-badge">
          <div className="avatar-group">
            <span className="avatar-circle avatar-1">
              <i className="fas fa-user"></i>
            </span>
            <span className="avatar-circle avatar-2">+3</span>
            <span className="avatar-circle avatar-3">JD</span>
          </div>
          <span className="trust-text">
            Trusted by <strong>12,000+</strong> global enterprise leaders
          </span>
          <span className="trust-dot-indicator"></span>
        </div>

        {/* Hero Headline (Exact matching layout) */}
        <h1 className="esg-hero-main-title">
          <span className="title-row-plain">Autonomous, AI-Powered</span>
          <span className="title-row-gradient">Cloud Enterprise ESG Suite</span>
        </h1>

        {/* Subtitle Description */}
        <p className="esg-hero-main-desc">
          Drive sustainable operations, transparent reporting, responsible governance, and measurable impact with VGT ESG – the next-generation intelligent platform for building a resilient, responsible, and future-ready enterprise.
        </p>

        {/* Dual CTA Pill Buttons */}
        <div className="esg-hero-cta-buttons">
          <button 
            className="esg-btn-primary"
            onClick={() => window.location.href = '/contact'}
          >
            Start Free Trial <span className="btn-arrow">→</span>
          </button>
          
          <button 
            className="esg-btn-secondary"
            onClick={() => window.location.href = '/contact'}
          >
            <span className="play-icon-shape">▶</span> Watch AI Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default EsgHero;

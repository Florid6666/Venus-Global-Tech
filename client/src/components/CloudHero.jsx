import React from 'react';
import './CloudHero.css';

const CloudHero = () => {
  return (
    <section className="cloud-hero-custom">
      {/* Background Blueprint Grid Pattern & Ambient Radial Glow */}
      <div className="cloud-hero-grid-bg" />
      <div className="cloud-hero-radial-glow" />

      <div className="cloud-hero-custom-container">
        {/* Top Trust Pill Badge */}
        <div className="cloud-trust-pill-badge">
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
        <h1 className="cloud-hero-main-title">
          <span className="title-row-plain">Scalable, Enterprise-Grade</span>
          <span className="title-row-gradient">Cloud Computing & Infrastructure</span>
        </h1>

        {/* Subtitle Description */}
        <p className="cloud-hero-main-desc">
          Architect, migrate, automate, and optimize your enterprise IT infrastructure with VGT Cloud Services – the next-generation intelligent platform for building secure, high-performance, and resilient cloud environments.
        </p>

        {/* Dual CTA Pill Buttons */}
        <div className="cloud-hero-cta-buttons">
          <button 
            className="cloud-btn-primary"
            onClick={() => window.location.href = '/contact'}
          >
            Start Free Trial <span className="btn-arrow">→</span>
          </button>
          
          <button 
            className="cloud-btn-secondary"
            onClick={() => window.location.href = '/contact'}
          >
            <span className="play-icon-shape">▶</span> Talk to Cloud Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default CloudHero;

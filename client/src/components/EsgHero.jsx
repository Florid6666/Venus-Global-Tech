import React, { useState, useRef } from 'react';
import './EsgHero.css';

const EsgHero = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={heroRef}
      className="esg-hero-custom" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Background Blueprint Grid Pattern & Ambient Radial Glow */}
      <div 
        className="esg-hero-grid-bg"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      />
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

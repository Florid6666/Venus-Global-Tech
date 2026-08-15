import React, { useState, useRef } from 'react';
import './CloudHero.css';

const CloudHero = () => {
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
      className="cloud-hero-custom" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Background Blueprint Grid Pattern & Ambient Radial Glow */}
      <div 
        className="cloud-hero-grid-bg"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      />
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

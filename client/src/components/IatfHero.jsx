import React, { useState, useRef } from 'react';
import './IatfHero.css';

const IatfHero = () => {
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
      className="iatf-hero-custom" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Background Blueprint Grid Pattern & Ambient Radial Glow */}
      <div 
        className="iatf-hero-grid-bg"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`
        }}
      />
      <div className="iatf-hero-radial-glow" />

      <div className="iatf-hero-custom-container">
        {/* Top Trust Pill Badge */}
        <div className="iatf-trust-pill-badge">
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

        {/* Hero Headline */}
        <h1 className="iatf-hero-main-title">
          <span className="title-row-plain">Automotive Quality</span>
          <span className="title-row-gradient">Management Excellence</span>
        </h1>

        {/* Subtitle Description */}
        <p className="iatf-hero-main-desc">
          Achieve IATF 16949 certification with our comprehensive auditing services. Our expert auditors help automotive organizations implement, maintain, and continuously improve their quality management systems to meet international automotive standards.
        </p>

        {/* Dual CTA Pill Buttons */}
        <div className="iatf-hero-cta-buttons">
          <button 
            className="iatf-btn-primary"
            onClick={() => window.location.href = '/contact'}
          >
            Start Free Trial <span className="btn-arrow">→</span>
          </button>
          
          <button 
            className="iatf-btn-secondary"
            onClick={() => window.location.href = '/contact'}
          >
            <span className="play-icon-shape">▶</span> Talk to IATF Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default IatfHero;

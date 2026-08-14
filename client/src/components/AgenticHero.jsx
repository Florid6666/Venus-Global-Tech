import React, { useState, useRef } from 'react';
import './AgenticHero.css';

const AgenticHero = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorAbsPos, setCursorAbsPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    setMousePos({ x, y });
    setCursorAbsPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={heroRef}
      className="agentic-hero-new"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
    >
      {/* Interactive Cursor Light Spotlight */}
      <div
        className="hero-cursor-spotlight"
        style={{
          left: `${cursorAbsPos.x}px`,
          top: `${cursorAbsPos.y}px`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Grid Pattern with Dynamic Parallax Movement */}
      <div
        className="hero-grid-pattern"
        style={{
          transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 28}px, 0)`,
        }}
      />



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

import React, { useState, useEffect } from 'react';
import './AgenticHero.css';

const AgenticHero = () => {
  // Expansion state: false (0s to 1.5s centered 380x380 card state) -> true (expands to full stage after 1.5s)
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // 1.5 sec delay before triggering Apple-style smooth frame expansion into the webpage
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="agentic-hero-section">
      {/* Pure Color Background Cloudinary Video */}
      <div className="agentic-hero-video-container">
        <video
          className="agentic-hero-bg-video"
          src="https://res.cloudinary.com/dtjm9y9wz/video/upload/v1786731576/agentai-video_mlpoe1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Blue Ambient Glow Effects */}
      <div className="agentic-hero-blue-glow" />
      <div className="agentic-hero-blue-glow-secondary" />

      {/* Stage Container for Initial Centered Card -> Full Expansion Transition */}
      <div className={`stage-container ${isExpanded ? 'page-active' : ''}`}>
        {/* Base Collapsed Frame (Card State) -> Expanded Full-Stage State */}
        <div className={`media-frame ${isExpanded ? 'expanded' : ''}`}>
          <div
            className="media-bg"
            style={{ backgroundImage: `url('/images/agentic_hero_cyber.png')` }}
          />
        </div>
      </div>

      {/* Webpage Hero Content (Fades in smoothly as expansion completes) */}
      <div className={`agentic-hero-content-wrap ${isExpanded ? 'visible' : ''}`}>
        <div className="agentic-hero-replica-container">
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
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M6 21V9a3 3 0 0 1 3-3h9" />
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
        </div>
      </div>
    </section>
  );
};

export default AgenticHero;

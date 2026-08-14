import React from 'react';
import './ThreePillarsSection.css';

// SVG Icon Helpers matching the reference screenshot
const BadgeFlowIcon = () => (
  <svg
    width="14"
    height="14"
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
);

// Icon 1: Proactive Agents - Ultra-clean AI Robot Agent Head (104px)
const ProactiveAgentsIcon = () => (
  <svg
    viewBox="0 0 96 96"
    width="104"
    height="104"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Futuristic AI Agent Head Frame */}
    <rect x="20" y="26" width="56" height="46" rx="16" strokeWidth="2.6" />
    
    {/* Visor Display Screen */}
    <rect x="28" y="36" width="40" height="16" rx="8" fill="rgba(255, 255, 255, 0.18)" strokeWidth="2" />
    <circle cx="38" cy="44" r="3.5" fill="#FFFFFF" />
    <circle cx="58" cy="44" r="3.5" fill="#FFFFFF" />

    {/* Top Antenna & Signal Spark Waves */}
    <path d="M48 26v-10" strokeWidth="2.4" />
    <circle cx="48" cy="13" r="3" fill="#FFFFFF" />
    <path d="M40 11c-2-2-2-5 0-7M56 11c2-2 2-5 0-7" strokeWidth="2" />

    {/* Side Ear Data Nodes */}
    <path d="M14 44h6M76 44h6" strokeWidth="2.5" />

    {/* Smart Indicator Status Line */}
    <path d="M40 60h16" strokeWidth="2.2" />

    {/* Neck & Shoulder Stand Base */}
    <path d="M38 72v6M58 72v6" strokeWidth="2.4" />
    <path d="M26 86c6-4 14-6 22-6s16 2 22 6" strokeWidth="2.6" />
  </svg>
);

// Icon 2: Unified Integration - Interconnected API & Tech Stack Nodes (104px)
const UnifiedIntegrationIcon = () => (
  <svg
    viewBox="0 0 96 96"
    width="104"
    height="104"
    fill="none"
    stroke="#334155"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Central Core API Hub Node */}
    <circle cx="48" cy="48" r="10" strokeWidth="2.8" />
    <circle cx="48" cy="48" r="4" fill="#334155" />

    {/* 4 Satellite Integration Service Nodes */}
    <circle cx="22" cy="24" r="7" strokeWidth="2.4" />
    <circle cx="74" cy="24" r="7" strokeWidth="2.4" />
    <circle cx="22" cy="72" r="7" strokeWidth="2.4" />
    <circle cx="74" cy="72" r="7" strokeWidth="2.4" />

    {/* Connection Pipelines */}
    <path d="M28 28l12 12M68 28l-12 12M28 68l12-12M68 68l-12-12" strokeWidth="2.4" />
    <path d="M29 24h38M29 72h38M22 31v34M74 31v34" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

// Icon 3: Scalability Built-in - Auto-Scaling Chip with Upward Growth Arrows (104px)
const ScalabilityIcon = () => (
  <svg
    viewBox="0 0 96 96"
    width="104"
    height="104"
    fill="none"
    stroke="#334155"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main Microchip Server Box */}
    <rect x="24" y="24" width="48" height="48" rx="8" strokeWidth="2.8" />
    <rect x="36" y="36" width="24" height="24" rx="4" strokeWidth="2.2" />

    {/* CPU Pins */}
    <path d="M34 24v-8M48 24v-8M62 24v-8" strokeWidth="2.4" />
    <path d="M34 72v8M48 72v8M62 72v8" strokeWidth="2.4" />
    <path d="M24 34h-8M24 48h-8M24 62h-8" strokeWidth="2.4" />
    <path d="M72 34h8M72 48h8M72 62h8" strokeWidth="2.4" />

    {/* Upward Growth Arrow inside Chip */}
    <path d="M42 54l12-12M46 42h8v8" strokeWidth="2.6" stroke="#2563EB" />
  </svg>
);

const ThreePillarsSection = () => {
  return (
    <section className="three-pillars-section">
      <div className="three-pillars-container">
        {/* Section Top Header */}
        <div className="three-pillars-header">
          <div className="three-pillars-header-left">
            <div className="three-pillars-badge">
              <BadgeFlowIcon />
              <span>WHY AUTOMATE</span>
            </div>

            <h2 className="three-pillars-main-title">
              The Three Pillars of<br />
              Effortless Automation
            </h2>
          </div>

          <div className="three-pillars-header-right">
            <p className="three-pillars-header-subtitle">
              We built Automate on a foundation of speed, intelligence, and seamless integration. Discover the core features that will revolutionize how your business operates. Stop managing complexity, start enabling growth.
            </p>
          </div>
        </div>

        {/* 3-Column Pillars Grid */}
        <div className="three-pillars-grid">
          {/* Card 1: Featured Blue Gradient Card with Liquid Wave Background Pattern */}
          <div className="pillar-card pillar-card-featured-blue">
            {/* SVG Organic Liquid Wave Pattern Overlay */}
            <svg
              className="pillar-card-wave-svg"
              viewBox="0 0 400 520"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="blueWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
                  <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="blueWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="blueWaveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.65" />
                  <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.45" />
                </linearGradient>
              </defs>
              <path d="M-60,70 C80,-30 220,110 460,15 L460,560 L-60,560 Z" fill="url(#blueWaveGrad1)" />
              <path d="M-60,200 C110,90 270,250 460,160 L460,560 L-60,560 Z" fill="url(#blueWaveGrad2)" />
              <path d="M-60,330 C140,230 310,390 460,290 L460,560 L-60,560 Z" fill="url(#blueWaveGrad3)" />
              <path d="M-60,430 C160,350 340,470 460,380 L460,560 L-60,560 Z" fill="rgba(30, 58, 138, 0.45)" />
            </svg>

            {/* Glowing Ambient Spotlights */}
            <div className="pillar-card-glow-bg" />
            <div className="pillar-card-glow-secondary" />

            <div className="pillar-card-content">
              <div className="pillar-card-icon-wrap icon-large">
                <ProactiveAgentsIcon />
              </div>
              <h3 className="pillar-card-title-white">Proactive Agents</h3>
              <p className="pillar-card-desc-white">
                Our AI Agents don't just follow rules; they make smart, contextual decisions in real-time. This dynamic problem-solving ensures your workflows never stall. It's like having a team of dedicated analysts working 24/7.
              </p>
            </div>
            <button className="pillar-watch-video-btn" onClick={() => (window.location.href = '/contact')}>
              Watch Video <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Card 2: Unified Integration */}
          <div className="pillar-card pillar-card-white">
            <div className="pillar-card-content">
              <div className="pillar-card-icon-wrap icon-large">
                <UnifiedIntegrationIcon />
              </div>
              <h3 className="pillar-card-title-dark">Unified Integration</h3>
              <p className="pillar-card-desc-dark">
                Connect your entire tech stack—from legacy systems to modern cloud applications—in minutes. Our unified API layer ensures data flows smoothly and securely between all your tools. Data silos are officially a thing of the past.
              </p>
            </div>
          </div>

          {/* Card 3: Scalability Built-in */}
          <div className="pillar-card pillar-card-white">
            <div className="pillar-card-content">
              <div className="pillar-card-icon-wrap icon-large">
                <ScalabilityIcon />
              </div>
              <h3 className="pillar-card-title-dark">Scalability Built-in</h3>
              <p className="pillar-card-desc-dark">
                Automation should fuel growth, not limit it. Our platform scales automatically to handle millions of transactions per day without performance degradation. Pay only for the usage you need as you grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePillarsSection;

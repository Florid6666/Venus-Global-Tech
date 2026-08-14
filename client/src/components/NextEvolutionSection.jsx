import React from 'react';
import './NextEvolutionSection.css';

// SVG Icons & Logos for UI Mockups
const OpenAILogoSmall = () => (
  <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
    <path
      d="M25.6 13.2C25.2 11.3 23.9 9.8 22.1 9.1C21.7 6.9 20.1 5.2 18 4.6C15.9 4 13.6 4.7 12.2 6.3C10.4 5.9 8.5 6.4 7.2 7.7C5.9 9 5.5 11 6 12.8C4.5 14 3.8 16 4.2 18C4.6 20 6 21.5 7.9 22.1C8.3 24.3 9.9 26 12 26.6C14.1 27.2 16.4 26.5 17.8 24.9C19.6 25.3 21.5 24.8 22.8 23.5C24.1 22.2 24.5 20.2 24 18.4C25.5 17.2 26.2 15.2 25.6 13.2Z"
      stroke="#0F172A"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M16 11V21M11 13.5L21 18.5M21 13.5L11 18.5" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GithubIconSmall = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#334155">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const HubspotIconSmall = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M16 10V7.5l2-1.2c.4-.2.6-.7.6-1.2 0-.8-.7-1.5-1.5-1.5-.6 0-1.2.4-1.4.9l-2.1 1.2V4.5c0-.8-.7-1.5-1.5-1.5S10.5 3.7 10.5 4.5V10c-.7.5-1.2 1.2-1.2 2.1 0 .9.5 1.6 1.2 2.1V20c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.8c.7-.5 1.2-1.2 1.2-2.1 0-.9-.5-1.6-1.2-2.1z" fill="#FF7A59" />
    <circle cx="17" cy="12.5" r="2.5" fill="#FF7A59" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const NextEvolutionSection = () => {
  return (
    <section className="next-evo-section">
      <div className="next-evo-container">
        {/* Section Centered Header */}
        <div className="next-evo-header">
          <h2 className="next-evo-title">
            The Next Evolution of<br />
            AI Automation Tools
          </h2>
          <p className="next-evo-subtitle">
            We engineered every feature to deliver maximum impact with minimal complexity. Automate handles the heavy lifting so you don't have to.
          </p>
        </div>

        {/* 2x2 Bento Grid with Asymmetric Row Layouts */}
        <div className="next-evo-bento-grid">
          {/* Row 1: Flow Builder (62% wide, side-by-side) & Exception Engine (38% narrow, stacked) */}
          <div className="bento-row bento-row-1">
            {/* Row 1, Card 1: Intuitive Flow Builder */}
            <div className="bento-card bento-card-flow-builder">
              <div className="bento-card-text">
                <div className="bento-badge">VISUAL BUILDER</div>
                <h3 className="bento-card-title">Intuitive Flow Builder</h3>
                <p className="bento-card-desc">
                  Design complex, multi-step workflows using our intuitive, drag-and-drop canvas. Launch functional AI agents instantly without writing a single line of code.
                </p>
                <button className="bento-cta-btn" onClick={() => (window.location.href = '/contact')}>
                  Create Workflow Now <span className="btn-arrow">→</span>
                </button>
              </div>

              {/* Flow Builder Image */}
              <div className="bento-mockup-wrap mockup-flow-image-wrap">
                <img
                  src="/images/intuitive_flow_builder.png"
                  alt="Intuitive Flow Builder"
                  className="flow-builder-img"
                />
              </div>
            </div>

            {/* Row 1, Card 2: Intelligent Exception Engine */}
            <div className="bento-card bento-card-exception">
              <div className="bento-card-text">
                <h3 className="bento-card-title">Intelligent Exception Engine</h3>
                <p className="bento-card-desc">
                  Ensure 99.9% uptime by having Automate proactively handle anomalies and errors in real-time.
                </p>
              </div>

              {/* Exception Engine Image */}
              <div className="bento-mockup-wrap mockup-exception-image-wrap">
                <img
                  src="/images/intelligent_exception_engine.png"
                  alt="Intelligent Exception Engine"
                  className="exception-engine-img"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Real-time ROI Tracking (46% narrow) & Instant Solution Deployment (54% wide) */}
          <div className="bento-row bento-row-2">
            {/* Row 2, Card 3: Real-time ROI Tracking */}
            <div className="bento-card bento-card-roi">
              <div className="bento-card-text">
                <h3 className="bento-card-title">Real-time ROI Tracking</h3>
                <p className="bento-card-desc">
                  See exactly how much time and money Automate is saving you with the transparent, real-time performance metrics.
                </p>
              </div>

              {/* ROI Tracking Image */}
              <div className="bento-mockup-wrap mockup-roi-image-wrap">
                <img
                  src="/images/realtime_roi_tracking.png"
                  alt="Real-time ROI Tracking"
                  className="roi-tracking-img"
                />
              </div>
            </div>

            {/* Row 2, Card 4: Instant Solution Deployment */}
            <div className="bento-card bento-card-deployment">
              <div className="bento-card-text">
                <h3 className="bento-card-title">Instant Solution Deployment</h3>
                <p className="bento-card-desc">
                  Get immediate value by choosing from our curated library of verified solutions. Deploy entire operational systems with a single click.
                </p>
              </div>

              {/* Solution Deployment Image */}
              <div className="bento-mockup-wrap mockup-deployment-image-wrap">
                <img
                  src="/images/instant_solution_deployment.png"
                  alt="Instant Solution Deployment"
                  className="deployment-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextEvolutionSection;

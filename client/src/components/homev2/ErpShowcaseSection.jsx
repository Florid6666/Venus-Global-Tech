import React from 'react';

/**
 * ErpShowcaseSection Component
 * 
 * Standalone React Component for VGT Powered ERP AI.
 * Replaced laptop mockup with a sleek Computer Monitor Screen mockup.
 * Includes user specified 280px Manrope gradient ERP text and full responsive alignment.
 *
 * @param {Function} [props.onExploreClick] - Optional click handler for the Explore CTA button.
 */
const ErpShowcaseSection = ({ onExploreClick }) => {
  return (
    <section className="erp-showcase-v2-container" id="erp-showcase">
      {/* Embedded CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .erp-showcase-v2-container {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          width: 100%;
          padding: 80px 120px 100px 120px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%);
          overflow: hidden;
          box-sizing: border-box;
          color: #0f172a;
        }

        @media (max-width: 1600px) {
          .erp-showcase-v2-container {
            padding: 80px 80px 100px 80px;
          }
        }

        @media (max-width: 1024px) {
          .erp-showcase-v2-container {
            padding: 60px 30px 80px 30px;
          }
        }

        @media (max-width: 767px) {
          .erp-showcase-v2-container {
            padding: 50px 18px 60px 18px;
          }
        }

        /* Ambient Glow Backgrounds */
        .erp-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 1;
        }

        .erp-glow-1 {
          width: 600px;
          height: 600px;
          top: -100px;
          left: -150px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .erp-glow-2 {
          width: 500px;
          height: 500px;
          bottom: -50px;
          right: -100px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .erp-showcase-v2-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* LEFT COLUMN - COMPUTER MONITOR MOCKUP & DASHBOARD */
        .erp-mockup-col {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
        }

        .monitor-wrapper {
          position: relative;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .monitor-wrapper:hover {
          transform: translateY(-4px);
        }

        /* Computer Monitor Screen Frame */
        .monitor-screen {
          background: #0f172a;
          border-radius: 20px;
          padding: 14px;
          box-shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.28), 0 0 45px rgba(37, 99, 235, 0.12);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          width: 100%;
          box-sizing: border-box;
        }

        .monitor-webcam {
          width: 7px;
          height: 7px;
          background: #334155;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8);
          z-index: 5;
        }

        .monitor-display-content {
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
          width: 100%;
        }

        .monitor-dashboard-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 10px;
        }

        /* Monitor Stand Neck (Vertical Pillar) */
        .monitor-neck {
          width: 80px;
          height: 38px;
          background: linear-gradient(180deg, #94a3b8 0%, #cbd5e1 50%, #94a3b8 100%);
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1);
          z-index: 1;
        }

        /* Monitor Stand Base (Oval Foot) */
        .monitor-base {
          width: 240px;
          height: 14px;
          background: linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 60%, #94a3b8 100%);
          border-radius: 9999px;
          position: relative;
          box-shadow: 0 12px 25px -4px rgba(15, 23, 42, 0.25);
          z-index: 2;
        }

        /* RIGHT COLUMN - TEXT & DETAILS */
        .erp-text-col {
          display: flex;
          flex-direction: column;
          position: relative;
          width: 100%;
          max-width: 640px;
        }

        /* Top Outline E R P Row with crisp blue outline SVG */
        .erp-top-outline-svg {
          width: 100%;
          max-width: 520px;
          height: auto;
          display: block;
          margin-bottom: 28px;
          user-select: none;
          pointer-events: none;
        }

        .erp-heading {
          font-size: 46px;
          font-weight: 800;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 24px 0;
          letter-spacing: -0.03em;
        }

        .erp-heading .highlight-blue {
          color: #2563eb;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .erp-description {
          font-size: 17px;
          line-height: 1.7;
          color: #475569;
          margin: 0 0 36px 0;
          max-width: 580px;
        }

        /* Badges Pill Row */
        .erp-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }

        .erp-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          transition: all 0.25s ease;
        }

        .erp-badge-pill:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.08);
        }

        .erp-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          font-size: 16px;
        }

        /* Primary CTA Button */
        .erp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 18px 40px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          width: fit-content;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 30px -5px rgba(37, 99, 235, 0.42);
        }

        .erp-cta-btn:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -6px rgba(29, 78, 216, 0.52);
        }

        .erp-cta-btn svg {
          transition: transform 0.25s ease;
        }

        .erp-cta-btn:hover svg {
          transform: translateX(3px);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1280px) {
          .erp-showcase-v2-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .monitor-wrapper {
            max-width: 680px;
          }

          .erp-heading {
            font-size: 38px;
          }

          .erp-top-outline-text {
            font-size: 200px;
          }
        }

        @media (max-width: 640px) {
          .erp-showcase-v2-container {
            padding: 60px 16px;
          }

          .monitor-wrapper {
            max-width: 100%;
          }

          .monitor-base {
            width: 180px;
          }

          .erp-top-outline-text {
            font-size: 120px;
            margin-bottom: 20px;
          }

          .erp-heading {
            font-size: 28px;
          }

          .erp-description {
            font-size: 14.5px;
          }

          .erp-badges-row {
            gap: 10px;
          }

          .erp-badge-pill {
            padding: 10px 16px;
            font-size: 13px;
            width: 100%;
            justify-content: center;
          }

          .erp-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="erp-ambient-glow erp-glow-1"></div>
      <div className="erp-ambient-glow erp-glow-2"></div>

      <div className="erp-showcase-v2-inner">
        {/* LEFT COLUMN: Computer Monitor Mockup with User's Dashboard Image */}
        <div className="erp-mockup-col">
          <div className="monitor-wrapper">
            <div className="monitor-screen">
              <div className="monitor-webcam"></div>
              <div className="monitor-display-content">
                <img
                  src="/images/homev2/vgt-erp-dashboard.png"
                  alt="VGT ERP AI Operations Dashboard"
                  className="monitor-dashboard-img"
                />
              </div>
            </div>
            {/* Monitor Stand Neck & Base */}
            <div className="monitor-neck"></div>
            <div className="monitor-base"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Details */}
        <div className="erp-text-col">
          {/* Crisp Blue Outline ERP Vector SVG */}
          <svg viewBox="0 0 540 185" className="erp-top-outline-svg" aria-label="ERP">
            <defs>
              <linearGradient id="erp-blue-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            {/* E */}
            <path
              d="M 5 5 H 145 V 40 H 42 V 76 H 132 V 108 H 42 V 150 H 145 V 185 H 5 Z"
              fill="none"
              stroke="url(#erp-blue-stroke)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* R Outer & Inner Loop cutout */}
            <path
              d="M 175 5 H 270 C 312 5 340 25 340 55 C 340 85 312 105 270 105 L 335 185 H 285 L 228 105 H 212 V 185 H 175 Z M 212 38 H 265 C 286 38 298 44 298 55 C 298 66 286 72 265 72 H 212 Z"
              fill="none"
              stroke="url(#erp-blue-stroke)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fillRule="evenodd"
            />
            {/* P Outer & Inner Loop cutout */}
            <path
              d="M 370 5 H 465 C 507 5 530 25 530 60 C 530 95 507 115 465 115 H 407 V 185 H 370 Z M 407 38 H 460 C 478 38 490 46 490 60 C 490 74 478 82 460 82 H 407 Z"
              fill="none"
              stroke="url(#erp-blue-stroke)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fillRule="evenodd"
            />
          </svg>

          <h2 className="erp-heading">
            VGT Powered ERP AI –<br />
            Enterprise Automation,<br />
            <span className="highlight-blue">Engineered In-House</span>
          </h2>

          <p className="erp-description">
            We didn't just consult on ERP — we built one. Venus ERP Suite is our own in-house platform,
            already running in production, unifying automation, HR, finance, and day-to-day operations
            into a single system of record for businesses across industries.
          </p>



          <a
            href="#explore-app"
            className="erp-cta-btn"
            onClick={(e) => {
              if (onExploreClick) {
                e.preventDefault();
                onExploreClick();
              }
            }}
          >
            <span>EXPLORE APP EXPERIENCE</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErpShowcaseSection;

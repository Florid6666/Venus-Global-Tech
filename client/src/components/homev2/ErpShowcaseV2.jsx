import React from 'react';
import './ErpShowcaseV2.css';

const DEFAULT_FEATURES = [
  { icon: 'fa-robot', label: 'Process Automation' },
  { icon: 'fa-users', label: 'HR Management' },
  { icon: 'fa-coins', label: 'Finance & Accounting' },
  { icon: 'fa-gears', label: 'Operations' },
  { icon: 'fa-chart-line', label: 'Real-Time Analytics' },
];

const ErpShowcaseV2 = ({ content }) => {
  const badgeText = content?.badge || 'BUILT IN-HOUSE BY VENUS GLOBAL TECHNOLOGY';
  const headingText = content?.title || 'Venus ERP Suite — Enterprise Automation, Engineered In-House';
  const paragraphText = content?.description || "We didn't just consult on ERP — we built one. Venus ERP Suite is our own in-house platform, already running in production, unifying automation, HR, finance, and day-to-day operations into a single system of record for businesses across industries.";
  const features = content?.features?.length > 0 ? content.features : DEFAULT_FEATURES;
  const ctaButton = content?.ctaButton || 'Explore Venus ERP Suite';
  const ctaLink = content?.ctaLink || 'https://brewmaster-ui.vercel.app/';
  const ctaNote = content?.ctaNote || 'Live product walkthrough — opens in a new tab';
  const image = content?.image || '/images/homev2/wave-dashboard.png';

  return (
    <section className="v2-erp-section" id="venus-erp-suite">
      <div className="v2-erp-ambient-glow glow-1"></div>
      <div className="v2-erp-ambient-glow glow-2"></div>

      <div className="v2-erp-container">
        <div className="v2-erp-header v2-reveal-on-scroll v2-reveal-up">
          <div className="v2-erp-badge">
            <span className="v2-erp-badge-dot"></span>
            <span className="v2-erp-badge-text">{badgeText}</span>
          </div>
          <h2 className="v2-erp-heading">{headingText}</h2>
          <p className="v2-erp-paragraph">{paragraphText}</p>
        </div>

        <div className="v2-erp-features-row v2-reveal-on-scroll v2-reveal-up">
          {features.map((f, i) => (
            <div className="v2-erp-feature-pill" key={i}>
              <span className="v2-erp-feature-icon">
                <i className={`fas ${f.icon || 'fa-cube'}`}></i>
              </span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        <div className="v2-erp-showcase v2-reveal-on-scroll v2-reveal-scale">
          <div className="v2-erp-browser-frame">
            <div className="v2-erp-browser-topbar">
              <div className="v2-erp-browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="v2-erp-browser-url">
                <i className="fas fa-lock"></i>
                <span>venuserp.io/dashboard</span>
              </div>
            </div>
            <div className="v2-erp-browser-body">
              <img src={image} alt="Venus ERP Suite dashboard" className="v2-erp-dashboard-img" />
            </div>
          </div>

          {/* Floating status badges */}
          <div className="v2-erp-float-badge badge-erp-top-left">
            <div className="v2-erp-float-icon icon-automation">
              <i className="fas fa-bolt"></i>
            </div>
            <div className="v2-erp-float-text">
              <strong>Automation Live</strong>
              <span>Workflows syncing in real time</span>
            </div>
          </div>

          <div className="v2-erp-float-badge badge-erp-bottom-right">
            <div className="v2-erp-float-icon icon-finance">
              <i className="fas fa-coins"></i>
            </div>
            <div className="v2-erp-float-text">
              <strong>Finance Synced</strong>
              <span>Books reconciled automatically</span>
            </div>
          </div>
        </div>

        <div className="v2-erp-cta-wrap v2-reveal-on-scroll v2-reveal-up">
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-erp-btn-primary"
          >
            <span>{ctaButton}</span>
            <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
          <span className="v2-erp-cta-note">{ctaNote}</span>
        </div>
      </div>
    </section>
  );
};

export default ErpShowcaseV2;

import React from 'react';
import './EsgComplianceV2.css';

const DEFAULT_PANELS = [
  {
    id: 'sustainability',
    icon: 'fa-seedling',
    title: 'Sustainability & ESG Solutions',
    description: 'Comprehensive ESG consulting, carbon footprint accounting, and sustainability reporting aligned with global frameworks.',
    items: [
      'ESG Strategy & Consulting',
      'Carbon Footprint Tracking & Auditing',
      'Sustainability Reporting (GRI / SASB)'
    ],
    ctaText: 'Explore ESG Solutions',
    link: '/services'
  },
  {
    id: 'governance',
    icon: 'fa-shield-alt',
    title: 'Governance & Compliance',
    description: 'Enterprise risk management, governance frameworks, and automated regulatory monitoring tailored for modern industries.',
    items: [
      'Compliance Risk Assessments',
      'Governance & Policy Frameworks',
      'Automated Regulatory Monitoring'
    ],
    ctaText: 'View Compliance Services',
    link: '/services'
  },
  {
    id: 'iatf-auditing',
    icon: 'fa-clipboard-check',
    title: 'IATF 16949 & Industry Standards',
    description: 'Specialized consulting for automotive quality management (IATF 16949) and ISO digital compliance automation.',
    items: [
      'IATF 16949 Audit Preparation',
      'Quality Management Systems (QMS)',
      'Digital Compliance Automation'
    ],
    ctaText: 'Learn About Auditing',
    link: '/iatf-auditing'
  }
];

const EsgComplianceV2 = ({ content }) => {
  const badgeText = content?.badge || 'GOVERNANCE & SUSTAINABILITY';
  const headingText = content?.title || 'ESG & Compliance Services';
  const paragraphText = content?.description || 'Building enterprise trust through sustainable innovation, robust governance frameworks, and rigorous regulatory compliance.';
  const panels = content?.panels || DEFAULT_PANELS;

  return (
    <section className="v2-esg-section" id="esg-compliance-services">
      <div className="v2-esg-container">
        
        {/* CENTERED HEADER */}
        <div className="v2-esg-header">
          <div className="v2-esg-badge">
            <span className="v2-esg-badge-dot"></span>
            <span className="v2-esg-badge-text">{badgeText}</span>
          </div>

          <h2 className="v2-esg-heading">
            {headingText}
          </h2>

          <p className="v2-esg-paragraph">
            {paragraphText}
          </p>
        </div>

        {/* 3 LARGE FEATURE DASHBOARD PANELS */}
        <div className="v2-esg-panels-grid">
          {panels.map((panel, index) => (
            <div 
              className="v2-esg-panel"
              key={panel.id || index}
              onClick={() => window.location.href = panel.link || '/services'}
            >
              {/* Panel Top Header */}
              <div className="v2-esg-panel-header">
                <div className="v2-esg-panel-icon-wrap">
                  <i className={`fas ${panel.icon}`}></i>
                </div>
                <span className="v2-esg-module-pill">Dashboard Module</span>
              </div>

              {/* Panel Body */}
              <div className="v2-esg-panel-body">
                <h3 className="v2-esg-panel-title">{panel.title}</h3>
                <p className="v2-esg-panel-desc">{panel.description}</p>

                {/* Capability Bullet List */}
                <ul className="v2-esg-panel-list">
                  {panel.items?.map((item, i) => (
                    <li key={i}>
                      <span className="v2-esg-list-check">
                        <i className="fas fa-check"></i>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Panel Footer CTA Link */}
              <div className="v2-esg-panel-footer">
                <span className="v2-esg-cta-link-text">{panel.ctaText}</span>
                <i className="fas fa-arrow-right-long v2-esg-cta-arrow"></i>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EsgComplianceV2;

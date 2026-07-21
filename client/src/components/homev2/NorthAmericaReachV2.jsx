import React, { useState } from 'react';
import './NorthAmericaReachV2.css';

const DEFAULT_DIRECTORY = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    icon: 'fa-robot',
    countText: '4 Specialized Services',
    services: [
      'AI Development Company USA',
      'AI Development Company Canada',
      'AI Consulting Company USA',
      'Enterprise AI & Automation'
    ]
  },
  {
    id: 'software-eng',
    title: 'Software Engineering',
    icon: 'fa-code',
    countText: '3 Specialized Services',
    services: [
      'Software Development USA',
      'Software Development Canada',
      'Custom Enterprise Software'
    ]
  },
  {
    id: 'cloud-trans',
    title: 'Cloud & Transformation',
    icon: 'fa-cloud-upload-alt',
    countText: '3 Specialized Services',
    services: [
      'Cloud Consulting Company USA',
      'Digital Transformation Company USA',
      'Hybrid Cloud Architecture'
    ]
  },
  {
    id: 'enterprise-svcs',
    title: 'Enterprise Services',
    icon: 'fa-building',
    countText: '3 Specialized Services',
    services: [
      'Custom AI Solutions',
      'AI Automation Company',
      'Enterprise System Integration'
    ]
  }
];

const NorthAmericaReachV2 = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const badgeText = content?.badge || 'NORTH AMERICAN REACH';
  const headingText = content?.title || 'Serving Businesses Across North America';
  const paragraphText = content?.description || 'Delivering enterprise software engineering, AI consulting, and digital transformation for market-leading organizations across the United States and Canada.';
  const categories = (content?.categories && content.categories.length > 0) ? content.categories : DEFAULT_DIRECTORY;
  const buttonText = content?.ctaButton || 'Connect with Our Regional Teams';

  return (
    <section className="v2-reach-section" id="north-america-reach">
      <div className="v2-reach-container">
        <div className="v2-reach-grid">
          
          {/* LEFT SIDE: Headline, Paragraph, CTA & Network Nodes */}
          <div className="v2-reach-left">
            <div className="v2-reach-badge">
              <span className="v2-reach-badge-dot"></span>
              <span className="v2-reach-badge-text">{badgeText}</span>
            </div>

            <h2 className="v2-reach-heading">
              {headingText}
            </h2>

            <p className="v2-reach-paragraph">
              {paragraphText}
            </p>

            <button 
              className="v2-reach-btn"
              onClick={() => window.location.href = '/contact'}
            >
              <span>{buttonText}</span>
              <i className="fas fa-arrow-right"></i>
            </button>

            {/* Regional Map Network Hub Graphic */}
            <div className="v2-reach-hub-card">
              <div className="v2-hub-node node-usa">
                <span className="v2-hub-flag">🇺🇸</span>
                <strong>United States</strong>
                <span>Strategic Engineering Hub</span>
              </div>
              <div className="v2-hub-line"></div>
              <div className="v2-hub-node node-canada">
                <span className="v2-hub-flag">🇨🇦</span>
                <strong>Canada</strong>
                <span>Technology Operations</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Category Directory */}
          <div className="v2-reach-right">
            <div className="v2-reach-directory">
              {categories.map((cat, index) => {
                const isActive = activeCategory === index;
                return (
                  <div 
                    className={`v2-directory-card ${isActive ? 'is-active' : ''}`}
                    key={cat.id || index}
                    onMouseEnter={() => setActiveCategory(index)}
                    onClick={() => setActiveCategory(index)}
                  >
                    <div className="v2-directory-card-header">
                      <div className="v2-directory-icon-wrap">
                        <i className={`fas ${cat.icon || 'fa-globe'}`}></i>
                      </div>
                      <div className="v2-directory-info">
                        <h3 className="v2-directory-title">{cat.title}</h3>
                        <span className="v2-directory-count">{cat.countText}</span>
                      </div>
                      <div className="v2-directory-expand-icon">
                        <i className={`fas ${isActive ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                      </div>
                    </div>

                    {/* Expandable Service List */}
                    <div className="v2-directory-card-body">
                      <ul className="v2-directory-services-list">
                        {cat.services?.map((svc, i) => (
                          <li key={i} onClick={(e) => { e.stopPropagation(); window.location.href = '/contact'; }}>
                            <span>{svc}</span>
                            <i className="fas fa-arrow-right-long v2-svc-arrow"></i>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NorthAmericaReachV2;

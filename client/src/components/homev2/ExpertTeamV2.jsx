import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExpertTeamV2.css';

const DEFAULT_CATEGORIES = [
  {
    id: '1',
    title: 'AI Solutions',
    badge: '4 Specialized Services',
    image: '/images/team/ai_solutions.jpg',
    services: [
      'AI Development Company USA',
      'AI Development Company Canada',
      'AI Consulting Company USA',
      'Enterprise AI & Automation'
    ]
  },
  {
    id: '2',
    title: 'Software Engineering',
    badge: '3 Specialized Services',
    image: '/images/team/software_engineering.jpg',
    services: [
      'Software Development USA',
      'Software Development Canada',
      'Custom Enterprise Software'
    ]
  },
  {
    id: '3',
    title: 'Cloud & Transformation',
    badge: '3 Specialized Services',
    image: '/images/team/cloud_transformation.jpg',
    services: [
      'Cloud Consulting Company USA',
      'Digital Transformation Company USA',
      'Hybrid Cloud Architecture'
    ]
  },
  {
    id: '4',
    title: 'Enterprise Services',
    badge: '3 Specialized Services',
    image: '/images/team/enterprise_services.jpg',
    services: [
      'Custom AI Solutions',
      'AI Automation Company',
      'Enterprise System Integration'
    ]
  }
];

const ExpertTeamV2 = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const subtitle = content?.subtitle || 'SPECIALIZED SERVICES';
  const title = content?.title || 'Serving Businesses Across North America';
  const description = content?.description || 'Delivering enterprise software engineering, AI consulting, and digital transformation for market-leading organizations across the United States and Canada.';
  const ctaText = content?.ctaText || 'Connect with Our Regional Teams';
  const ctaLink = content?.ctaLink || '/contact';
  const categories = content?.categories?.length ? content.categories : DEFAULT_CATEGORIES;

  return (
    <section className="expert-team-section" id="technology-experts">
      <div className="expert-team-container">
        {/* Header Architecture: Split Left (Text) and Right (Button) */}
        <div className="expert-team-header v2-reveal-on-scroll v2-reveal-up">
          <div className="expert-team-header-left">
            <span className="expert-team-subtitle">{subtitle}</span>
            <h2 className="expert-team-title">{title}</h2>
            {description && <p className="expert-team-description">{description}</p>}
          </div>
          <div className="expert-team-cta-wrap">
            <Link to={ctaLink} className="expert-team-cta-btn" title={ctaText}>
              <span>{ctaText}</span>
              <span className="expert-cta-arrow"><i className="fas fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>

        {/* Two-Column Interactive Grid */}
        <div className="expert-team-grid">
          {/* Left Column: Dynamic Member/Category Preview Card */}
          <div className="expert-team-preview-col v2-reveal-on-scroll v2-reveal-left">
            <div className="expert-team-card">
              {/* Dynamic Image Swapping Stack */}
              <div className="expert-team-image-wrapper">
                {categories.map((cat, idx) => (
                  <img
                    key={cat.id || idx}
                    src={cat.image}
                    alt={cat.title}
                    className={`expert-team-portrait ${idx === activeIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Specialized Services Category Cards */}
          <div className="expert-team-list-col v2-reveal-on-scroll v2-reveal-right">
            <div className="expert-team-list">
              {categories.map((cat, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={cat.id || index}
                    className={`expert-team-card-row ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    tabIndex={0}
                    role="region"
                    aria-expanded={isActive}
                  >
                    {/* Card Header Row */}
                    <div className="expert-team-card-header">
                      <div className="expert-team-title-wrap">
                        <h3 className="expert-team-card-title">{cat.title}</h3>
                        <span className="expert-team-badge">{cat.badge}</span>
                      </div>
                      <Link
                        to="/contact"
                        className="expert-team-row-action"
                        title={`Contact Us for ${cat.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="expert-team-arrow"><i className="fas fa-arrow-right"></i></span>
                      </Link>
                    </div>

                    {/* Expandable Sub-services Content Panel */}
                    <div className="expert-team-card-content">
                      <div className="expert-team-subservices-grid">
                        {cat.services?.map((service, sIdx) => {
                          const serviceName = typeof service === 'string' ? service : service.name || service.title;
                          const serviceLink = (typeof service === 'object' && service.link) ? service.link : '/contact';
                          return (
                            <Link
                              to={serviceLink}
                              className="expert-subservice-pill"
                              key={sIdx}
                              title={`Contact us for ${serviceName}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="expert-subservice-left">
                                <span className="expert-subservice-dot"></span>
                                <span className="expert-subservice-text">{serviceName}</span>
                              </div>
                              <span className="expert-subservice-arrow"><i className="fas fa-arrow-right"></i></span>
                            </Link>
                          );
                        })}
                      </div>
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

export default ExpertTeamV2;

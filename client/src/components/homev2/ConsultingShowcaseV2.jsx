import React from 'react';
import './ConsultingShowcaseV2.css';

const DEFAULT_CAPABILITIES = [
  {
    id: 'tech-strat',
    icon: 'fa-brain',
    title: 'Technology Strategy',
    description: 'Strategic roadmaps aligned with business growth objectives and ROI.'
  },
  {
    id: 'digital-innov',
    icon: 'fa-lightbulb',
    title: 'Digital Innovation',
    description: 'Emerging tech integration and transformative digital business models.'
  },
  {
    id: 'ent-arch',
    icon: 'fa-sitemap',
    title: 'Enterprise Architecture',
    description: 'Scalable systems design built for complex enterprise ecosystems.'
  },
  {
    id: 'cloud-mod',
    icon: 'fa-cloud-upload-alt',
    title: 'Cloud Modernization',
    description: 'Legacy migration and cloud-native infrastructure optimization.'
  },
  {
    id: 'ai-adopt',
    icon: 'fa-robot',
    title: 'AI Adoption',
    description: 'Enterprise-wide AI strategy, governance, and agentic enablement.'
  },
  {
    id: 'biz-tech',
    icon: 'fa-cogs',
    title: 'Business Technology',
    description: 'End-to-end process optimization and automated digital workflows.'
  },
  {
    id: 'ent-sw',
    icon: 'fa-laptop-code',
    title: 'Enterprise Software',
    description: 'Custom mission-critical platforms and seamless API integrations.'
  },
  {
    id: 'digital-biz',
    icon: 'fa-chart-line',
    title: 'Digital Business Solutions',
    description: 'Data-driven analytics and executive business intelligence systems.'
  }
];

const ConsultingShowcaseV2 = ({ content }) => {
  const badgeText = content?.badge || 'STRATEGIC CONSULTING';
  const headingText = content?.title || 'Business Technology Beyond Software Development';
  const paragraphText = content?.description || 'We are more than a software development firm—Venus Global Technology serves as a trusted technology consulting partner. We bridge the gap between strategic vision and scalable engineering to drive long-term business value.';
  const capabilities = (content?.items && content.items.length > 0 && typeof content.items[0] === 'object') ? content.items : DEFAULT_CAPABILITIES;
  const buttonText = content?.ctaButton || 'Schedule a Strategy Session';

  return (
    <section className="v2-consulting-section" id="business-technology-consulting">
      <div className="v2-consulting-container">
        <div className="v2-consulting-grid">
          
          {/* LEFT SIDE: Heading & Paragraph */}
          <div className="v2-consulting-left">
            <div className="v2-consulting-badge">
              <span className="v2-consulting-badge-dot"></span>
              <span className="v2-consulting-badge-text">{badgeText}</span>
            </div>

            <h2 className="v2-consulting-heading">
              {headingText}
            </h2>

            <p className="v2-consulting-paragraph">
              {paragraphText}
            </p>

            <button 
              className="v2-consulting-btn"
              onClick={() => window.location.href = '/contact'}
            >
              <span>{buttonText}</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {/* RIGHT SIDE: 2x4 Capability Matrix */}
          <div className="v2-consulting-right">
            <div className="v2-capability-matrix">
              {capabilities.map((item, index) => (
                <div 
                  className="v2-capability-tile"
                  key={item.id || index}
                  onClick={() => window.location.href = '/contact'}
                >
                  <div className="v2-capability-icon">
                    <i className={`fas ${item.icon || 'fa-cubes'}`}></i>
                  </div>
                  <h3 className="v2-capability-title">{item.title}</h3>
                  <p className="v2-capability-desc">{item.description}</p>
                  <div className="v2-capability-arrow">
                    <i className="fas fa-arrow-right-long"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultingShowcaseV2;

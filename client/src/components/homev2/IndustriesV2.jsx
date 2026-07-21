import React from 'react';
import './IndustriesV2.css';

const DEFAULT_INDUSTRIES = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Digital healthcare platforms, AI diagnostics, patient engagement, and HIPAA-compliant workflow automation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Smart factories, Industry 4.0, predictive maintenance, and operational intelligence platforms.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'fintech',
    title: 'Financial Services',
    description: 'FinTech platforms, AI-powered risk analysis, automated fraud detection, and regulatory compliance.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'retail',
    title: 'Retail & eCommerce',
    description: 'Personalized shopping experiences, recommendation engines, customer analytics, and retail automation.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Fleet intelligence, warehouse automation, supply chain optimization, and real-time shipment tracking.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Next-gen Learning Management Systems, AI tutoring, virtual classrooms, and EdTech platforms.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'government',
    title: 'Government',
    description: 'Digital public services, citizen engagement portals, and secure enterprise cloud platforms.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: 'energy',
    title: 'Energy & Utilities',
    description: 'IoT monitoring, predictive grid maintenance, sustainability analytics, and smart infrastructure.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  }
];

const IndustriesV2 = ({ content }) => {
  const badgeText = content?.badge || 'INDUSTRIES WE EMPOWER';
  const headingText = content?.title || 'Technology Solutions Built for Every Industry';
  const paragraphText = content?.description || 'Every industry faces distinct digital challenges. Venus Global Technology engineers custom AI, cloud, automation, and software solutions tailored to solve domain-specific problems and accelerate business outcomes.';
  const industries = content?.items || DEFAULT_INDUSTRIES;

  const handleCardClick = (link) => {
    window.location.href = link || '/services';
  };

  return (
    <section className="v2-industries-section" id="industries-we-empower">
      {/* Subtle Ambient Glows */}
      <div className="v2-industries-ambient-glow glow-top"></div>
      <div className="v2-industries-ambient-glow glow-bottom"></div>

      <div className="v2-industries-container">
        
        {/* TOP SECTION: Centered Header (~700px max-width) */}
        <div className="v2-industries-header v2-reveal-on-scroll v2-reveal-up">
          <div className="v2-industries-badge">
            <span className="v2-industries-badge-dot"></span>
            <span className="v2-industries-badge-text">{badgeText}</span>
          </div>

          <h2 className="v2-industries-heading">
            {headingText}
          </h2>

          <p className="v2-industries-paragraph">
            {paragraphText}
          </p>
        </div>

        {/* BOTTOM SECTION: Unsplash Image Cards (Clean, No Colored Borders) */}
        <div className="v2-industries-grid">
          {industries.map((item, index) => {
            const imageUrl = item.image || DEFAULT_INDUSTRIES[index % DEFAULT_INDUSTRIES.length].image;
            return (
              <div 
                className="v2-industry-card v2-reveal-on-scroll v2-reveal-up"
                key={item.id || index}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => handleCardClick(item.link)}
              >
                {/* Background Unsplash Image */}
                <div 
                  className="v2-industry-card-bg"
                  style={{ backgroundImage: `url('${imageUrl}')` }}
                ></div>

                {/* Dark Gradient Overlay for Hover Reveal */}
                <div className="v2-industry-card-overlay"></div>

                {/* Inner Card Content */}
                <div className="v2-industry-card-inner">
                  
                  {/* Card Body */}
                  <div className="v2-industry-card-body">
                    <h3 className="v2-industry-card-title">{item.title}</h3>
                    <p className="v2-industry-card-desc">{item.description}</p>
                  </div>

                  {/* Card Footer: Animated Link */}
                  <div className="v2-industry-card-footer">
                    <span className="v2-industry-link-text">Explore Solution</span>
                    <i className="fas fa-arrow-right-long v2-industry-arrow"></i>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustriesV2;

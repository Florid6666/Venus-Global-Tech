import React from 'react';
import './CtaBannerV2.css';

const CtaBannerV2 = ({ content }) => {
  const badgeText = content?.badge || 'HAVE A PROJECT IN MIND? JUST LET US KNOW!';
  const headingMain = content?.headingMain || 'Ready to Build the Future with';
  const headingHighlight = content?.headingHighlight || 'AI?';
  const paragraphText = content?.description || "Whether you're looking for an AI Development Company, Enterprise AI Solutions, Custom Software Development, or Digital Transformation Services, our experts are ready to help you turn ideas into intelligent digital products.";
  const primaryBtnText = content?.primaryBtnText || 'Connect With Us';
  const secondaryBtnText = content?.secondaryBtnText || "Let's Discuss Your Project";

  return (
    <section className="v2-cta-banner-section" id="bottom-cta-banner">
      <div className="v2-cta-banner-container">
        
        {/* DEEP COSMIC SPACE CONTAINER WITH STARRY GRID */}
        <div className="v2-cta-card v2-reveal-on-scroll v2-reveal-up">
          
          {/* Subtle Animated Star Particles / Dots Background */}
          <div className="v2-cta-stars-bg"></div>
          <div className="v2-cta-ambient-glow glow-blue-1"></div>
          <div className="v2-cta-ambient-glow glow-blue-2"></div>

          {/* INNER CONTENT WRAPPER */}
          <div className="v2-cta-card-content">
            
            {/* Pill Badge */}
            <div className="v2-cta-pill-badge">
              <span className="v2-cta-badge-icon">🚀</span>
              <span className="v2-cta-badge-text">{badgeText}</span>
            </div>

            {/* Large High-Impact Heading */}
            <h2 className="v2-cta-heading">
              {headingMain} <span className="v2-cta-highlight">{headingHighlight}</span>
            </h2>

            {/* Supporting Copy */}
            <p className="v2-cta-paragraph">
              {paragraphText}
            </p>

            {/* Dual CTA Buttons (Primary Brand Blue & Secondary Glass Outline) */}
            <div className="v2-cta-buttons-group">
              <button 
                className="v2-cta-btn-primary"
                onClick={() => window.location.href = '/contact'}
              >
                <span className="v2-btn-sparkle">✨</span>
                <span>{primaryBtnText}</span>
                <i className="fas fa-arrow-right v2-btn-arrow"></i>
              </button>

              <button 
                className="v2-cta-btn-secondary"
                onClick={() => window.location.href = '/contact'}
              >
                <span>{secondaryBtnText}</span>
                <i className="fas fa-comments"></i>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CtaBannerV2;

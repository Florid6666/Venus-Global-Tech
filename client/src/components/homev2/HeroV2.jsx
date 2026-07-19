import React from 'react';
import './HeroV2.css';
import RichText from '../RichText';

const HeroV2 = ({ content, whatsappLink }) => {
  if (!content) return null;

  const handlePrimaryClick = () => {
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
    } else {
      window.open('https://wa.me/16477220837', '_blank');
    }
  };

  const handleSecondaryClick = () => {
    window.location.href = content.secondaryCtaLink || '/contact';
  };

  return (
    <section className="v2-hero-chatbot">
      {/* Ambient Visual Grids & Spotlights */}
      <div className="v2-hero-spotlight spotlight-blue"></div>
      <div className="v2-hero-spotlight spotlight-purple"></div>
      <div className="v2-hero-spotlight spotlight-teal"></div>
      <div className="v2-hero-spotlight spotlight-indigo"></div>
      <div className="v2-hero-grid-overlay"></div>

      <div className="v2-hero-chatbot-container">
        {/* Left Content Side */}
        <div className="v2-hero-chatbot-left">
          <h1 className="v2-hero-chatbot-title">
            <span className="v2-hero-title-main">{content.titleLine1}</span>
            <span className="v2-hero-title-highlight">{content.titleLine2}</span>
          </h1>

          <div className="v2-hero-chatbot-supporting">
            <RichText html={content.description} as="div" />
          </div>

          <div className="v2-hero-chatbot-cta">
            {/* Primary Gradient Pill Button */}
            <button className="v2-hero-btn-pill" onClick={handlePrimaryClick}>
              <span className="v2-hero-btn-text">{content.ctaButton || 'Book a Free AI Strategy Session'}</span>
              <span className="v2-hero-btn-arrow-circle">
                <i className="fas fa-arrow-right"></i>
              </span>
            </button>

            {/* Secondary circular play button */}
            {content.secondaryCtaButton && (
              <button className="v2-hero-btn-play" onClick={handleSecondaryClick}>
                <span className="v2-hero-btn-play-circle">
                  <i className="fas fa-play"></i>
                </span>
                <span className="v2-hero-btn-play-text">{content.secondaryCtaButton}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Visual Side (Bypasses container boundary for full-screen edge breakout) */}
      <div className="v2-hero-chatbot-right">
        <div className="v2-hero-visual-wrapper">
          {/* Floating Particle Globe Wrapper to isolate mix-blend-mode */}
          <div className="v2-hero-globe-wrapper">
            <div className="v2-hero-globe-glow"></div>
            <img 
              src="/images/homev2/globle.webp" 
              alt="Glowing Blue Particle Globe" 
              className="v2-hero-globe-gif" 
            />
          </div>
          {/* Robot Hand Wrapper */}
          <div className="v2-hero-hand-wrapper">
            <div className="v2-hero-hand-glow"></div>
            <img 
              src="/images/homev2/hand-robot-1.webp" 
              alt="3D Robot Hand Model" 
              className="v2-hero-hand-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;

import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './WhyChooseV2.css';

const DEFAULT_BENEFITS = [
  {
    id: 'ai-first',
    icon: 'fa-robot',
    title: 'AI-First Development',
    description: 'Custom machine learning models, generative AI, and intelligent automation engineered to scale enterprise workflows effortlessly.'
  },
  {
    id: 'enterprise-eng',
    icon: 'fa-cubes',
    title: 'Enterprise-Grade Engineering',
    description: 'Robust, high-performance architecture built for mission-critical software, high concurrency, and zero downtime.'
  },
  {
    id: 'cloud-native',
    icon: 'fa-cloud',
    title: 'Cloud-Native Solutions',
    description: 'Scalable multi-cloud infrastructure designed for maximum uptime, seamless migration, and optimized cost efficiency.'
  },
  {
    id: 'agile-delivery',
    icon: 'fa-bolt',
    title: 'Agile Delivery',
    description: 'Accelerated development cycles powered by continuous integration, rapid prototyping, and transparent communication.'
  },
  {
    id: 'security-design',
    icon: 'fa-shield-alt',
    title: 'Security by Design',
    description: 'End-to-end data encryption, strict SOC2 & GDPR compliance standards, and proactive threat protection built in from day one.'
  },
  {
    id: 'longterm-partnership',
    icon: 'fa-handshake',
    title: 'Long-Term Technology Partnership',
    description: 'Dedicated senior engineering leadership, continuous platform optimization, and strategic guidance for sustained ROI.'
  }
];

const WhyChooseV2 = ({ content }) => {
  const [lottieData, setLottieData] = useState(null);
  const [lottieError, setLottieError] = useState(false);

  useEffect(() => {
    // Admin-uploaded Lottie takes priority; falls back to the bundled default.
    const animationPath = content?.lottieJson || '/images/homev2/hovering-laptop-girl.json';
    fetch(encodeURI(animationPath))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLottieData(data);
      })
      .catch((err) => {
        console.error('Error loading Why Choose Lottie animation:', err);
        setLottieError(true);
      });
  }, [content?.lottieJson]);

  const badgeText = content?.badge || 'WHY CHOOSE VENUS GLOBAL TECHNOLOGY';
  const headingText = content?.title || 'Building Intelligent Technology for Modern Businesses';
  const paragraphText = content?.description || 'We partner with ambitious enterprises to engineer high-impact AI solutions, resilient cloud platforms, and modern enterprise software. From digital transformation to business automation, our battle-tested engineering powers sustainable growth and technical excellence.';
  const benefits = content?.benefits || DEFAULT_BENEFITS;
  const primaryCta = content?.primaryCta || 'Schedule a Consultation';
  const secondaryCta = content?.secondaryCta || 'Explore Our Services';
  const primaryCtaLink = content?.primaryCtaLink || '/contact';
  const secondaryCtaLink = content?.secondaryCtaLink || '/services';

  const handlePrimaryClick = () => {
    window.location.href = primaryCtaLink;
  };

  const handleSecondaryClick = () => {
    window.location.href = secondaryCtaLink;
  };

  return (
    <section className="v2-why-choose-section" id="why-choose-us">
      {/* Subtle background ambient light */}
      <div className="v2-why-choose-ambient-glow glow-1"></div>
      <div className="v2-why-choose-ambient-glow glow-2"></div>

      <div className="v2-why-choose-container">
        {/* Modern 2-Column Split Layout */}
        <div className="v2-why-choose-grid">
          
          {/* LEFT COLUMN: Content */}
          <div className="v2-why-choose-left v2-reveal-on-scroll v2-reveal-up">
            
            {/* Premium Section Badge */}
            <div className="v2-why-choose-badge">
              <span className="v2-why-choose-badge-icon">
                <i className="fas fa-star"></i>
              </span>
              <span className="v2-why-choose-badge-text">{badgeText}</span>
            </div>

            {/* Headline */}
            <h2 className="v2-why-choose-heading">
              {headingText}
            </h2>

            {/* Supporting Paragraph */}
            <p className="v2-why-choose-paragraph">
              {paragraphText}
            </p>

            {/* Vertical Benefits List */}
            <div className="v2-why-choose-benefits-list">
              {benefits.map((item, index) => (
                <div 
                  className="v2-why-choose-benefit-item v2-reveal-on-scroll v2-reveal-up" 
                  key={item.id || index}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="v2-why-choose-benefit-icon-wrap">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="v2-why-choose-benefit-content">
                    <h3 className="v2-why-choose-benefit-title">{item.title}</h3>
                    <p className="v2-why-choose-benefit-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call To Action Row */}
            <div className="v2-why-choose-cta-row">
              <button 
                className="v2-why-choose-btn-primary"
                onClick={handlePrimaryClick}
                aria-label={primaryCta}
              >
                <span>{primaryCta}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <a 
                href={secondaryCtaLink}
                className="v2-why-choose-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSecondaryClick();
                }}
              >
                <span>{secondaryCta}</span>
                <i className="fas fa-arrow-right-long v2-why-choose-arrow"></i>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Premium Visual with Lottie Animation */}
          <div className="v2-why-choose-right v2-reveal-on-scroll v2-reveal-right">
            <div className="v2-why-choose-visual-card">
              
              {/* Floating Decorative Badges */}
              <div className="v2-floating-badge badge-top-right">
                <div className="v2-floating-badge-icon icon-ai">
                  <i className="fas fa-microchip"></i>
                </div>
                <div className="v2-floating-badge-text">
                  <strong>AI & Automation</strong>
                  <span>Next-Gen Models</span>
                </div>
              </div>

              <div className="v2-floating-badge badge-bottom-left">
                <div className="v2-floating-badge-icon icon-cloud">
                  <i className="fas fa-cloud-arrow-up"></i>
                </div>
                <div className="v2-floating-badge-text">
                  <strong>Cloud Architecture</strong>
                  <span>99.99% Uptime</span>
                </div>
              </div>

              <div className="v2-floating-badge badge-bottom-right">
                <div className="v2-floating-badge-icon icon-security">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="v2-floating-badge-text">
                  <strong>Enterprise Trust</strong>
                  <span>Bank-Grade Security</span>
                </div>
              </div>

              {/* Lottie Animation Player Container */}
              <div className="v2-lottie-container">
                {lottieData ? (
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className="v2-why-choose-lottie"
                  />
                ) : (
                  <div className="v2-lottie-fallback">
                    <div className="v2-lottie-pulse-ring"></div>
                    <i className="fas fa-laptop-code v2-lottie-fallback-icon"></i>
                  </div>
                )}
              </div>

              {/* Card Accent Lines & Lighting */}
              <div className="v2-visual-card-glow"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseV2;

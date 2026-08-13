import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../components/aboutus.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';

const DEFAULT_STATS = [
  {
    icon: 'fa-folder-open',
    number: '10+',
    description: 'Great Works'
  },
  {
    icon: 'fa-briefcase',
    number: '16+',
    description: 'Years Experience'
  },
  {
    icon: 'fa-trophy',
    number: '2',
    description: 'Award-Winning Work'
  },
  {
    icon: 'fa-users',
    number: '100+',
    description: 'We have happy Clients worldwide'
  }
];

const STAT_BOXES = [
  {
    number: '10+',
    label: 'Great Works',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  },
  {
    number: '16+',
    label: 'Years Experience',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    number: '2',
    label: 'Award-Winning Work',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
      </svg>
    )
  },
  {
    number: '100+',
    label: 'We have happy Clients worldwide',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  }
];

const CountUpNumber = ({ targetString }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const targetValue = parseInt(targetString.replace(/\D/g, ''), 10) || 0;
  const suffix = targetString.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp = null;
    const duration = 1800; // 1.8 seconds smooth count animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out cubic for realistic smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * targetValue);

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasAnimated, targetValue]);

  return (
    <span ref={elementRef} className="count-up-val">
      {count}{suffix}
    </span>
  );
};

const CYCLING_FEATURES = [
  {
    heading: 'Innovate to Lead',
    description: 'Foster creativity and embrace innovation to stay ahead of the competition.',
    image: '/images/about_why_choose_us_bg.png'
  },
  {
    heading: 'Optimize for Growth',
    description: 'Streamline processes and resources to maximize efficiency and profitability.',
    image: '/images/team/cloud_transformation.jpg'
  },
  {
    heading: 'Engage with Purpose',
    description: 'Build meaningful relationships with customers through authentic engagement.',
    image: '/images/about_team_collaboration.png'
  },
  {
    heading: 'Scale with Strategy',
    description: 'Expand your business by implementing structured, scalable plans.',
    image: '/images/team/enterprise_services.jpg'
  }
];

const About = () => {
  const { content: about, loading: aboutLoading } = useContent('about');
  const { content: home, loading: homeLoading } = useContent('home');
  const { content: footer } = useContent('footer');

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % CYCLING_FEATURES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  if (aboutLoading || homeLoading) {
    return <div className="about-page"><div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div></div>;
  }

  const aboutContent = about || {};
  const homeContent = home || {};
  const statsList = (aboutContent.stats && aboutContent.stats.length > 0) ? aboutContent.stats : DEFAULT_STATS;
  const activeFeature = CYCLING_FEATURES[activeFeatureIdx];

  return (
    <div className="about-page">
      {/* REDESIGNED ABOUT HERO SECTION (MATCHING REFERENCE IMAGE) */}
      <section className="about-hero-section" style={{ backgroundImage: "url('/images/team/software_engineering.jpg')" }}>
        <div className="about-hero-bg-overlay"></div>
        
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">About</h1>
            
            <div className="about-hero-breadcrumb">
              <Link to="/" className="breadcrumb-item breadcrumb-link">Home</Link>
              <span className="breadcrumb-arrow">→</span>
              <span className="breadcrumb-item breadcrumb-current">About</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT COMPANY / YOUR PARTNER FOR SOFTWARE INNOVATION SECTION */}
      <section className="about-partner-section">
        <div className="about-partner-container">
          <div className="about-partner-grid">
            
            {/* LEFT COLUMN: OVERLAPPING DUAL IMAGE COMPOSITION */}
            <div className="about-partner-left">
              <div className="about-image-composition">
                
                {/* Dot Pattern Accent */}
                <div className="about-dots-pattern"></div>
                
                {/* Blue Vertical Bar Accent */}
                <div className="about-blue-bar"></div>

                {/* Primary Top Main Image */}
                <div className="about-img-primary-wrap">
                  <img 
                    src="/images/about_corporate_leader.png" 
                    alt="Corporate Technology Executive" 
                    className="about-img-primary" 
                  />
                </div>

                {/* Secondary Overlapping Front Image */}
                <div className="about-img-secondary-wrap">
                  <img 
                    src="/images/about_team_collaboration.png" 
                    alt="Engineering Team Workspace" 
                    className="about-img-secondary" 
                  />
                </div>

                {/* Floating Blue Badge */}
                <div className="about-badge-card">
                  <div className="about-badge-rocket">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <span className="about-badge-text">The Best IT Service Provider</span>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: TEXT CONTENT & FEATURE LIST */}
            <div className="about-partner-right">
              {/* Eyebrow Header */}
              <div className="about-eyebrow-wrap">
                <span className="about-eyebrow-line"></span>
                <span className="about-eyebrow-text">ABOUT COMPANY</span>
              </div>

              <h2 className="about-partner-title">
                Your partner for software innovation
              </h2>

              <p className="about-partner-desc">
                Venus Global Technology is the partner of choice for many of the world's leading enterprises, SMEs and technology challengers. We help businesses elevate their value through custom software development, product design, QA and consultancy services.
              </p>

              {/* Feature List (2 Rows) */}
              <div className="about-features-list">
                {/* Feature Item 1 */}
                <div className="about-feature-row">
                  <div className="about-feature-icon-box">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">End to End Development</h3>
                    <p className="about-feature-desc">
                      Knowledge of technologies rules better than anyone which we apply in our daily work to deliver high-performance enterprise systems.
                    </p>
                  </div>
                </div>

                {/* Feature Item 2 */}
                <div className="about-feature-row">
                  <div className="about-feature-icon-box">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="about-feature-content">
                    <h3 className="about-feature-title">Software IT Outsource</h3>
                    <p className="about-feature-desc">
                      Dedicated engineering pods and strategic technology consulting tailored to accelerate digital transformation for modern market leaders.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / WE ARE INCREASING BUSINESS SUCCESS SECTION */}
      <section className="about-why-choose-section">
        <div className="about-why-choose-container">
          <div className="about-why-choose-grid">
            
            {/* LEFT COLUMN: TEXT CONTENT & 2x2 STAT NUMBER BOXES GRID */}
            <div className="about-why-choose-left">
              {/* Eyebrow Header */}
              <div className="about-eyebrow-wrap">
                <span className="about-eyebrow-line"></span>
                <span className="about-eyebrow-text">WHY CHOOSE US</span>
              </div>

              <h2 className="about-why-choose-title">
                Your Success, Our Priority.
              </h2>

              <p className="about-why-choose-desc">
                We're dedicated to helping you achieve your goals with a simple, user-friendly experience. We believe our commitment to your success sets us apart.
              </p>

              {/* 2x2 Stat Number Boxes Grid with CountUp Animation */}
              <div className="about-why-stat-boxes-grid">
                {STAT_BOXES.map((box, index) => (
                  <div key={index} className="about-stat-box-card">
                    <div className="about-stat-box-header">
                      <div className="about-stat-box-icon">
                        {box.iconSvg}
                      </div>
                      <h3 className="about-stat-box-number">
                        <CountUpNumber targetString={box.number} />
                      </h3>
                    </div>
                    <div className="about-stat-box-divider"></div>
                    <p className="about-stat-box-label">{box.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: FEATURE IMAGE WITH FLOATING DUAL CARD (PREMIUM SLIDE & OVERLAY) */}
            <div className="about-why-choose-right">
              <div className="about-why-image-wrap">
                {/* Cinematic Ambient Vignette Overlay */}
                <div className="about-why-image-vignette"></div>

                {CYCLING_FEATURES.map((item, idx) => {
                  const isCurrent = idx === activeFeatureIdx;
                  const isPrev = idx === (activeFeatureIdx - 1 + CYCLING_FEATURES.length) % CYCLING_FEATURES.length;
                  return (
                    <img 
                      key={idx}
                      src={item.image} 
                      alt={item.heading} 
                      className={`about-why-img ${isCurrent ? 'active' : isPrev ? 'prev' : ''}`} 
                    />
                  );
                })}

                {/* Floating Dual Overlay Card */}
                <div className="about-why-floating-card">

                  {/* Top Black/Dark Block: Content / Description */}
                  <div className="about-why-card-dark">
                    <h3 key={`desc-${activeFeatureIdx}`} className="about-why-card-dark-title v2-slide-up-text">
                      {activeFeature.description}
                    </h3>
                  </div>
                  {/* Bottom Blue Block: Heading Text */}
                  <div className="about-why-card-blue">
                    <span key={`head-${activeFeatureIdx}`} className="about-why-card-blue-text v2-slide-up-text-delayed">
                      {activeFeature.heading}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>









      {/* Global Offices */}
      <UpfooterOfficesV2 offices={homeContent.offices} />

      <FooterV2 />
    </div>
  );
};

export default About;

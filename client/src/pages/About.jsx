import React from 'react';
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

const About = () => {
  const { content: about, loading: aboutLoading } = useContent('about');
  const { content: home, loading: homeLoading } = useContent('home');
  const { content: footer } = useContent('footer');

  if (aboutLoading || homeLoading) {
    return <div className="about-page"><div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div></div>;
  }

  const aboutContent = about || {};
  const homeContent = home || {};
  const statsList = (aboutContent.stats && aboutContent.stats.length > 0) ? aboutContent.stats : DEFAULT_STATS;

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
                    src="/images/team/michael.jpg" 
                    alt="Software Engineer Coding" 
                    className="about-img-primary" 
                  />
                </div>

                {/* Secondary Overlapping Front Image */}
                <div className="about-img-secondary-wrap">
                  <img 
                    src="/images/team/cloud_transformation.jpg" 
                    alt="Engineering Team Collaboration" 
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

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {statsList.map((stat, idx) => {
              const iconVal = stat.icon || DEFAULT_STATS[idx % DEFAULT_STATS.length].icon;
              return (
                <div className="stat-card" key={idx}>
                  <div className="stat-card-header">
                    {typeof iconVal === 'string' && (iconVal.startsWith('http') || iconVal.startsWith('/') || iconVal.includes('.png') || iconVal.includes('.svg')) ? (
                      <img src={iconVal} alt="" className="stat-icon" />
                    ) : (
                      <div className="stat-icon-wrap">
                        <i className={`far ${iconVal} stat-fa-icon`}></i>
                      </div>
                    )}
                    <div className="stat-number">{stat.number}</div>
                  </div>
                  <div className="stat-divider"></div>
                  <p className="stat-description">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content-section">
        <div className="about-content-container">
          <div className="about-content-grid">
            <div className="about-content-image">
              <div className="about-image-wrapper">
                <img src={aboutContent.content?.image || '/images/team/software_engineering.jpg'} alt="About Us Team" className="about-content-img" />
              </div>
            </div>

            <div className="about-content-text">
              <div className="about-content-badge">
                <i className="fas fa-cube"></i>
                <RichText html={aboutContent.content?.badge} as="span" />
              </div>

              <h2 className="about-content-title">{aboutContent.content?.title}</h2>

              <RichText html={aboutContent.content?.description} as="p" className="about-content-description" />

              <div className="features-grid">
                {aboutContent.content?.features?.map((feature) => (
                  <div className="feature-item" key={feature.title}>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>

              <button
                className="about-content-button"
                onClick={() => {
                  const subject = encodeURIComponent('Project Inquiry - Start New Project');
                  const body = encodeURIComponent('Hello,\n\nI am interested in starting a new project with Venus Global Technology. Please provide me with more information about your services and how we can work together.\n\nThank you!');
                  window.location.href = `mailto:${footer?.contact?.email || 'contact@venustech.com'}?subject=${subject}&body=${body}`;
                }}
              >
                {aboutContent.content?.startProjectsButton || 'Start Project'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="trusted-partners">
        <div className="partners-container">
          <div className="partners-divider">
            <div className="partners-line"></div>
            <div className="partners-badge">
              <RichText html={homeContent.trustedPartners?.badge} as="span" />
            </div>
            <div className="partners-line"></div>
          </div>
          <div className="sponsors-ticker-wrapper">
            <div className="sponsors-ticker">
              <div className="ticker">
                {[0, 1, 2].map((wrapperIndex) => (
                  <div className="inner-ticker-wrapper" key={wrapperIndex}>
                    {homeContent.trustedPartners?.companies?.map((company) => (
                      <React.Fragment key={company}>
                        <div className="ticker-circle"></div>
                        <div className="company-logo">{company}</div>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-container">
          <div className="services-header">
            <div className="services-badge">
              <i className="fas fa-cube"></i>
              <RichText html={homeContent.services?.badge} as="span" />
            </div>
            <h2 className="services-title">{homeContent.services?.title}</h2>
            <p className="services-description">
              {homeContent.services?.description}
            </p>
          </div>

          <div className="services-content">
            <div className="services-list">
              {homeContent.services?.items?.map((item) => (
                <div className="service-item" data-service={item.link?.replace('/', '')} key={item.number}>
                  <div className="service-number">{item.number}</div>
                  <div className="service-details">
                    <h3 className="service-title">{item.title}</h3>
                    <p className="service-description">
                      {item.description}
                    </p>
                  </div>
                  <button className="service-arrow" onClick={() => window.location.href = item.link}>
                    <span className="arrow-icon">↗</span>
                  </button>
                  <div className="service-hover-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div
            className="cta-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${homeContent.cta?.backgroundImage}')`
            }}
          >
            <p className="cta-prompt">{homeContent.cta?.prompt}</p>
            <h2 className="cta-title">{homeContent.cta?.title}</h2>
            <button className="cta-button" onClick={() => window.open(homeContent.cta?.whatsappLink, '_blank')}>{homeContent.cta?.button}</button>
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

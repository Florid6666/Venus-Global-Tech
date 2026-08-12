import React from 'react';
import { Link } from 'react-router-dom';
import '../components/aboutus.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';

const About = () => {
  const { content: about, loading: aboutLoading } = useContent('about');
  const { content: home, loading: homeLoading } = useContent('home');
  const { content: footer } = useContent('footer');

  if (aboutLoading || homeLoading) {
    return <div className="about-page"><div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div></div>;
  }

  const aboutContent = about || {};
  const homeContent = home || {};

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

        {/* Bottom Left Brand Pill Badge (as seen in reference image) */}
        <div className="about-hero-badge">
          <div className="about-badge-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="12" fill="url(#aboutBrandGrad)"/>
              <path d="M10 14L13 17L19 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="aboutBrandGrad" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0052FF"/>
                  <stop offset="0.5" stopColor="#E11D48"/>
                  <stop offset="1" stopColor="#F59E0B"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {aboutContent.stats?.map((stat) => (
              <div className="stat-card" key={stat.number}>
                <div className="stat-card-header">
                  <img src={stat.icon} alt="" className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                </div>
                <div className="stat-divider"></div>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
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

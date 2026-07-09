import React, { useEffect, useRef } from 'react';
import '../components/home.css';
import Footer from '../components/Footer';
import AnimatedHero from '../components/AnimatedHero';
import GlobalOffices from '../components/GlobalOffices';
import { useContent } from '../hooks/useContent';

const Home = () => {
  const { content, loading } = useContent('home');
  const cardsRef = useRef([]);

  useEffect(() => {
    // Wait for content to load and DOM to be ready
    if (loading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, observerOptions);

    // Function to setup observer and check initial visibility
    const setupObserver = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.observe(card);
          // Check if card is already in viewport and add animate class immediately
          const rect = card.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
          if (isInViewport) {
            // Use requestAnimationFrame to ensure DOM is fully rendered
            requestAnimationFrame(() => {
              card.classList.add('animate');
            });
          }
        }
      });
    };

    // Function to force animate cards that are in viewport
    const forceAnimateVisibleCards = () => {
      cardsRef.current.forEach((card) => {
        if (card && !card.classList.contains('animate')) {
          const rect = card.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
          if (isInViewport) {
            card.classList.add('animate');
          }
        }
      });
    };

    // Use multiple strategies to ensure cards are observed
    // 1. Immediate check with requestAnimationFrame
    requestAnimationFrame(() => {
      setupObserver();
      forceAnimateVisibleCards();
    });

    // 2. Check after DOM is fully ready
    if (document.readyState === 'complete') {
      setupObserver();
      forceAnimateVisibleCards();
    } else {
      window.addEventListener('load', () => {
        setupObserver();
        forceAnimateVisibleCards();
      });
    }

    // 3. Also check after a short delay to catch any late-loading content
    const timeoutId = setTimeout(() => {
      setupObserver();
      forceAnimateVisibleCards();
    }, 300);

    // 4. Check after images load
    const images = document.querySelectorAll('.about-us-card img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              setupObserver();
              forceAnimateVisibleCards();
            }
          });
          img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              setupObserver();
              forceAnimateVisibleCards();
            }
          });
        }
      });

      if (loadedImages === totalImages) {
        setupObserver();
        forceAnimateVisibleCards();
      }
    }

    return () => {
      clearTimeout(timeoutId);
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [loading, content]);

  // Handle service image switching
  const handleServiceHover = (serviceType) => {
    const allImages = document.querySelectorAll('.service-image');
    allImages.forEach(img => {
      img.classList.remove('active');
      if (img.dataset.service === serviceType) {
        img.classList.add('active');
      }
    });
  };

  const handleServiceLeave = () => {
    const allImages = document.querySelectorAll('.service-image');
    allImages.forEach(img => {
      img.classList.remove('active');
    });
    // Set first image as default
    const firstImage = document.querySelector('.service-image[data-service="software-data-ai"]');
    if (firstImage) {
      firstImage.classList.add('active');
    }
  };

  if (loading) {
    return <div className="home"><div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div></div>;
  }

  const homeContent = content || {};

  return (
    <div className="home">
      {/* Animated Hero Section */}
      <AnimatedHero content={homeContent.hero} />

      {/* Trusted Partners Section */}
      <section className="trusted-partners">
        <div className="partners-container">
          <div className="partners-header">
            <div className="partners-badge">
              <span>{homeContent.trustedPartners?.badge}</span>
            </div>
          </div>
          <div className="sponsors-ticker-wrapper">
            <div className="sponsors-ticker">
              <div className="ticker">
                {[0, 1, 2, 3].map((wrapperIndex) => (
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

      {/* About Us Section */}
      <section className="about-us">
        <div className="about-container">
          <div className="about-header">
            <div className="about-badge">
              <i className="fas fa-cube"></i>
              <span>{homeContent.about?.badge}</span>
            </div>
            <h2 className="about-title">{homeContent.about?.title}</h2>
            <p className="about-description">
              {homeContent.about?.description}
            </p>
          </div>

          <div className="about-content">
            <div className="about-image">
              <img src={homeContent.about?.image} alt="About Us Team" className="about-img" />
            </div>

            <div className="about-stats">
              <div className="about-us-top-grid">
                {homeContent.about?.stats?.map((stat, index) => (
                  <div
                    key={stat.number + index}
                    className={`about-us-card _0${index + 1}`}
                    ref={(el) => (cardsRef.current[index] = el)}
                  >
                    <div className="about-us-card-icon-wrap">
                      <img src={stat.icon} alt="" className="about-us-card-icon" />
                    </div>
                    <div className="about-us-card-typography">
                      <div className="about-us-card-counter-wrap">
                        <h3 className="stat-number">{stat.number}</h3>
                      </div>
                      <p className="about-us-card-description">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <button className="about-button" onClick={() => window.location.href = '/about'}>{homeContent.about?.moreAboutButton}</button>
                <div className="about-contact">
                  <i className="fas fa-phone"></i>
                  <span>{homeContent.about?.getQuoteText}</span>
                  <span className="contact-number" onClick={() => window.open(homeContent.about?.whatsappLink, '_blank')} style={{cursor: 'pointer'}}>{homeContent.about?.phoneNumber}</span>
                </div>
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
                  <span>{homeContent.services?.badge}</span>
                </div>
                <h2 className="services-title">{homeContent.services?.title}</h2>
                <p className="services-description">
                  {homeContent.services?.description}
                </p>
              </div>

              <div className="services-content">
                <div className="services-grid">
                  {homeContent.services?.items?.map((item) => (
                    <div
                      key={item.number}
                      className="service-card"
                      onClick={() => window.location.href = item.link}
                      style={{cursor: 'pointer'}}
                    >
                      <div className="service-card-image">
                        <img src={item.image} alt={item.title} />
                        <div className="service-card-overlay"></div>
                      </div>
                      <div className="service-card-content">
                        <div className="service-card-number">{item.number}</div>
                        <h3 className="service-card-title">{item.title}</h3>
                        <div className="service-card-hover">
                          <p className="service-card-description">
                            {item.description}
                          </p>
                          <div className="service-card-arrow">
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Working Process Section - Desktop Only */}
          <section className="working-process desktop-only">
            <div className="working-process-container">
              <div className="working-process-content">
                <div className="working-process-badge">
                  <i className="fas fa-cube"></i>
                  <span>{homeContent.workingProcess?.badge}</span>
                </div>
                <h2 className="working-process-title">
                  {homeContent.workingProcess?.title}
                </h2>
                <div className="working-process-cta">
                  <button className="working-process-button" onClick={() => window.location.href = '/contact'}>{homeContent.workingProcess?.startProjectsButton}</button>
                </div>
              </div>

              <div className="working-process-cards">
                {homeContent.workingProcess?.steps?.map((step, index) => (
                  <div
                    key={step.number}
                    className="process-card"
                    ref={(el) => (cardsRef.current[4 + index] = el)}
                  >
                    <div className="process-card-number">{step.number}</div>
                    <img src={step.icon} alt="" className="process-card-icon" />
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-description">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Working Process Section - Mobile/Tablet Only */}
          <section className="working-process-mobile">
            <div className="working-process-mobile-container">
              <div className="working-process-mobile-content">
                <div className="working-process-badge">
                  <i className="fas fa-cube"></i>
                  <span>{homeContent.workingProcess?.badge}</span>
                </div>
                <h2 className="working-process-title">
                  {homeContent.workingProcess?.title}
                </h2>
                <div className="working-process-cta">
                  <button className="working-process-button" onClick={() => window.location.href = '/contact'}>{homeContent.workingProcess?.startProjectsButton}</button>
                </div>
              </div>

              <div className="working-process-mobile-cards">
                {homeContent.workingProcess?.steps?.map((step) => (
                  <div className="process-card" key={step.number}>
                    <div className="process-card-number">{step.number}</div>
                    <img src={step.icon} alt="" className="process-card-icon" />
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-description">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Carousel Section */}
          <section className="skills-carousel">
            <div className="skills-carousel-container">
              <div className="skills-track">
                {/* Rendered twice back-to-back so the CSS marquee loop is seamless */}
                {[0, 1].map((setIndex) => (
                  homeContent.skills?.map((skill) => (
                    <div className="skill-item" key={`${setIndex}-${skill}`}>
                      <div className="skill-arrow">↗</div>
                      <div className="skill-star">✦</div>
                      <div className="skill-tag">{skill}</div>
                    </div>
                  ))
                ))}
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

          {/* Office Locations */}
          <GlobalOffices offices={homeContent.offices} />

          {/* Footer Component */}
          <Footer />
        </div>
      );
    };

    export default Home;

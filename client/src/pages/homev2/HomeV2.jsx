import React, { useEffect, useRef, useState } from 'react';
import '../../components/homev2.css';
import Footer from '../../components/Footer';
import GlobalOffices from '../../components/GlobalOffices';
import { useContent } from '../../hooks/useContent';
import RichText from '../../components/RichText';
import { stripHtml } from '../../utils/stripHtml';
import HeroV2 from '../../components/homev2/HeroV2';
import BentoServices from '../../components/homev2/BentoServices';

// Reusable Section Header for the V2 design system
const SectionHeader = ({ badge, title, description }) => (
  <div className="v2-section-header v2-reveal-on-scroll v2-reveal-up">
    {badge && (
      <div className="v2-section-badge">
        <i className="fas fa-cube"></i>
        <RichText html={badge} as="span" />
      </div>
    )}
    {title && <RichText html={title} as="h2" className="v2-section-title" />}
    {description && <RichText html={description} as="p" className="v2-section-description" />}
  </div>
);

// Reusable Checkmark Checklist Grid
const ChecklistGrid = ({ items }) => (
  <div className="v2-checklist-grid">
    {items?.map((item, i) => (
      <div className="v2-checklist-item v2-reveal-on-scroll v2-reveal-up" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
        <div className="v2-checklist-icon">
          <i className="fas fa-check"></i>
        </div>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

// Reusable Card Grid (for Core Services and Industries)
const FeatureGrid = ({ items }) => (
  <div className="v2-feature-grid">
    {items?.map((item, i) => (
      <div className="v2-feature-card v2-reveal-on-scroll v2-reveal-up" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
        <div className="v2-feature-card-icon">
          <i className={`fas ${item.icon}`}></i>
        </div>
        <RichText html={item.title} as="h3" className="v2-feature-card-title" />
        <RichText html={item.description} as="p" className="v2-feature-card-description" />
      </div>
    ))}
  </div>
);

// Reusable Tag/Pill Grid (for AI Expertise and Technologies)
const TagGrid = ({ items }) => (
  <div className="v2-tag-grid">
    {items?.map((item, i) => (
      <span className="v2-tag-pill v2-reveal-on-scroll v2-reveal-scale" key={i} style={{ transitionDelay: `${i * 50}ms` }}>
        <span className="v2-tag-dot"></span>
        {item}
      </span>
    ))}
  </div>
);

const HomeV2 = () => {
  const { content, loading } = useContent('home');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (loading || !content) return;

    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v2-reveal-active');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, observerOptions);

    const setupObserver = () => {
      const revealElements = document.querySelectorAll('.v2-reveal-on-scroll');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Tiny delay to ensure React DOM is fully painted
    const timer = setTimeout(() => {
      setupObserver();
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [loading, content]);

  if (loading) {
    return (
      <div className="v2-loading-screen">
        <div className="v2-spinner"></div>
        <p>Loading Venus Global Technology V2...</p>
      </div>
    );
  }

  const homeContent = content || {};
  const heroContent = homeContent.hero || {};

  return (
    <div className="v2-home-page">
      {/* 1. HERO SECTION (REDESIGNED CHATBOT HAND & GLOBE STYLE) */}
      <HeroV2 content={heroContent} whatsappLink={homeContent.cta?.whatsappLink} />

      {/* BENTO SERVICES CARD GRID */}
      <BentoServices />


      {/* ABOUT US STATS SECTION */}
      {homeContent.about && (
        <section className="v2-about-stats-section">
          <div className="v2-section-container">
            <div className="v2-about-split">
              <div className="v2-about-left v2-reveal-on-scroll v2-reveal-right">
                <div className="v2-section-badge">
                  <i className="fas fa-cube"></i>
                  <RichText html={homeContent.about.badge} as="span" />
                </div>
                <h2 className="v2-about-title">{homeContent.about.title}</h2>
                <p className="v2-about-description">{homeContent.about.description}</p>
                <div className="v2-about-cta">
                  <button className="v2-btn v2-btn-secondary" onClick={() => window.location.href = '/about'}>
                    {homeContent.about.moreAboutButton || 'More About Us'}
                  </button>
                  <div className="v2-about-phone">
                    <i className="fas fa-phone-volume"></i>
                    <div>
                      <span>{homeContent.about.getQuoteText}</span>
                      <strong onClick={() => window.open(homeContent.about.whatsappLink, '_blank')}>
                        {homeContent.about.phoneNumber}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="v2-about-right">
                <div className="v2-stats-grid">
                  {homeContent.about.stats?.map((stat, i) => (
                    <div 
                      className="v2-stat-card v2-reveal-on-scroll v2-reveal-scale" 
                      key={i}
                      style={{ transitionDelay: `${i * 120}ms` }}
                    >
                      <div className="v2-stat-icon-wrap">
                        <img src={stat.icon} alt="" className="v2-stat-icon" />
                      </div>
                      <h3 className="v2-stat-number">{stat.number}</h3>
                      <p className="v2-stat-desc">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. HELPING BUSINESSES SECTION */}
      {homeContent.whyWeHelp && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.whyWeHelp.badge}
              title={homeContent.whyWeHelp.title}
              description={homeContent.whyWeHelp.description}
            />
            {homeContent.whyWeHelp.itemsTitle && (
              <h3 className="v2-grid-subtitle">{homeContent.whyWeHelp.itemsTitle}</h3>
            )}
            <ChecklistGrid items={homeContent.whyWeHelp.items} />
          </div>
        </section>
      )}

      {/* 3. CORE TECHNOLOGY SERVICES */}
      {homeContent.coreServices && (
        <section className="v2-section-light">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.coreServices.badge}
              title={homeContent.coreServices.title}
            />
            <FeatureGrid items={homeContent.coreServices.items} />
          </div>
        </section>
      )}

      {/* SERVICES CARD GRID */}
      {homeContent.services && (
        <section className="v2-services-section">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.services.badge}
              title={homeContent.services.title}
              description={homeContent.services.description}
            />
            <div className="v2-services-card-grid">
              {homeContent.services.items?.map((item, index) => (
                <div 
                  className="v2-service-card v2-reveal-on-scroll v2-reveal-up" 
                  key={item.number}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  onClick={() => window.location.href = item.link}
                >
                  <div className="v2-service-card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="v2-service-card-overlay"></div>
                  </div>
                  <div className="v2-service-card-content">
                    <span className="v2-service-card-num">{item.number}</span>
                    <h3 className="v2-service-card-title">{item.title}</h3>
                    <p className="v2-service-card-desc">{item.description}</p>
                    <div className="v2-service-card-link">
                      <span>Explore Service</span>
                      <i className="fas fa-arrow-right-long"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. WHY CHOOSE US SECTION */}
      {homeContent.whyChooseUs && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.whyChooseUs.badge}
              title={homeContent.whyChooseUs.title}
              description={homeContent.whyChooseUs.description}
            />
            {homeContent.whyChooseUs.itemsTitle && (
              <h3 className="v2-grid-subtitle">{homeContent.whyChooseUs.itemsTitle}</h3>
            )}
            <ChecklistGrid items={homeContent.whyChooseUs.items} />
          </div>
        </section>
      )}

      {/* 5. AI EXPERTISE SECTION */}
      {homeContent.aiExpertise && (
        <section className="v2-section-light">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.aiExpertise.badge}
              title={homeContent.aiExpertise.title}
              description={homeContent.aiExpertise.description}
            />
            <TagGrid items={homeContent.aiExpertise.items} />
          </div>
        </section>
      )}

      {/* 6. INDUSTRIES WE EMPOWER */}
      {homeContent.industries && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.industries.badge}
              title={homeContent.industries.title}
              description={homeContent.industries.description}
            />
            <FeatureGrid items={homeContent.industries.items} />
          </div>
        </section>
      )}

      {/* 7. TECHNOLOGIES WE WORK WITH */}
      {homeContent.technologies && (
        <section className="v2-section-light">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.technologies.badge}
              title={homeContent.technologies.title}
            />
            <TagGrid items={homeContent.technologies.items} />
          </div>
        </section>
      )}

      {/* 8. WORKING PROCESS SECTION */}
      {homeContent.workingProcess && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.workingProcess.badge}
              title={homeContent.workingProcess.title}
              description={homeContent.workingProcess.description}
            />
            
            <div className="v2-process-timeline">
              {homeContent.workingProcess.steps?.map((step, index) => (
                <div 
                  className="v2-process-step v2-reveal-on-scroll v2-reveal-up" 
                  key={step.number}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="v2-process-step-header">
                    <span className="v2-process-num">{step.number}</span>
                    <div className="v2-process-icon-wrap">
                      <img src={step.icon} alt="" className="v2-process-icon" />
                    </div>
                  </div>
                  <h3 className="v2-process-step-title">{step.title}</h3>
                  <p className="v2-process-step-desc">{step.description}</p>
                  {index < homeContent.workingProcess.steps.length - 1 && (
                    <div className="v2-process-arrow">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="v2-process-cta-wrap">
              <button className="v2-btn v2-btn-primary" onClick={() => window.location.href = '/contact'}>
                {homeContent.workingProcess.startProjectsButton || 'Start Project'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 9. BUSINESS CONSULTING SECTION */}
      {homeContent.consultingExpertise && (
        <section className="v2-section-light">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.consultingExpertise.badge}
              title={homeContent.consultingExpertise.title}
              description={homeContent.consultingExpertise.description}
            />
            {homeContent.consultingExpertise.itemsTitle && (
              <h3 className="v2-grid-subtitle">{homeContent.consultingExpertise.itemsTitle}</h3>
            )}
            <ChecklistGrid items={homeContent.consultingExpertise.items} />
          </div>
        </section>
      )}

      {/* 10. ESG & COMPLIANCE */}
      {homeContent.esgCompliance && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.esgCompliance.badge}
              title={homeContent.esgCompliance.title}
              description={homeContent.esgCompliance.description}
            />
            {homeContent.esgCompliance.itemsTitle && (
              <h3 className="v2-grid-subtitle">{homeContent.esgCompliance.itemsTitle}</h3>
            )}
            <ChecklistGrid items={homeContent.esgCompliance.items} />
            
            {homeContent.esgCompliance.link && (
              <div className="v2-esg-cta-wrap">
                <a className="v2-cta-link" href={homeContent.esgCompliance.link}>
                  {homeContent.esgCompliance.linkText || 'Explore ESG Solutions'}
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 11. SERVING REGION */}
      {homeContent.servingRegion && (
        <section className="v2-section-light">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.servingRegion.badge}
              title={homeContent.servingRegion.title}
              description={homeContent.servingRegion.description}
            />
            <ChecklistGrid items={homeContent.servingRegion.items} />
          </div>
        </section>
      )}

      {/* SKILLS CAROUSEL MARQUEE */}
      {homeContent.skills && (
        <section className="v2-skills-marquee-section">
          <div className="v2-skills-track">
            {[0, 1, 2].map((setIndex) => (
              <div className="v2-skills-track-inner" key={setIndex}>
                {homeContent.skills.map((skill, index) => (
                  <div className="v2-skill-badge" key={`${setIndex}-${index}`}>
                    <span className="v2-skill-arrow">↗</span>
                    <span className="v2-skill-star">✦</span>
                    <span className="v2-skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION */}
      {homeContent.cta && (
        <section className="v2-cta-section">
          <div className="v2-section-container">
            <div 
              className="v2-cta-card v2-reveal-on-scroll v2-reveal-scale"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${homeContent.cta.backgroundImage}')`
              }}
            >
              <span className="v2-cta-badge">{homeContent.cta.prompt}</span>
              <h2 className="v2-cta-title">{homeContent.cta.title}</h2>
              <p className="v2-cta-desc">{homeContent.cta.description}</p>
              <div className="v2-cta-buttons">
                <button 
                  className="v2-btn v2-btn-primary" 
                  onClick={() => window.open(homeContent.cta.whatsappLink, '_blank')}
                >
                  {stripHtml(homeContent.cta.button)}
                </button>
                {homeContent.cta.secondaryButton && (
                  <button 
                    className="v2-btn v2-btn-secondary" 
                    onClick={() => window.location.href = homeContent.cta.secondaryLink || '/contact'}
                  >
                    {stripHtml(homeContent.cta.secondaryButton)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OFFICE LOCATIONS */}
      {homeContent.offices && (
        <GlobalOffices offices={homeContent.offices} />
      )}

      {/* 12. FAQ ACCORDION */}
      {homeContent.homeFaq && (
        <section className="v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.homeFaq.badge}
              title={homeContent.homeFaq.title}
            />
            <div className="v2-faq-list">
              {homeContent.homeFaq.items?.map((item, index) => (
                <div 
                  className={`v2-faq-item ${openFaqIndex === index ? 'active' : ''}`}
                  key={index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <div className="v2-faq-question">
                    <h3>{item.question}</h3>
                    <div className="v2-faq-toggle">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                  <div className="v2-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default HomeV2;

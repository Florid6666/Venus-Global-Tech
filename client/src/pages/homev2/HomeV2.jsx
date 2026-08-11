import React, { useEffect, useRef, useState } from 'react';
import '../../components/homev2.css';
import Footer from '../../components/Footer';
import GlobalOffices from '../../components/GlobalOffices';
import { useContent } from '../../hooks/useContent';
import RichText from '../../components/RichText';
import { stripHtml } from '../../utils/stripHtml';
import HeroV2 from '../../components/homev2/HeroV2';
import BentoServices from '../../components/homev2/BentoServices';
import ErpShowcaseV2 from '../../components/homev2/ErpShowcaseV2';
import WhyChooseV2 from '../../components/homev2/WhyChooseV2';
import AiProjectsPortfolioV2 from '../../components/homev2/AiProjectsPortfolioV2';
import RecentAchievementsV2 from '../../components/homev2/RecentAchievementsV2';
import IndustriesV2 from '../../components/homev2/IndustriesV2';
import TechStackOrbitV2 from '../../components/homev2/TechStackOrbitV2';
import IntegrationsBannerV2 from '../../components/homev2/IntegrationsBannerV2';
import ConsultingShowcaseV2 from '../../components/homev2/ConsultingShowcaseV2';
import EsgComplianceV2 from '../../components/homev2/EsgComplianceV2';
import NorthAmericaReachV2 from '../../components/homev2/NorthAmericaReachV2';
import FaqV2 from '../../components/homev2/FaqV2';
import CtaBannerV2 from '../../components/homev2/CtaBannerV2';
import UpfooterOfficesV2 from '../../components/homev2/UpfooterOfficesV2';
import FooterV2 from '../../components/homev2/FooterV2';

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
      <div className="v2-feature-card v2-reveal-on-scroll v2-reveal-up" key={i} style={{ transitionDelay: `${i * 50}ms` }}>
        <div className="v2-feature-card-icon">
          <i className={`fas ${item.icon}`}></i>
        </div>
        <RichText html={item.title} as="h3" className="v2-feature-card-title" />
        <RichText html={item.description} as="p" className="v2-feature-card-description" />
      </div>
    ))}
  </div>
);

// One "slot machine" digit column: a strip of 0-9 stacked vertically inside
// an overflow:hidden window, which slides via CSS transition from
// `startDigit` to `finalDigit` once scrolled into view. Whether it reads as
// rolling "up" or "down" falls out naturally from whether startDigit is
// below or above finalDigit — no separate direction flag needed.
const DIGIT_ROW_HEIGHT = 64;

const DigitReel = ({ finalDigit, startDigit = 0, delay = 0 }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(startDigit);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let timer;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setOffset(finalDigit), delay);
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [finalDigit, delay]);

  return (
    <span className="v2-digit-reel" ref={ref}>
      <span
        className="v2-digit-reel-strip"
        style={{ transform: `translateY(-${offset * DIGIT_ROW_HEIGHT}px)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span className="v2-digit-reel-cell" key={d}>{d}</span>
        ))}
      </span>
    </span>
  );
};

// Renders a stat like "15+" or "98%" as one animated digit reel per digit,
// plus the trailing suffix as static text. `startDigits` sets each digit's
// starting position (defaults to 0, i.e. rolling straight up to its value).
const OdometerStat = ({ value, startDigits = [] }) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return <span>{value}</span>;
  const digits = match[1].split('');
  const suffix = match[2] || '';
  return (
    <span className="v2-odometer-stat">
      {digits.map((d, i) => (
        <DigitReel key={i} finalDigit={parseInt(d, 10)} startDigit={startDigits[i] ?? 0} delay={i * 350} />
      ))}
      {suffix && <span className="v2-odometer-suffix">{suffix}</span>}
    </span>
  );
};

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

// Category eyebrow + icon per service — presentation-only metadata layered
// on top of the real service content (title/description/link/image already
// come from content.json), keyed by the item's existing `number` field.
const SERVICE_CARD_META = {
  '01': { category: 'Engineering', icon: 'fa-code' },
  '02': { category: 'Autonomy', icon: 'fa-diagram-project' },
  '03': { category: 'Infrastructure', icon: 'fa-cloud' },
  '04': { category: 'Growth', icon: 'fa-globe' },
  '05': { category: 'Sustainability', icon: 'fa-leaf' },
  '06': { category: 'Compliance', icon: 'fa-shield-alt' },
  '07': { category: 'Development', icon: 'fa-microchip' },
  '08': { category: 'Software', icon: 'fa-laptop-code' },
  '09': { category: 'Enterprise', icon: 'fa-building' },
  '10': { category: 'Consulting', icon: 'fa-comments' },
  '11': { category: 'Automation', icon: 'fa-robot' },
  '12': { category: 'Transformation', icon: 'fa-bolt' },
  '13': { category: 'Cloud', icon: 'fa-cloud-arrow-up' },
  '14': { category: 'Engineering', icon: 'fa-gears' },
  '15': { category: 'Analytics', icon: 'fa-chart-line' },
  '16': { category: 'Strategy', icon: 'fa-lightbulb' },
  '17': { category: 'Enterprise', icon: 'fa-sitemap' },
};

const HomeV2 = () => {
  const { content, loading } = useContent('home');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (loading || !content) return;

    const observerOptions = {
      threshold: 0.01,
      rootMargin: '100px 0px 50px 0px'
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
      <BentoServices content={homeContent.bentoServices} />


      {/* Trust + Services share one continuous dark background/glow so there's
          no visible seam where one section's own background ended and the
          next began. */}
      <section className="v2-dark-cluster">

      {/* ABOUT US — TESTIMONIAL + STATS SECTION */}
      {(() => {
        const trust = homeContent.trustSection || {};
        const stats = trust.stats?.length > 0 ? trust.stats : [
          { value: '15+', label: 'Years of experiences', description: 'Delivering timeless, functional spaces through innovation, precision, and client-focused design excellence.' },
          { value: '98%', label: 'Client satisfaction rate', description: 'We pride ourselves on delivering excellence, reflected in the high satisfaction of every client.' },
        ];
        return (
          <section className="v2-trust-section">
            <div className="v2-section-container">
              <h2 className="v2-trust-heading v2-reveal-on-scroll v2-reveal-up">
                {trust.heading || 'Supported by many companies around the world'}
              </h2>

              <div className="v2-trust-grid">
                <div className="v2-testimonial-card v2-reveal-on-scroll v2-reveal-left">
                  <span className="v2-testimonial-badge">{trust.badge || "CEO's Words"}</span>
                  <p className="v2-testimonial-quote">
                    {trust.quote || '"Working with you was seamless from start to finish. The final design exceeded our expectations. Your attention to detail and ability to adaptable was outstanding throughout the entire process to the world."'}
                  </p>
                  <div className="v2-testimonial-footer">
                    <div className="v2-testimonial-person">
                      <img
                        src={trust.avatar || '/images/homev2/68bc8ab3454cbbc5f39299c6_Avater.avif'}
                        alt={trust.personName || 'Emily R'}
                        className="v2-testimonial-avatar"
                      />
                      <div>
                        <strong>{trust.personName || 'Emily R'}</strong>
                        <span>{trust.personRole || 'Co Founder of Metrilo'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="v2-trust-stat-col">
                  {stats.map((stat, i) => (
                    <div className="v2-trust-stat-card v2-reveal-on-scroll v2-reveal-right" key={i} style={{ transitionDelay: `${100 + i * 150}ms` }}>
                      <div className="v2-trust-stat-top">
                        <h3 className="v2-trust-stat-number"><OdometerStat value={stat.value} /></h3>
                        <span className="v2-trust-stat-pill">{stat.label}</span>
                      </div>
                      <p className="v2-trust-stat-desc">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

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
        <section className="v2-services-section v2-section-dark">
          <div className="v2-section-container">
            <SectionHeader
              badge={homeContent.services.badge}
              title={homeContent.services.title}
              description={homeContent.services.description}
            />
            <div className="v2-services-card-grid">
              {homeContent.services.items?.map((item, index) => {
                const meta = SERVICE_CARD_META[item.number] || {};
                return (
                <div
                  className="v2-service-card v2-reveal-on-scroll v2-reveal-up"
                  key={item.number}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => window.location.href = item.link}
                >
                  <div className="v2-service-card-image">
                    <img src={item.image} alt={item.title} />
                    <div className="v2-service-card-overlay"></div>
                  </div>
                  <div className="v2-service-card-content">
                    {meta.category && <span className="v2-service-card-category">{meta.category}</span>}
                    {meta.icon && (
                      <div className="v2-service-card-icon">
                        <i className={`fas ${meta.icon}`}></i>
                      </div>
                    )}
                    <div className="v2-service-card-text">
                      <h3 className="v2-service-card-title">{item.title}</h3>
                      <p className="v2-service-card-desc">{item.description}</p>
                      <div className="v2-service-card-link">
                        <span>Learn more</span>
                        <i className="fas fa-arrow-right-long"></i>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 2. HELPING BUSINESSES SECTION — balanced left/right split, enterprise redesign */}
      {homeContent.whyWeHelp && (
        <section className="v2-whywehelp-section v2-section-dark">
          <div className="v2-section-container">
            <div className="v2-whywehelp-split">
              <div className="v2-whywehelp-text v2-reveal-on-scroll v2-reveal-up">
                <div className="v2-whywehelp-badge">
                  <span className="v2-whywehelp-badge-dot"></span>
                  <RichText html={homeContent.whyWeHelp.badge} as="span" />
                </div>
                <RichText html={homeContent.whyWeHelp.title} as="h2" className="v2-whywehelp-title" />
                <RichText html={homeContent.whyWeHelp.description} as="p" className="v2-whywehelp-description" />

                <div className="v2-whywehelp-cta-row">
                  <button className="v2-btn v2-btn-primary" onClick={() => window.location.href = homeContent.whyWeHelp.ctaLink || '/contact'}>
                    {homeContent.whyWeHelp.ctaButton || 'Talk to an Expert'}
                  </button>
                  <a className="v2-whywehelp-secondary-link" href={homeContent.whyWeHelp.secondaryLinkHref || '/blogs'}>
                    {homeContent.whyWeHelp.secondaryLink || 'View Case Studies'}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>

                {homeContent.whyWeHelp.stats?.length > 0 && (
                  <div className="v2-whywehelp-stats">
                    {homeContent.whyWeHelp.stats.map((stat, i) => (
                      <div className="v2-whywehelp-stat" key={i}>
                        <span className="v2-whywehelp-stat-number">{stat.number}</span>
                        <span className="v2-whywehelp-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="v2-whywehelp-grid">
                {homeContent.whyWeHelp.items?.map((item, i) => (
                  <div
                    className={`v2-whywehelp-card v2-reveal-on-scroll v2-reveal-up${i === 0 ? ' v2-whywehelp-card--featured' : ''}`}
                    key={i}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div className="v2-whywehelp-card-header">
                      <div className="v2-whywehelp-card-icon-wrap">
                        <i className={`far ${item.icon}`}></i>
                      </div>
                      <h3 className="v2-whywehelp-card-title">{item.title}</h3>
                    </div>
                    <p className="v2-whywehelp-card-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      </section>

      {/* VENUS ERP SUITE — IN-HOUSE PRODUCT SHOWCASE */}
      <ErpShowcaseV2 content={homeContent.erpShowcase} />

      {/* 4. BRAND NEW WHY CHOOSE VENUS GLOBAL TECHNOLOGY SECTION */}
      <WhyChooseV2 content={homeContent.whyChooseUs} />

      {/* 5. AI PROJECTS PORTFOLIO CAROUSEL SECTION */}
      <AiProjectsPortfolioV2 content={homeContent.aiProjectsPortfolio} />

      {/* RECENT ACHIEVEMENTS IN IT SOLUTIONS SHOWCASE SECTION */}
      <RecentAchievementsV2 content={homeContent.recentAchievements} />

      {/* 6. INDUSTRIES WE EMPOWER SECTION */}
      <IndustriesV2 content={homeContent.industries} />

      {/* TECHNOLOGIES WE WORK WITH BANNER */}
      <IntegrationsBannerV2 title="Technologies We Work With" />

      {/* 8. WORKING PROCESS SECTION */}
      {homeContent.workingProcess && (
        <section className="v2-section-light v2-process-section" id="strategy-to-technology">
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
                  <span className="v2-process-num">{step.number}</span>
                  <h3 className="v2-process-step-title">{step.title}</h3>
                  <p className="v2-process-step-desc">{step.description}</p>
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

      {/* 9. BUSINESS TECHNOLOGY BEYOND SOFTWARE DEVELOPMENT SECTION */}
      <ConsultingShowcaseV2 content={homeContent.consultingExpertise} />

      {/* 10. ESG & COMPLIANCE SERVICES SECTION */}
      <EsgComplianceV2 content={homeContent.esgCompliance} />

      {/* 11. SERVING BUSINESSES ACROSS NORTH AMERICA SECTION */}
      <NorthAmericaReachV2 content={homeContent.servingRegion} />

      {/* 12. FREQUENTLY ASKED QUESTIONS SECTION */}
      <FaqV2 content={homeContent.faq} />

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

      {/* FINAL COSMIC CTA BANNER */}
      <CtaBannerV2 content={homeContent.cta} />

      {/* UPFOOTER: GLOBAL OFFICES SECTION */}
      <UpfooterOfficesV2 offices={homeContent.offices} />

      {/* ENTERPRISE SAAS FOOTER */}
      <FooterV2 />
    </div>
  );
};

export default HomeV2;

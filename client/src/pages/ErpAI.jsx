import React, { useState, useEffect } from 'react';
import '../components/erpai.css';
import FooterV2 from '../components/homev2/FooterV2';
import UpfooterOfficesV2 from '../components/homev2/UpfooterOfficesV2';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';

const iconClass = (icon) => (icon && icon.includes(' ') ? icon : `fas ${icon || ''}`);

const ErpAI = () => {
  useEffect(() => {
    window.location.replace('https://vgt-erp-ai-2.vercel.app/');
  }, []);

  const { content } = useContent('services');
  const { content: home } = useContent('home');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!content) {
    return <div className="erp-page" />;
  }

  const erp = content.erpAI || {};
  const hero = erp.hero || {};
  const benefits = erp.benefits || {};
  const process = erp.process || {};
  const tools = erp.tools || {};
  const industries = erp.industries || {};
  const whyChoose = erp.whyChoose || {};
  const whyPartner = erp.whyPartner || {};
  const faq = erp.faq || {};

  const toolRows = [];
  const toolItems = tools.items || [];
  for (let i = 0; i < toolItems.length; i += 4) {
    toolRows.push(toolItems.slice(i, i + 4));
  }

  return (
    <div className="erp-page">
      {/* Hero Section - home page hero design, ERP AI content */}
      <section className="erp-hero-v2">
        <div className="erp-hero-v2-spotlight spotlight-indigo"></div>
        <div className="erp-hero-v2-spotlight spotlight-violet"></div>
        <div className="erp-hero-v2-spotlight spotlight-cyan"></div>
        <div className="erp-hero-v2-grid-overlay"></div>

        <div className="erp-hero-v2-container">
          <div className="erp-hero-v2-left">
            {hero.badge && (
              <div className="erp-hero-v2-badge">
                <RichText html={hero.badge} as="span" />
              </div>
            )}
            <h1 className="erp-hero-v2-title">
              <span>{hero.titleLine1}</span>
              <span className="erp-hero-v2-title-highlight">{hero.titleLine2}</span>
            </h1>
            <RichText html={hero.description} as="div" className="erp-hero-v2-supporting" />
            <div className="erp-hero-v2-cta">
              <button className="erp-hero-v2-btn-pill" onClick={() => window.location.href = '/contact'}>
                <span>{hero.ctaButton}</span>
                <span className="erp-hero-v2-btn-arrow-circle">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </button>
            </div>
          </div>

          {hero.image && (
            <div className="erp-hero-v2-right">
              <div className="erp-hero-v2-image-wrapper">
                <div className="erp-hero-v2-image-glow"></div>
                <img src={hero.image} alt={stripHtml(hero.badge)} className="erp-hero-v2-image" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section - home page card design */}
      <section className="erp-benefits">
        <div className="erp-benefits-container">
          <div className="erp-benefits-header">
            <div className="erp-benefits-badge">
              <i className="fas fa-star"></i>
              <RichText html={benefits.badge} as="span" />
            </div>
            <h2 className="erp-benefits-title">{benefits.title}</h2>
            <RichText html={benefits.description} as="p" className="erp-benefits-description" />
          </div>

          <div className="erp-benefits-grid">
            {benefits.items?.map((item) => (
              <div className="erp-benefit-card" key={item.title}>
                <div className="erp-benefit-card-icon">
                  <i className={iconClass(item.icon)}></i>
                </div>
                <RichText html={item.title} as="h3" className="erp-benefit-card-title" />
                <RichText html={item.description} as="p" className="erp-benefit-card-description" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="erp-process">
        <div className="erp-process-container">
          <div className="erp-process-header">
            <div className="erp-process-badge">
              <i className="fas fa-cogs"></i>
              <RichText html={process.badge} as="span" />
            </div>
            <h2 className="erp-process-title">{process.title}</h2>
            {process.description && (
              <RichText html={process.description} as="p" className="erp-process-description" />
            )}
          </div>

          <div className="erp-process-timeline">
            {process.steps?.map((step) => (
              <div className="erp-process-step" key={step.number}>
                <span className="erp-process-num">{step.number}</span>
                <h3 className="erp-process-step-title">
                  <RichText html={step.title} as="span" />
                </h3>
                {step.description && (
                  <RichText html={step.description} as="p" className="erp-process-step-desc" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="erp-tools">
        <div className="erp-tools-container">
          <div className="erp-tools-header">
            <div className="erp-tools-badge">
              <i className="fas fa-cube"></i>
              <RichText html={tools.badge} as="span" />
            </div>
            <h2 className="erp-tools-title">{tools.title}</h2>
            {tools.description && (
              <RichText html={tools.description} as="p" className="erp-tools-description" />
            )}
          </div>

          <div className="erp-tools-grid">
            {toolRows.map((row, rowIndex) => (
              <div className="erp-tools-row" key={rowIndex}>
                {row.map((tool) => (
                  <div className="erp-tool-item" key={tool.name}>
                    <div className="erp-tool-icon">
                      <i className={iconClass(tool.icon)}></i>
                      <span className="erp-tool-name">{tool.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - home page "Industries We Empower" card design */}
      {industries.items?.length > 0 && (
        <section className="erp-industries-section">
          <div className="erp-industries-ambient-glow glow-top"></div>
          <div className="erp-industries-ambient-glow glow-bottom"></div>

          <div className="erp-industries-container">
            <div className="erp-industries-header">
              <div className="erp-benefits-badge">
                <i className="fas fa-star"></i>
                <RichText html={industries.badge} as="span" />
              </div>
              <h2 className="erp-benefits-title">{industries.title}</h2>
              <RichText html={industries.description} as="p" className="erp-benefits-description" />
            </div>

            <div className="erp-industries-grid">
              {industries.items.map((item) => (
                <div className="erp-industry-card" key={item.id || item.title}>
                  <div className="erp-industry-card-bg" style={{ backgroundImage: `url('${item.image}')` }}></div>
                  <div className="erp-industry-card-overlay"></div>
                  <div className="erp-industry-card-inner">
                    <h3 className="erp-industry-card-title">{item.title}</h3>
                    <RichText html={item.description} as="p" className="erp-industry-card-desc" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      <section className="erp-why-choose">
        <div className="erp-why-choose-container">
          <div className="erp-why-choose-image">
            <img src={whyChoose.image} alt="" />
          </div>
          <div className="erp-why-choose-content">
            {whyChoose.badge && (
              <div className="erp-why-choose-badge">
                <i className="fas fa-cube"></i>
                <RichText html={whyChoose.badge} as="span" />
              </div>
            )}
            {whyChoose.title && <h2 className="erp-why-choose-title">{whyChoose.title}</h2>}
            {whyChoose.description && (
              <RichText html={whyChoose.description} as="p" className="erp-why-choose-description" />
            )}
            <div className="erp-why-choose-divider"></div>
            <div className="erp-why-choose-benefits">
              {whyChoose.items?.map((item) => (
                <div className="erp-why-choose-benefit-flip-card" key={item.title}>
                  <div className="erp-why-choose-benefit-flip-inner">
                    <div className="erp-why-choose-benefit-flip-front">
                      <div className="erp-why-choose-benefit-icon">
                        <i className={iconClass(item.icon)}></i>
                      </div>
                      <h3 className="erp-why-choose-benefit-title">
                        <RichText html={item.title} as="span" />
                      </h3>
                    </div>
                    <div className="erp-why-choose-benefit-flip-back">
                      <RichText html={item.description} as="p" className="erp-why-choose-benefit-description" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section - home page "Why We Help" / Impact section design */}
      {whyPartner.items?.length > 0 && (
        <section className="erp-why-partner">
          <div className="erp-why-partner-container">
            <div className="erp-why-partner-split">
              <div className="erp-why-partner-text">
                <div className="erp-why-partner-badge">
                  <span className="erp-why-partner-badge-dot"></span>
                  <RichText html={whyPartner.badge} as="span" />
                </div>
                <RichText html={whyPartner.title} as="h2" className="erp-why-partner-title" />
                <RichText html={whyPartner.description} as="p" className="erp-why-partner-description" />

                <div className="erp-why-partner-cta">
                  <button className="erp-hero-v2-btn-pill" onClick={() => window.location.href = whyPartner.ctaLink || '/contact'}>
                    <span>{whyPartner.ctaButton || 'Talk to an Expert'}</span>
                    <span className="erp-hero-v2-btn-arrow-circle">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>

              <div className="erp-why-partner-grid">
                {whyPartner.items.map((item, i) => (
                  <div className="erp-why-partner-card" key={i}>
                    <div className="erp-why-partner-card-icon">
                      <i className={iconClass(item.icon)}></i>
                    </div>
                    <span className="erp-why-partner-card-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="erp-faq">
        <div className="erp-faq-container">
          <div className="erp-faq-header">
            <div className="erp-faq-badge">
              <i className="fas fa-cube"></i>
              <RichText html={faq.badge} as="span" />
            </div>
            <h2 className="erp-faq-title">{faq.title}</h2>
            {faq.description && (
              <p className="erp-faq-description">
                {faq.description.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>

          <div className="erp-faq-content">
            <div className="erp-faq-contact">
              <div className="erp-faq-contact-card">
                <h3 className="erp-faq-contact-title">{faq.contactCard?.title}</h3>
                <div className="erp-faq-contact-divider"></div>
                <RichText html={faq.contactCard?.description} as="p" className="erp-faq-contact-description" />
                <button className="erp-faq-contact-button" onClick={() => window.location.href = '/contact'}>{faq.contactCard?.buttonText}</button>
              </div>
            </div>

            <div className="erp-faq-list">
              {faq.items?.map((item, index) => (
                <div
                  className={`erp-faq-item${openFaqIndex === index ? ' active' : ''}`}
                  key={item.question}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <div className="erp-faq-question">
                    <h4>
                      <RichText html={item.question} as="span" />
                    </h4>
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="erp-faq-answer">
                    <RichText html={item.answer} as="p" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default ErpAI;

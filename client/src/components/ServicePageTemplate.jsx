import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import FooterV2 from './homev2/FooterV2';
import UpfooterOfficesV2 from './homev2/UpfooterOfficesV2';
import RichText from './RichText';
import AppIntegrationsMarquee from './AppIntegrationsMarquee';
import { useContent } from '../hooks/useContent';
import { stripHtml } from '../utils/stripHtml';

const iconClass = (icon) => (icon && icon.includes(' ') ? icon : `fas ${icon || ''}`);

// Hardcoded per-page, not content/admin-driven: routing the Lottie file
// through content.json (fetched via an admin-editable path) hit the CRA
// dev-proxy bug where any asset path needing URL-encoding (spaces in these
// filenames) got misrouted to the backend and 404'd. Hardcoding the path
// here avoids that entirely.
const LOTTIE_BY_PREFIX = {
  agentic: { path: '/lottie/actable-ai-landing-page-animation.json', fallbackIcon: 'fa-robot' },
  esg: { path: '/lottie/esg-environmental-social-governance.json', fallbackIcon: 'fa-leaf' },
  digital: { path: '/lottie/digital-marketing-services.json', fallbackIcon: 'fa-bullhorn' },
  'software-data': { path: '/lottie/software-development.json', fallbackIcon: 'fa-code' },
  cloud: { path: '/lottie/automation-process.json', fallbackIcon: 'fa-cloud' },
  iatf: { path: '/lottie/hotf-4.json', fallbackIcon: 'fa-clipboard-check' },
};

// Shared layout for the 6 near-identical service pages (Hero / Benefits /
// Process / Tools / Why Choose / FAQ / Offices / Footer). Each page supplies
// its own CSS file (for the `${prefix}-*` class names) and its own content
// slice from content.services.<key>; the Lottie animation is hardcoded per
// prefix above, and the static hero image (used only if there's no Lottie
// entry for this prefix) lives on content.hero itself.
const ServicePageTemplate = ({ pageClass, prefix, content, customHero, belowHero }) => {
  const [animationData, setAnimationData] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { content: home } = useContent('home');

  const hero = content?.hero || {};
  const benefits = content?.benefits || {};
  const process = content?.process || {};
  const tools = content?.tools || {};
  const whyChoose = content?.whyChoose || {};
  const faq = content?.faq || {};

  const lottie = LOTTIE_BY_PREFIX[prefix];

  useEffect(() => {
    if (!lottie) return;
    fetch(encodeURI(lottie.path))
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, [lottie]);

  const toolRows = [];
  const items = tools.items || [];
  for (let i = 0; i < items.length; i += 4) {
    toolRows.push(items.slice(i, i + 4));
  }

  return (
    <div className={pageClass}>
      {/* Hero Section */}
      {customHero ? (
        customHero
      ) : (
        <section className={`${prefix}-hero`}>
          <div className={`${prefix}-hero-container`}>
            <div className={`${prefix}-hero-content`}>
              <div className={`${prefix}-hero-badge`}>
                <RichText html={hero.badge} as="span" />
              </div>
              <h1 className={`${prefix}-hero-title`}>
                <span className="title-line">{hero.titleLine1}</span>
                <span className="title-line">{hero.titleLine2}</span>
              </h1>
              <RichText html={hero.description} as="p" className={`${prefix}-hero-description`} />
              <div className={`${prefix}-hero-cta`}>
                <button className={`${prefix}-hero-button`} onClick={() => window.location.href = '/contact'}>{hero.ctaButton}</button>
              </div>
            </div>
            {lottie ? (
              <div className={`${prefix}-hero-lottie`}>
                <div className={`${prefix}-lottie-container`}>
                  <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                  />
                  {!animationData && (
                    <div className="lottie-placeholder">
                      <div className="lottie-placeholder-content">
                        <i className={iconClass(lottie.fallbackIcon)}></i>
                        <p>Lottie Animation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : hero.image ? (
              <div className={`${prefix}-hero-image`}>
                <div className={`${prefix}-image-container`}>
                  <img src={hero.image} alt={stripHtml(hero.badge)} className={`${prefix}-hero-img`} />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Dual-Row Infinite App Integration Carousel Section */}
      {belowHero ? belowHero : prefix === 'agentic' ? <AppIntegrationsMarquee /> : null}

      {/* Benefits Section */}
      <section className={`${prefix}-benefits`}>
        <div className={`${prefix}-benefits-container`}>
          <div className={`${prefix}-benefits-header`}>
            <div className={`${prefix}-benefits-badge`}>
              <i className="fas fa-star"></i>
              <RichText html={benefits.badge} as="span" />
            </div>
            <h2 className={`${prefix}-benefits-title`}>{benefits.title}</h2>
            <RichText html={benefits.description} as="p" className={`${prefix}-benefits-description`} />
          </div>

          <div className={`${prefix}-benefits-grid`}>
            {benefits.items?.map((item) => (
              <div className={`${prefix}-benefit-flip-card`} key={item.title}>
                <div className={`${prefix}-benefit-flip-inner`}>
                  <div className={`${prefix}-benefit-flip-front`}>
                    <div className={`${prefix}-benefit-icon`}>
                      <i className={iconClass(item.icon)}></i>
                    </div>
                    <h3 className={`${prefix}-benefit-title`}>
                      <RichText html={item.title} as="span" />
                    </h3>
                  </div>
                  <div className={`${prefix}-benefit-flip-back`}>
                    <RichText html={item.description} as="p" className={`${prefix}-benefit-description`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`${prefix}-process`}>
        <div className={`${prefix}-process-container`}>
          <div className={`${prefix}-process-header`}>
            <div className={`${prefix}-process-badge`}>
              <i className="fas fa-cogs"></i>
              <RichText html={process.badge} as="span" />
            </div>
            <h2 className={`${prefix}-process-title`}>{process.title}</h2>
            {process.description && (
              <RichText html={process.description} as="p" className={`${prefix}-process-description`} />
            )}
          </div>

          <div className={`${prefix}-process-timeline`}>
            {process.steps?.map((step, index) => (
              <React.Fragment key={step.number}>
                {index > 0 && (
                  <div className="process-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                )}
                <div className="process-step" data-step={index + 1}>
                  <div className="process-step-content">
                    <div className="process-step-number">{step.number}</div>
                    <div className="process-step-icon">
                      <i className={iconClass(step.icon)}></i>
                    </div>
                    <h3 className="process-step-title">
                      <RichText html={step.title} as="span" />
                    </h3>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={`${prefix}-tools`}>
        <div className={`${prefix}-tools-container`}>
          <div className={`${prefix}-tools-header`}>
            <div className={`${prefix}-tools-badge`}>
              <i className="fas fa-cube"></i>
              <RichText html={tools.badge} as="span" />
            </div>
            <h2 className={`${prefix}-tools-title`}>{tools.title}</h2>
            {tools.description && (
              <RichText html={tools.description} as="p" className={`${prefix}-tools-description`} />
            )}
          </div>

          <div className={`${prefix}-tools-grid`}>
            {toolRows.map((row, rowIndex) => (
              <div className={`${prefix}-tools-row`} key={rowIndex}>
                {row.map((tool) => (
                  <div className={`${prefix}-tool-item`} key={tool.name}>
                    <div className={`${prefix}-tool-icon`}>
                      <i className={iconClass(tool.icon)}></i>
                      <span className={`${prefix}-tool-name`}>{tool.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className={`${prefix}-why-choose`}>
        <div className={`${prefix}-why-choose-container`}>
          <div className={`${prefix}-why-choose-image`}>
            <img src={whyChoose.image} alt="" />
          </div>
          <div className={`${prefix}-why-choose-content`}>
            {whyChoose.badge && (
              <div className={`${prefix}-why-choose-badge`}>
                <i className="fas fa-cube"></i>
                <RichText html={whyChoose.badge} as="span" />
              </div>
            )}
            {whyChoose.title && <h2 className={`${prefix}-why-choose-title`}>{whyChoose.title}</h2>}
            {whyChoose.description && (
              <RichText html={whyChoose.description} as="p" className={`${prefix}-why-choose-description`} />
            )}
            <div className={`${prefix}-why-choose-divider`}></div>
            <div className={`${prefix}-why-choose-benefits`}>
              {whyChoose.items?.map((item) => (
                <div className={`${prefix}-why-choose-benefit-flip-card`} key={item.title}>
                  <div className={`${prefix}-why-choose-benefit-flip-inner`}>
                    <div className={`${prefix}-why-choose-benefit-flip-front`}>
                      <div className={`${prefix}-why-choose-benefit-icon`}>
                        <i className={iconClass(item.icon)}></i>
                      </div>
                      <h3 className={`${prefix}-why-choose-benefit-title`}>
                        <RichText html={item.title} as="span" />
                      </h3>
                    </div>
                    <div className={`${prefix}-why-choose-benefit-flip-back`}>
                      <RichText html={item.description} as="p" className={`${prefix}-why-choose-benefit-description`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {prefix !== 'agentic' && (
        <section className={`${prefix}-faq`}>
          <div className={`${prefix}-faq-container`}>
            <div className={`${prefix}-faq-header`}>
              <div className={`${prefix}-faq-badge`}>
                <i className="fas fa-cube"></i>
                <RichText html={faq.badge} as="span" />
              </div>
              <h2 className={`${prefix}-faq-title`}>{faq.title}</h2>
              {faq.description && (
                <p className={`${prefix}-faq-description`}>
                  {faq.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>

            <div className={`${prefix}-faq-content`}>
              <div className={`${prefix}-faq-contact`}>
                <div className={`${prefix}-faq-contact-card`}>
                  <h3 className={`${prefix}-faq-contact-title`}>{faq.contactCard?.title}</h3>
                  <div className={`${prefix}-faq-contact-divider`}></div>
                  <RichText html={faq.contactCard?.description} as="p" className={`${prefix}-faq-contact-description`} />
                  <button className={`${prefix}-faq-contact-button`} onClick={() => window.location.href = '/contact'}>{faq.contactCard?.buttonText}</button>
                </div>
              </div>

              <div className={`${prefix}-faq-list`}>
                {faq.items?.map((item, index) => (
                  <div
                    className={`${prefix}-faq-item${openFaqIndex === index ? ' active' : ''}`}
                    key={item.question}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className={`${prefix}-faq-question`}>
                      <h4>
                        <RichText html={item.question} as="span" />
                      </h4>
                      <i className="fas fa-plus"></i>
                    </div>
                    <div className={`${prefix}-faq-answer`}>
                      <RichText html={item.answer} as="p" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <UpfooterOfficesV2 offices={home?.offices} />
      <FooterV2 />
    </div>
  );
};

export default ServicePageTemplate;

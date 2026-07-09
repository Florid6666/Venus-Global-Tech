import React, { useState } from 'react';
import './investment.css';
import Footer from '../components/Footer';
import GlobalOffices from '../components/GlobalOffices';
import RichText from '../components/RichText';
import { useContent } from '../hooks/useContent';

const Investment = () => {
  const { content } = useContent('investment');
  const { content: home } = useContent('home');
  const sectors = content?.focus?.sectors || {};
  const [activeTab, setActiveTab] = useState(null);

  if (!content) {
    return <div className="inv-page" />;
  }

  const currentTab = activeTab && sectors[activeTab] ? activeTab : Object.keys(sectors)[0];
  const active = sectors[currentTab];
  const { hero, stats, focus, moreThanCapital, gallery, cta } = content;

  return (
    <div className="inv-page">

      {/* Hero */}
      <section className="inv-hero">
        <div className="inv-hero-bg">
          <img src={hero?.backgroundImage} alt="" className="inv-hero-img" />
          <div className="inv-hero-overlay" />
        </div>
        <div className="inv-container inv-hero-content">
          <div className="inv-badge">
            <i className={hero?.badgeIcon} />
            <span>{hero?.badge}</span>
          </div>
          <h1 className="inv-hero-title">
            {hero?.titleLine1}<br />
            <span className="inv-accent">{hero?.titleAccent}</span>
          </h1>
          <p className="inv-hero-sub">{hero?.subtitle}</p>
          <RichText html={hero?.description} as="p" className="inv-hero-desc" />
          <div className="inv-hero-ctas">
            <button className="inv-btn-primary" onClick={() => window.location.href = '/contact'}>
              {hero?.primaryButton}
            </button>
            <button className="inv-btn-ghost" onClick={() => document.getElementById('inv-focus').scrollIntoView({ behavior: 'smooth' })}>
              {hero?.secondaryButton} <i className="fas fa-arrow-down" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="inv-stats">
        <div className="inv-container inv-stats-grid">
          {stats?.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && <div className="inv-stat-divider" />}
              <div className="inv-stat-item">
                <div className="inv-stat-number">{stat.number}</div>
                <div className="inv-stat-label">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Investment Focus */}
      <section className="inv-focus" id="inv-focus">
        <div className="inv-container">
          <div className="inv-section-header">
            <div className="inv-badge inv-badge-dark">
              <i className="fas fa-bullseye" />
              <span>{focus?.badge}</span>
            </div>
            <h2 className="inv-section-title">{focus?.title}</h2>
            <p className="inv-section-desc">
              {focus?.description}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inv-tabs">
            {Object.entries(sectors).map(([key, sec]) => (
              <button
                key={key}
                className={`inv-tab ${currentTab === key ? 'inv-tab-active' : ''}`}
                onClick={() => setActiveTab(key)}
                style={currentTab === key ? { borderColor: sec.color, color: sec.color } : {}}
              >
                <i className={sec.icon} />
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Panel */}
          {active && (
            <div className="inv-panel" key={currentTab}>
              <div className="inv-panel-image">
                <img src={active.image} alt={active.label} />
                <div className="inv-panel-image-badge" style={{ background: active.color }}>
                  <i className={active.icon} />
                  <span>{active.label}</span>
                </div>
              </div>
              <div className="inv-panel-content">
                <h3 className="inv-panel-title" style={{ color: active.color }}>{active.label}</h3>
                <ul className="inv-panel-list">
                  {active.items?.map((item, i) => (
                    <li key={i} className="inv-panel-list-item">
                      <span className="inv-check" style={{ background: active.color }}>
                        <i className="fas fa-check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* More Than Capital */}
      <section className="inv-more">
        <div className="inv-container inv-more-grid">
          <div className="inv-more-images">
            <div className="inv-more-img-main">
              <img src={moreThanCapital?.mainImage} alt="Venus Global Tech partnership" />
            </div>
            <div className="inv-more-img-secondary">
              <img src={moreThanCapital?.secondaryImage} alt="Venus Consultancy" />
            </div>
          </div>
          <div className="inv-more-content">
            <div className="inv-badge inv-badge-dark">
              <i className="fas fa-handshake" />
              <span>{moreThanCapital?.badge}</span>
            </div>
            <h2 className="inv-section-title">{moreThanCapital?.titleLine1}<br />{moreThanCapital?.titleLine2}</h2>
            <RichText html={moreThanCapital?.description} as="p" className="inv-more-desc" />
            <div className="inv-pillars">
              {moreThanCapital?.pillars?.map((pillar) => (
                <div className="inv-pillar" key={pillar.title}>
                  <div className="inv-pillar-icon">
                    <i className={pillar.icon} />
                  </div>
                  <div>
                    <div className="inv-pillar-title">{pillar.title}</div>
                    <div className="inv-pillar-desc">{pillar.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="inv-gallery">
        <div className="inv-container">
          <div className="inv-section-header">
            <div className="inv-badge">
              <i className="fas fa-images" />
              <span>{gallery?.badge}</span>
            </div>
            <h2 className="inv-section-title inv-light">{gallery?.title}</h2>
            <p className="inv-section-desc inv-light">
              {gallery?.description}
            </p>
          </div>
          <div className="inv-gallery-grid">
            {gallery?.items?.map((item) => (
              <div
                className={`inv-gallery-item ${item.size === 'large' ? 'inv-gallery-large' : ''}`}
                key={item.caption}
              >
                <img src={item.image} alt={item.caption} />
                <div className="inv-gallery-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="inv-cta">
        <div className="inv-container inv-cta-inner">
          <div className="inv-cta-text">
            <div className="inv-badge">
              <i className="fas fa-rocket" />
              <span>{cta?.badge}</span>
            </div>
            <h2 className="inv-cta-title">{cta?.title}</h2>
            <RichText html={cta?.description} as="p" className="inv-cta-desc" />
            <RichText html={cta?.subNote} as="p" className="inv-cta-sub" />
          </div>
          <div className="inv-cta-actions">
            <button className="inv-btn-primary inv-btn-large" onClick={() => window.location.href = '/contact'}>
              <i className="fas fa-paper-plane" /> {cta?.buttonText}
            </button>
            <div className="inv-cta-note">
              <i className="fas fa-shield-alt" />
              <span>{cta?.note}</span>
            </div>
          </div>
        </div>
      </section>

      <GlobalOffices offices={home?.offices} />
      <Footer />
    </div>
  );
};

export default Investment;

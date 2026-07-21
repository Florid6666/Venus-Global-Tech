import React, { useEffect, useRef } from 'react';
import './BentoServices.css';

const DEFAULTS = {
  agenticAi: {
    image: '/images/homev2/card01.png',
    link: '/agentic-ai',
    pillOne: 'AI Agents',
    pillTwo: 'Automation',
    title: 'Next-generation autonomous AI agents that reason, plan, and execute complex tasks independently',
  },
  softwareData: {
    image: '/images/homev2/card02.png',
    link: '/software-data-ai',
    title: 'Intelligent software and data AI solutions built to transform your business operations',
    description: 'We build intelligent applications, implement machine learning models, and craft data-driven solutions that drive innovation and efficiency.',
  },
  stat: {
    image: '/images/homev2/card03top.png',
    link: '/about',
    number: '100+',
    label: 'Happy Clients Worldwide',
  },
  cloud: {
    image: '/images/homev2/card03bottom.png',
    link: '/cloud-service',
    title: 'Scalable, secure cloud infrastructure built to grow with your business',
    tagLabel: 'Cloud Services',
  },
};

const BentoServices = ({ content }) => {
  const sectionRef = useRef(null);

  const agenticAi = { ...DEFAULTS.agenticAi, ...(content?.agenticAi || {}) };
  const softwareData = { ...DEFAULTS.softwareData, ...(content?.softwareData || {}) };
  const stat = { ...DEFAULTS.stat, ...(content?.stat || {}) };
  const cloud = { ...DEFAULTS.cloud, ...(content?.cloud || {}) };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.bs-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('bs-card--visible');
              }, index * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px 0px 50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bs-section" ref={sectionRef}>
      <div className="bs-grid">

        {/* ── Card 1: Agentic AI Solutions ── */}
        <div className="bs-card bs-card--tall" onClick={() => window.location.href = agenticAi.link}>
          <div className="bs-card-bg" style={{ backgroundImage: `url(${agenticAi.image})` }}></div>
          <div className="bs-card-inner">
            <div className="bs-card-top">
              <div className="bs-pill-row">
                <span className="bs-pill">{agenticAi.pillOne}</span>
                <span className="bs-pill">{agenticAi.pillTwo}</span>
              </div>
              <h3 className="bs-card-title">
                {agenticAi.title}
              </h3>
            </div>
            <div className="bs-card-bottom">
              <div className="bs-icon-row">
                <span className="bs-brand-icon bs-messenger" title="Reasoning"><i className="fas fa-lightbulb"></i></span>
                <span className="bs-brand-icon bs-skype" title="Planning"><i className="fas fa-diagram-project"></i></span>
                <span className="bs-brand-icon bs-telegram" title="Execution"><i className="fas fa-bolt"></i></span>
                <span className="bs-brand-icon bs-discord" title="Learning &amp; Adapting"><i className="fas fa-arrows-rotate"></i></span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Software Development & Data AI ── */}
        <div className="bs-card bs-card--tall" onClick={() => window.location.href = softwareData.link}>
          <div className="bs-card-bg" style={{ backgroundImage: `url(${softwareData.image})` }}></div>
          <div className="bs-card-inner">
            <div className="bs-card-top">
              <div className="bs-card-icon-wrap">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="bs-card-title">
                {softwareData.title}
              </h3>
              <p className="bs-card-desc">
                {softwareData.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Card 3: Right Column (split) ── */}
        <div className="bs-card-stack">

          {/* 3A: Stats Card */}
          <div className="bs-card bs-card--stat" onClick={() => window.location.href = stat.link}>
            <div className="bs-card-bg" style={{ backgroundImage: `url(${stat.image})` }}></div>
            <div className="bs-card-inner bs-card-inner--stat">
              <div className="bs-stat-number">{stat.number}</div>
              <div className="bs-stat-label">{stat.label}</div>
            </div>
          </div>

          {/* 3B: Cloud Services & Infrastructure */}
          <div className="bs-card bs-card--openai" onClick={() => window.location.href = cloud.link}>
            <div className="bs-card-bg" style={{ backgroundImage: `url(${cloud.image})` }}></div>
            <div className="bs-card-inner">
              <div className="bs-card-top">
                <h3 className="bs-card-title bs-card-title--sm">
                  {cloud.title}
                </h3>
              </div>
              <div className="bs-openai-logo">
                <i className="fas fa-cloud bs-openai-icon"></i>
                <span>{cloud.tagLabel}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BentoServices;

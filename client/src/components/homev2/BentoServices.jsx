import React, { useEffect, useRef } from 'react';
import './BentoServices.css';

const BentoServices = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.bs-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('bs-card--visible');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bs-section" ref={sectionRef}>
      <div className="bs-grid">

        {/* ── Card 1: AI Chatbot ── */}
        <div className="bs-card bs-card--tall" onClick={() => window.location.href = '/agentic-ai'}>
          <div className="bs-card-bg" style={{ backgroundImage: 'url(/images/homev2/card01.png)' }}></div>
          <div className="bs-card-inner">
            <div className="bs-card-top">
              <div className="bs-pill-row">
                <span className="bs-pill">Solutions</span>
                <span className="bs-pill">Plugins</span>
              </div>
              <h3 className="bs-card-title">
                Transform customer support with intelligent AI chatbots for seamless and effortless service
              </h3>
            </div>
            <div className="bs-card-bottom">
              <div className="bs-icon-row">
                <span className="bs-brand-icon bs-messenger"><i className="fab fa-facebook-messenger"></i></span>
                <span className="bs-brand-icon bs-skype"><i className="fab fa-skype"></i></span>
                <span className="bs-brand-icon bs-telegram"><i className="fab fa-telegram"></i></span>
                <span className="bs-brand-icon bs-discord"><i className="fab fa-discord"></i></span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: AI Dashboard ── */}
        <div className="bs-card bs-card--tall" onClick={() => window.location.href = '/software-data-ai'}>
          <div className="bs-card-bg" style={{ backgroundImage: 'url(/images/homev2/card02.png)' }}></div>
          <div className="bs-card-inner">
            <div className="bs-card-top">
              <div className="bs-card-icon-wrap">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="bs-card-title">
                All-in-One AI solutions dashboard for smarter business insights &amp; innovation.
              </h3>
              <p className="bs-card-desc">
                Explore our comprehensive AI solutions dashboard designed to provide actionable business insights and drive innovation
              </p>
            </div>
          </div>
        </div>

        {/* ── Card 3: Right Column (split) ── */}
        <div className="bs-card-stack">

          {/* 3A: Stats Card */}
          <div className="bs-card bs-card--stat" onClick={() => window.location.href = '/about'}>
            <div className="bs-card-bg" style={{ backgroundImage: 'url(/images/homev2/card03top.png)' }}></div>
            <div className="bs-card-inner bs-card-inner--stat">
              <div className="bs-stat-number">500+</div>
              <div className="bs-stat-label">Projects</div>
            </div>
          </div>

          {/* 3B: OpenAI Integration */}
          <div className="bs-card bs-card--openai" onClick={() => window.location.href = '/cloud-service'}>
            <div className="bs-card-bg" style={{ backgroundImage: 'url(/images/homev2/card03bottom.png)' }}></div>
            <div className="bs-card-inner">
              <div className="bs-card-top">
                <h3 className="bs-card-title bs-card-title--sm">
                  Unlock your full potential with effortless OpenAI integration solutions
                </h3>
              </div>
              <div className="bs-openai-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="OpenAI" className="bs-openai-icon" />
                <span>OpenAI</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BentoServices;

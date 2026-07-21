import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './AiSolutionsV2.css';

const DEFAULT_AI_EXPERTISE = [
  {
    id: 'agentic-ai',
    icon: 'fa-robot',
    title: 'Agentic AI Solutions',
    description: 'Autonomous agents that plan, reason, and execute multi-step workflows.'
  },
  {
    id: 'autonomous-agents',
    icon: 'fa-brain',
    title: 'Autonomous AI Agents',
    description: 'Independent task execution with continuous learning & adaptation.'
  },
  {
    id: 'workflow-auto',
    icon: 'fa-diagram-project',
    title: 'AI Workflow Automation',
    description: 'Streamlined end-to-end enterprise operations reducing manual overhead.'
  },
  {
    id: 'ai-integration',
    icon: 'fa-plug',
    title: 'AI Integration Services',
    description: 'Seamless embedding of LLMs and foundation models into core business apps.'
  },
  {
    id: 'ai-software-dev',
    icon: 'fa-code',
    title: 'AI Software Development',
    description: 'Bespoke enterprise software powered by built-in artificial intelligence.'
  },
  {
    id: 'ml-solutions',
    icon: 'fa-network-wired',
    title: 'Machine Learning Solutions',
    description: 'Predictive analytics, NLP, and computer vision tailored to domain data.'
  },
  {
    id: 'ai-biz-solutions',
    icon: 'fa-chart-line',
    title: 'AI Business Solutions',
    description: 'Data-backed strategies driving measurable business growth and ROI.'
  },
  {
    id: 'intel-automation',
    icon: 'fa-bolt-lightning',
    title: 'Intelligent Automation',
    description: 'Cognitive bots handling high-frequency tasks with high precision.'
  },
  {
    id: 'agent-dev',
    icon: 'fa-microchip',
    title: 'AI Agent Development',
    description: 'Custom multi-agent architectures built for complex enterprise domains.'
  },
  {
    id: 'ai-digital-trans',
    icon: 'fa-wand-magic-sparkles',
    title: 'AI Digital Transformation',
    description: 'Modernizing legacy architectures with AI-first cloud infrastructure.'
  }
];

const AiSolutionsV2 = ({ content }) => {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Admin-uploaded Lottie takes priority; falls back to the bundled default.
    const animationPath = content?.lottieJson || '/images/homev2/live-chatbot.json';
    fetch(encodeURI(animationPath))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLottieData(data);
      })
      .catch((err) => {
        console.error('Error loading AI Solutions Lottie animation:', err);
      });
  }, [content?.lottieJson]);

  const badgeText = content?.badge || 'OUR AI EXPERTISE';
  const headingText = content?.title || 'AI Solutions Built for Real Business Outcomes';
  const paragraphText = content?.description || 'Artificial Intelligence should deliver measurable business value. Our AI experts design and develop intelligent systems that automate operations, improve decision-making, enhance customer experiences, and unlock new revenue opportunities.';
  const expertiseItems = content?.items || DEFAULT_AI_EXPERTISE;
  const primaryCta = content?.primaryCta || 'Explore AI Solutions';
  const secondaryCta = content?.secondaryCta || 'Talk to an AI Expert';

  return (
    <section className="v2-ai-solutions-section" id="ai-solutions">
      {/* Ambient Radial Lighting */}
      <div className="v2-ai-solutions-glow glow-left"></div>
      <div className="v2-ai-solutions-glow glow-right"></div>

      <div className="v2-ai-solutions-container">
        {/* Reversed 2-Column Split Layout: Lottie Left, Content Right */}
        <div className="v2-ai-solutions-grid">
          
          {/* LEFT COLUMN: Visual Card with Lottie Animation */}
          <div className="v2-ai-solutions-left v2-reveal-on-scroll v2-reveal-left">
            <div className="v2-ai-solutions-visual-card">
              
              {/* Floating Decorative Badges */}
              <div className="v2-ai-badge badge-ai-top-left">
                <div className="v2-ai-badge-icon icon-cyan">
                  <i className="fas fa-comment-dots"></i>
                </div>
                <div className="v2-ai-badge-text">
                  <strong>Live AI Chatbot</strong>
                  <span>Natural Language Understanding</span>
                </div>
              </div>

              <div className="v2-ai-badge badge-ai-bottom-left">
                <div className="v2-ai-badge-icon icon-blue">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="v2-ai-badge-text">
                  <strong>Real-Time Execution</strong>
                  <span>Sub-second Response</span>
                </div>
              </div>

              <div className="v2-ai-badge badge-ai-bottom-right">
                <div className="v2-ai-badge-icon icon-purple">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="v2-ai-badge-text">
                  <strong>Enterprise Guardrails</strong>
                  <span>Zero Data Leakage</span>
                </div>
              </div>

              {/* Lottie Container */}
              <div className="v2-ai-lottie-container">
                {lottieData ? (
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className="v2-ai-lottie-player"
                  />
                ) : (
                  <div className="v2-ai-lottie-fallback">
                    <i className="fas fa-robot v2-ai-fallback-icon"></i>
                  </div>
                )}
              </div>

              <div className="v2-ai-card-ambient"></div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="v2-ai-solutions-right v2-reveal-on-scroll v2-reveal-up">
            
            {/* Pill Badge */}
            <div className="v2-ai-solutions-badge">
              <span className="v2-ai-badge-dot"></span>
              <span className="v2-ai-badge-label">{badgeText}</span>
            </div>

            {/* Headline */}
            <h2 className="v2-ai-solutions-heading">
              {headingText}
            </h2>

            {/* Supporting Paragraph */}
            <p className="v2-ai-solutions-paragraph">
              {paragraphText}
            </p>

            {/* AI Capabilities 2-Column Grid */}
            <div className="v2-ai-expertise-grid">
              {expertiseItems.map((item, index) => (
                <div 
                  className="v2-ai-expertise-card v2-reveal-on-scroll v2-reveal-up"
                  key={item.id || index}
                  style={{ transitionDelay: `${index * 45}ms` }}
                >
                  <div className="v2-ai-expertise-icon">
                    <i className={`fas ${item.icon || 'fa-star'}`}></i>
                  </div>
                  <div className="v2-ai-expertise-info">
                    <h3 className="v2-ai-expertise-title">{item.title || item}</h3>
                    {item.description && (
                      <p className="v2-ai-expertise-desc">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="v2-ai-solutions-cta-row">
              <button 
                className="v2-ai-btn-primary"
                onClick={() => window.location.href = '/contact'}
              >
                <span>{primaryCta}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              <a 
                href="/services" 
                className="v2-ai-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
              >
                <span>{secondaryCta}</span>
                <i className="fas fa-arrow-right-long v2-ai-arrow"></i>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AiSolutionsV2;

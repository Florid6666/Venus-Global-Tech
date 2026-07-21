import React from 'react';
import './WorkingProcessV2.css';

const DEFAULT_STEPS = [
  {
    number: '01',
    title: 'Business Discovery',
    description: 'Understand goals, processes, and challenges.',
    icon: 'fa-magnifying-glass-chart'
  },
  {
    number: '02',
    title: 'Technology Strategy',
    description: 'Identify the best AI, cloud, and software solutions.',
    icon: 'fa-diagram-project'
  },
  {
    number: '03',
    title: 'Design & Development',
    description: 'Build secure, scalable digital products.',
    icon: 'fa-laptop-code'
  },
  {
    number: '04',
    title: 'Deployment',
    description: 'Launch with cloud-native infrastructure.',
    icon: 'fa-cloud-arrow-up'
  },
  {
    number: '05',
    title: 'Optimization',
    description: 'Continuously improve performance using analytics and AI.',
    icon: 'fa-chart-line'
  }
];

const WorkingProcessV2 = ({ content }) => {
  const badgeText = content?.badge || 'PROVEN METHODOLOGY';
  const headingText = content?.title || 'From Strategy to Scalable Technology';
  const paragraphText = content?.description || 'Every successful digital transformation starts with the right strategy. Our proven approach ensures technology investments generate measurable business outcomes.';
  const steps = content?.steps || DEFAULT_STEPS;
  const buttonText = content?.startProjectsButton || 'Schedule a Strategy Session';

  return (
    <section className="v2-process-workflow-section" id="working-process">
      {/* Background Ambient Glows */}
      <div className="v2-process-glow glow-top"></div>
      <div className="v2-process-glow glow-bottom"></div>

      <div className="v2-process-container">
        
        {/* HEADER SECTION */}
        <div className="v2-process-header v2-reveal-on-scroll v2-reveal-up">
          <div className="v2-process-badge">
            <span className="v2-process-badge-icon">
              <i className="fas fa-route"></i>
            </span>
            <span className="v2-process-badge-text">{badgeText}</span>
          </div>

          <h2 className="v2-process-heading">
            {headingText}
          </h2>

          <p className="v2-process-paragraph">
            {paragraphText}
          </p>
        </div>

        {/* 5-STEP ARROW WORKFLOW GRID */}
        <div className="v2-workflow-grid">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <React.Fragment key={step.number || index}>
                {/* Step Card */}
                <div 
                  className="v2-workflow-card v2-reveal-on-scroll v2-reveal-up"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {/* Step Top Header: Number & Icon */}
                  <div className="v2-workflow-card-top">
                    <span className="v2-workflow-num-pill">{step.number}</span>
                    <div className="v2-workflow-icon-wrap">
                      <i className={`fas ${step.icon || 'fa-check'}`}></i>
                    </div>
                  </div>

                  {/* Step Body */}
                  <div className="v2-workflow-card-body">
                    <h3 className="v2-workflow-step-title">{step.title}</h3>
                    <p className="v2-workflow-step-desc">{step.description}</p>
                  </div>

                  {/* Mobile Down Arrow indicator */}
                  {!isLast && (
                    <div className="v2-workflow-mobile-arrow">
                      <i className="fas fa-arrow-down"></i>
                    </div>
                  )}
                </div>

                {/* Desktop Connecting Arrow between steps */}
                {!isLast && (
                  <div 
                    className="v2-workflow-connector v2-reveal-on-scroll v2-reveal-scale"
                    style={{ transitionDelay: `${index * 60 + 30}ms` }}
                  >
                    <div className="v2-connector-line"></div>
                    <div className="v2-connector-arrow-head">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* BOTTOM CTA BUTTON */}
        <div className="v2-process-cta-wrap v2-reveal-on-scroll v2-reveal-up">
          <button 
            className="v2-process-btn-primary"
            onClick={() => window.location.href = '/contact'}
          >
            <span>{buttonText}</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>
    </section>
  );
};

export default WorkingProcessV2;

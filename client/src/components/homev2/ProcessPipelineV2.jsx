import React, { useState } from 'react';
import './ProcessPipelineV2.css';

const DEFAULT_STEPS = [
  {
    number: '01',
    badgeNum: '①',
    title: 'Business Discovery',
    description: 'Understand business goals, existing workflows, pain points, and opportunities for digital transformation.',
    icon: 'fa-magnifying-glass-chart'
  },
  {
    number: '02',
    badgeNum: '②',
    title: 'Technology Strategy',
    description: 'Define the optimal AI, cloud, software architecture, and implementation roadmap aligned with business objectives.',
    icon: 'fa-brain'
  },
  {
    number: '03',
    badgeNum: '③',
    title: 'Design & Development',
    description: 'Build secure, scalable, and user-centric applications using modern technologies and agile development practices.',
    icon: 'fa-laptop-code'
  },
  {
    number: '04',
    badgeNum: '④',
    title: 'Deployment',
    description: 'Launch using cloud-native infrastructure with automated testing, CI/CD pipelines, monitoring, and high availability.',
    icon: 'fa-cloud-arrow-up'
  },
  {
    number: '05',
    badgeNum: '⑤',
    title: 'Optimization',
    description: 'Continuously improve performance, security, and user experience using analytics, AI insights, and ongoing enhancements.',
    icon: 'fa-chart-line'
  }
];

const ProcessPipelineV2 = ({ content }) => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const badgeText = content?.badge || 'OUR PROCESS';
  const headingText = content?.title || 'From Strategy to Scalable Technology';
  const paragraphText = content?.description || 'Every successful digital transformation begins with a clear strategy. Our proven methodology aligns business objectives with AI, cloud, and enterprise technologies to deliver scalable, measurable outcomes.';
  const steps = content?.steps || DEFAULT_STEPS;

  return (
    <section className="v2-pipeline-section" id="strategy-to-technology">
      {/* Ambient Glows */}
      <div className="v2-pipeline-glow glow-left"></div>
      <div className="v2-pipeline-glow glow-right"></div>

      <div className="v2-pipeline-container">
        
        {/* HEADER SECTION */}
        <div className="v2-pipeline-header v2-reveal-on-scroll v2-reveal-up">
          <div className="v2-pipeline-badge">
            <span className="v2-pipeline-badge-dot"></span>
            <span className="v2-pipeline-badge-text">{badgeText}</span>
          </div>

          <h2 className="v2-pipeline-heading">
            {headingText}
          </h2>

          <p className="v2-pipeline-paragraph">
            {paragraphText}
          </p>
        </div>

        {/* CONNECTED DIGITAL PIPELINE WORKFLOW */}
        <div className="v2-pipeline-wrapper v2-reveal-on-scroll v2-reveal-up">
          
          {/* Main Horizontal Pipeline Track */}
          <div className="v2-pipeline-track">
            <div className="v2-pipeline-line"></div>
            {/* Moving Light Pulse Particle */}
            <div className="v2-pipeline-pulse"></div>
          </div>

          {/* 5 Milestone Floating Cards */}
          <div className="v2-pipeline-cards">
            {steps.map((step, index) => {
              const isHovered = hoveredStep === index;
              return (
                <div 
                  className={`v2-pipeline-card ${isHovered ? 'is-hovered' : ''}`}
                  key={step.number || index}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {/* Milestone Node Pin on the Pipeline Line */}
                  <div className="v2-pipeline-node-pin">
                    <span className="v2-node-dot"></span>
                  </div>

                  {/* Card Top: Milestone Number & Icon */}
                  <div className="v2-pipeline-card-top">
                    <div className="v2-pipeline-icon-circle">
                      <i className={`fas ${step.icon || 'fa-code'}`}></i>
                    </div>
                    <span className="v2-pipeline-step-badge">{step.badgeNum || step.number}</span>
                  </div>

                  {/* Card Body */}
                  <div className="v2-pipeline-card-body">
                    <h3 className="v2-pipeline-card-title">{step.title}</h3>
                    <p className="v2-pipeline-card-desc">{step.description}</p>
                  </div>

                  {/* Subtle Card Accent Bar */}
                  <div className="v2-pipeline-card-glow"></div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessPipelineV2;

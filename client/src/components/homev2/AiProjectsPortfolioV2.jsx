import React, { useRef, useState, useEffect } from 'react';
import './AiProjectsPortfolioV2.css';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    tag: "Agentic AI",
    title: "Agentic AI Solutions",
    description: "Autonomous agents that plan, reason, and execute multi-step workflows.",
    image: "/images/homev2/card_agentic_ai.png",
    gradientClass: "gradient-teal-cyan",
    accentColor: "#0ea5e9"
  },
  {
    id: 2,
    tag: "AI Agents",
    title: "Autonomous AI Agents",
    description: "Independent task execution with continuous learning & adaptation.",
    image: "/images/homev2/card_autonomous_agents.png",
    gradientClass: "gradient-purple-blue",
    accentColor: "#8b5cf6"
  },
  {
    id: 3,
    tag: "Automation",
    title: "AI Workflow Automation",
    description: "Streamlined end-to-end enterprise operations reducing manual overhead.",
    image: "/images/homev2/card_workflow_automation.png",
    gradientClass: "gradient-emerald-cyan",
    accentColor: "#10b981"
  },
  {
    id: 4,
    tag: "Integration",
    title: "AI Integration Services",
    description: "Seamless embedding of LLMs and foundation models into core business apps.",
    image: "/images/homev2/card_ai_integration.png",
    gradientClass: "gradient-indigo-violet",
    accentColor: "#6366f1"
  },
  {
    id: 5,
    tag: "Software Dev",
    title: "AI Software Development",
    description: "Bespoke enterprise software powered by built-in artificial intelligence.",
    image: "/images/homev2/card_software_dev.png",
    gradientClass: "gradient-cyan-purple",
    accentColor: "#06b6d4"
  },
  {
    id: 6,
    tag: "Machine Learning",
    title: "Machine Learning Solutions",
    description: "Predictive analytics, NLP, and computer vision tailored to domain data.",
    image: "/images/homev2/card_machine_learning.png",
    gradientClass: "gradient-blue-violet",
    accentColor: "#3b82f6"
  },
  {
    id: 7,
    tag: "AI Strategy",
    title: "AI Business Solutions",
    description: "Data-backed strategies driving measurable business growth and ROI.",
    image: "/images/homev2/card_business_solutions.png",
    gradientClass: "gradient-teal-cyan",
    accentColor: "#0ea5e9"
  },
  {
    id: 8,
    tag: "Cognitive Bots",
    title: "Intelligent Automation",
    description: "Cognitive bots handling high-frequency tasks with high precision.",
    image: "/images/homev2/card_intelligent_automation.png",
    gradientClass: "gradient-purple-blue",
    accentColor: "#8b5cf6"
  },
  {
    id: 9,
    tag: "Development",
    title: "AI Agent Development",
    description: "Custom multi-agent architectures built for complex enterprise domains.",
    image: "/images/homev2/card_agent_dev.png",
    gradientClass: "gradient-emerald-cyan",
    accentColor: "#10b981"
  },
  {
    id: 10,
    tag: "Transformation",
    title: "AI Digital Transformation",
    description: "Modernizing legacy architectures with AI-first cloud infrastructure.",
    image: "/images/homev2/card_digital_transform.png",
    gradientClass: "gradient-indigo-violet",
    accentColor: "#6366f1"
  }
];

const AiProjectsPortfolioV2 = ({ content }) => {
  const baseProjects = content?.items || DEFAULT_PROJECTS;
  const cardsCount = baseProjects.length;

  // Tripled array for infinite seamless looping [Set 1, Set 2, Set 3]
  const extendedProjects = [...baseProjects, ...baseProjects, ...baseProjects];

  // Start at middle group index (10)
  const [currentIndex, setCurrentIndex] = useState(cardsCount);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const trackRef = useRef(null);
  const [stepWidth, setStepWidth] = useState(338);

  // Measure card width + gap for smooth sliding
  const updateStepWidth = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const firstChild = trackRef.current.children[0];
      const gap = 28;
      setStepWidth(firstChild.offsetWidth + gap);
    }
  };

  useEffect(() => {
    updateStepWidth();
    window.addEventListener('resize', updateStepWidth);
    return () => window.removeEventListener('resize', updateStepWidth);
  }, []);

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless boundary wrap when passing set limits
  useEffect(() => {
    if (currentIndex >= cardsCount * 2) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(cardsCount);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentIndex < cardsCount) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(cardsCount * 2 - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, cardsCount]);

  // Autoplay slide right-to-left every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, cardsCount]);

  // Progress percentage calculation
  const rawIndexInSet = ((currentIndex - cardsCount) % cardsCount + cardsCount) % cardsCount;
  const progressPercentage = ((rawIndexInSet + 1) / cardsCount) * 100;

  return (
    <section className="portfolio-v2-section" id="ai-projects-portfolio">
      <div className="portfolio-v2-container">
        
        {/* LARGE FLOATING CARD CONTAINER */}
        <div className="portfolio-floating-card">
          {/* Subtle Premium Top Ambient Glows */}
          <div className="portfolio-card-ambient-glow glow-top-left" aria-hidden="true"></div>
          <div className="portfolio-card-ambient-glow glow-top-right" aria-hidden="true"></div>
          <div className="portfolio-card-ambient-glow glow-top-center" aria-hidden="true"></div>

          {/* SECTION HEADER */}
          <div className="portfolio-v2-header">
            <div className="portfolio-v2-header-left">
              <span className="portfolio-category-eyebrow">OUR AI EXPERTISE</span>
              <h2 className="portfolio-v2-headline">
                AI Solutions Built for Real Business Outcomes
              </h2>
            </div>

            {/* STAT ACCENT COUNTER */}
            <div className="portfolio-v2-stat-wrap">
              <div className="portfolio-stat-card">
                <span className="portfolio-stat-stroke-num">100+</span>
                <div className="portfolio-stat-label-col">
                  <span className="portfolio-stat-vertical-text">Clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* INFINITE SLIDING CAROUSEL */}
          <div className="portfolio-slider-wrapper">
            <div
              className={`portfolio-slider-track ${withTransition ? 'transition-enabled' : ''}`}
              ref={trackRef}
              style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {extendedProjects.map((project, idx) => {
                const isHovered = hoveredCardId === `${project.id}-${idx}`;
                return (
                  <div
                    key={`${project.id}-${idx}`}
                    className={`portfolio-card ${project.gradientClass || ''} ${isHovered ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredCardId(`${project.id}-${idx}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                  >
                    {/* Realistic Corporate Image Background Layer */}
                    {project.image && (
                      <div className="portfolio-card-photo-wrap">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="portfolio-card-photo"
                        />
                      </div>
                    )}

                    {/* Dark Vignette Overlay for Text Legibility */}
                    <div className="portfolio-card-vignette"></div>

                    {/* Dark Charcoal Card Fallback Base */}
                    <div className="portfolio-card-charcoal-base"></div>

                    {/* Card Header Pill Tag */}
                    <div className="portfolio-card-top">
                      <span className="portfolio-tag-pill">{project.tag}</span>
                    </div>

                    {/* Card Bottom Content */}
                    <div className="portfolio-card-bottom">
                      <h3 className="portfolio-card-title">{project.title}</h3>
                      <p className="portfolio-card-desc">{project.description}</p>
                      
                      <div className="portfolio-card-action">
                        <a
                          href="/contact"
                          className="portfolio-explore-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = '/contact';
                          }}
                        >
                          Explore more <span className="arrow-icon">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM CONTROLS & NAVIGATION ROW */}
          <div className="portfolio-v2-controls-row">
            
            {/* CAROUSEL PROGRESS & NAV ARROWS */}
            <div className="portfolio-controls-left">
              <div className="portfolio-nav-arrows">
                <button
                  className="portfolio-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous Project"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="portfolio-nav-btn"
                  onClick={handleNext}
                  aria-label="Next Project"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              {/* PROGRESS TRACK */}
              <div className="portfolio-progress-container">
                <div className="portfolio-progress-track">
                  <div
                    className="portfolio-progress-bar"
                    style={{ width: `${Math.max(10, progressPercentage)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* EXPLORE AI SOLUTIONS CTA BUTTON */}
            <div className="portfolio-explore-cta-wrap">
              <a
                href="/contact"
                className="portfolio-explore-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/contact';
                }}
              >
                <span>Explore AI Solutions</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AiProjectsPortfolioV2;

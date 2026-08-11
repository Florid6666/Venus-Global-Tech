import React, { useRef, useState, useEffect } from 'react';
import './RecentAchievementsV2.css';

const DEFAULT_PROJECTS = [
  {
    id: "1",
    title: "App Virtual Reality",
    image: "/images/homev2/project_vr_app.png"
  },
  {
    id: "2",
    title: "Analysis of Security",
    image: "/images/homev2/project_security_analysis.png"
  },
  {
    id: "3",
    title: "Social Marketing",
    image: "/images/homev2/project_social_marketing.png"
  },
  {
    id: "4",
    title: "Basics Project",
    image: "/images/homev2/project_basics_project.png"
  },
  {
    id: "5",
    title: "Ecommerce Website",
    image: "/images/homev2/project_ecommerce_website.png"
  },
  {
    id: "6",
    title: "Social Media App",
    image: "/images/homev2/project_social_media_app.png"
  }
];

const RecentAchievementsV2 = ({ content }) => {
  const projects = content?.items || DEFAULT_PROJECTS;
  const cardsCount = projects.length;

  // Tripled array for infinite seamless looping
  const extendedProjects = [...projects, ...projects, ...projects];

  const [currentIndex, setCurrentIndex] = useState(cardsCount);
  const [withTransition, setWithTransition] = useState(true);

  // Mouse & Touch Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Custom Cursor Handle Position
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, show: false });

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [stepWidth, setStepWidth] = useState(304);

  // Measure single card step width (width + gap)
  const updateStepWidth = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const firstCard = trackRef.current.children[0];
      const gap = 24;
      setStepWidth(firstCard.offsetWidth + gap);
    }
  };

  useEffect(() => {
    updateStepWidth();
    window.addEventListener('resize', updateStepWidth);
    return () => window.removeEventListener('resize', updateStepWidth);
  }, []);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Loop back seamlessly when reaching boundaries
  const handleTransitionEnd = () => {
    if (currentIndex >= cardsCount * 2) {
      setWithTransition(false);
      setCurrentIndex(currentIndex - cardsCount);
    } else if (currentIndex < cardsCount) {
      setWithTransition(false);
      setCurrentIndex(currentIndex + cardsCount);
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setWithTransition(false);
  };

  const handleMouseMove = (e) => {
    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        show: true
      });
    }

    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setWithTransition(true);

    if (dragOffset < -50) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > 50) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setCursorPos((prev) => ({ ...prev, show: false }));
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setWithTransition(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const transformX = -(currentIndex * stepWidth) + dragOffset;

  return (
    <section className="achievements-v2-section" id="recent-achievements">
      <div className="achievements-v2-container">

        {/* HEADER ARCHITECTURE */}
        <div className="achievements-v2-header-grid v2-reveal-on-scroll v2-reveal-up">
          <div className="achievements-v2-title-col">
            <div className="achievements-v2-badge-row">
              <span className="achievements-v2-accent-bar" />
              <span className="achievements-v2-badge-text">OUR PROJECTS LIST</span>
            </div>
            <h2 className="achievements-v2-heading">
              Recent achievements in IT solutions
            </h2>
          </div>

          <div className="achievements-v2-subtext-col">
            <p className="achievements-v2-paragraph">
              When your audience visits your website, it gives them their first impression of your business. They will judge your business within seconds in these first few seconds
            </p>
          </div>
        </div>

        {/* CAROUSEL SLIDER VIEWPORT */}
        <div
          className={`achievements-v2-slider-viewport ${isDragging ? 'is-dragging' : ''}`}
          ref={viewportRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* FLOATING CUSTOM CURSOR HANDLE (< | >) */}
          <div
            className={`achievements-v2-cursor-handle ${cursorPos.show ? 'is-visible' : ''}`}
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`
            }}
          >
            <button
              className="achievements-v2-cursor-btn"
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="achievements-v2-cursor-divider" />
            <button
              className="achievements-v2-cursor-btn"
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* SLIDER TRACK */}
          <div
            className={`achievements-v2-slider-track ${withTransition ? 'transition-enabled' : ''}`}
            ref={trackRef}
            style={{ transform: `translateX(${transformX}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedProjects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="achievements-v2-card">
                
                {/* Full-bleed Portrait Image */}
                <div className="achievements-v2-card-image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="achievements-v2-card-img"
                  />
                </div>

                {/* Vivid Cobalt Blue Tint Overlay on Hover */}
                <div className="achievements-v2-card-overlay" />

                {/* Bottom Center White Rectangular Title Badge */}
                <div className="achievements-v2-title-badge">
                  <h3 className="achievements-v2-badge-title-text">{project.title}</h3>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default RecentAchievementsV2;

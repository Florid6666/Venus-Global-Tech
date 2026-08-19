import React, { useRef, useState, useEffect, useCallback } from 'react';
import './IndustriesV2.css';

const DEFAULT_INDUSTRIES = [
  {
    id: '01',
    title: 'Aerospace',
    description: 'Cleared, certified, and compliance-ready aerospace design engineers, avionics, and flight systems talent.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '02',
    title: 'AutoTech',
    description: 'Bridging software innovation with automotive hardware to build the connected vehicles of tomorrow.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '03',
    title: 'Customer Service & Tech Support',
    description: 'Tier 1-3 support specialists and customer success directors focused on retention and satisfaction.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '04',
    title: 'C-Suite & Executive',
    description: 'Retained and confidential executive search for visionary CEOs, CTOs, CFOs, and Board Directors.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '05',
    title: 'Clinical Research',
    description: 'Pharma, biotech, and clinical trial managers ensuring regulatory compliance and trial excellence.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '06',
    title: 'E-commerce & Supply Chain',
    description: 'End-to-end logistics, warehouse automation, and omnichannel fulfillment operational experts.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '07',
    title: 'Manufacturing & Skilled Trade',
    description: 'Skilled tradespeople, millwrights, CNC programmers, and industrial plant operations leaders.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '08',
    title: 'Financial Services & Fintech',
    description: 'FinTech platforms, AI-powered risk analysis, automated fraud detection, and regulatory compliance.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '09',
    title: 'Healthcare & Life Sciences',
    description: 'Digital healthcare platforms, AI diagnostics, patient engagement, and HIPAA-compliant workflow automation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  },
  {
    id: '10',
    title: 'Energy & CleanTech',
    description: 'IoT monitoring, predictive grid maintenance, sustainability analytics, and smart infrastructure.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    link: '/services'
  }
];

const IndustriesV2 = ({ content }) => {
  const badgeText = content?.badge || 'INDUSTRIES WE EMPOWER';
  const headingText = content?.title || 'Technology Solutions Built for Every Industry';
  const rawItems = content?.items || DEFAULT_INDUSTRIES;
  
  const baseIndustries = rawItems.map((item, idx) => ({
    ...item,
    displayNum: item.id || String(idx + 1).padStart(2, '0')
  }));
  const cardsCount = baseIndustries.length;

  // Tripled array for seamless infinite looping [Set 1, Set 2, Set 3]
  const extendedIndustries = [...baseIndustries, ...baseIndustries, ...baseIndustries];

  // Start at middle group index (cardsCount)
  const [currentIndex, setCurrentIndex] = useState(cardsCount);
  const [withTransition, setWithTransition] = useState(true);

  // Mouse & Touch Drag Gesture Support state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const trackRef = useRef(null);
  const sliderWindowRef = useRef(null);
  const [stepWidth, setStepWidth] = useState(304);

  // Measure single step width (card width + gap)
  const updateLayout = useCallback(() => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const firstChild = trackRef.current.children[0];
      const cardWidth = firstChild.offsetWidth;
      if (cardWidth > 0) {
        // Read CSS gap or fallback to 24
        const style = window.getComputedStyle(trackRef.current);
        const gapStr = style.gap || style.columnGap || '24px';
        const gap = parseFloat(gapStr) || 24;
        setStepWidth(cardWidth + gap);
      }
    }
  }, []);

  // Update layout on mount, resize, and when baseIndustries change
  useEffect(() => {
    updateLayout();
    
    // Use ResizeObserver for responsive layout updates
    let observer;
    if (window.ResizeObserver && sliderWindowRef.current) {
      observer = new ResizeObserver(() => {
        updateLayout();
      });
      observer.observe(sliderWindowRef.current);
    }
    
    window.addEventListener('resize', updateLayout);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateLayout);
    };
  }, [baseIndustries.length, updateLayout]);

  // Re-enable transition after boundary snap
  useEffect(() => {
    if (!withTransition) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setWithTransition(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [withTransition]);

  // Navigation Handlers with safety bounds against hyper-fast clicking
  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => {
      if (prev >= cardsCount * 3 - 1) {
        return cardsCount; // Reset to middle set
      }
      return prev + 1;
    });
  }, [cardsCount]);

  const handlePrev = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return cardsCount * 2 - 1; // Reset to middle set
      }
      return prev - 1;
    });
  }, [cardsCount]);

  // Seamless jump on transition completion
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;

    if (currentIndex >= cardsCount * 2) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev - cardsCount);
    } else if (currentIndex < cardsCount) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev + cardsCount);
    }
  };

  // Autoplay functionality (slides every 1.5s)
  useEffect(() => {
    if (isDragging || cardsCount <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 1500);
    return () => clearInterval(interval);
  }, [handleNext, isDragging, cardsCount]);

  // Mouse & Touch Drag Gesture Support

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setHasDragged(false);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    setDragOffset(delta);
    if (Math.abs(delta) > 8) {
      setHasDragged(true);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <section className="industries-serve-section" id="industries-we-serve">
      {/* Diagonal Ambient Light Glows */}
      <div className="industries-ambient-glow glow-diagonal-left" aria-hidden="true"></div>
      <div className="industries-ambient-glow glow-diagonal-right" aria-hidden="true"></div>

      <div className="industries-serve-container">
        
        {/* HEADER SECTION */}
        <div className="industries-serve-header">
          <div className="industries-serve-header-left">
            <span className="industries-category-eyebrow">{badgeText}</span>
            <h2 className="industries-serve-title">{headingText}</h2>
          </div>

          {/* CAROUSEL NAVIGATION CONTROLS */}
          <div className="industries-nav-controls">
            <button
              className="industries-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Industry"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="industries-nav-btn"
              onClick={handleNext}
              aria-label="Next Industry"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* CAROUSEL WINDOW & TRACK */}
        <div 
          className="industries-slider-window"
          ref={sliderWindowRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div
            className={`industries-slider-track ${withTransition && !isDragging ? 'transition-enabled' : ''}`}
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{ 
              transform: `translateX(${-currentIndex * stepWidth + (isDragging ? dragOffset : 0)}px)` 
            }}
          >
            {extendedIndustries.map((item, idx) => (
              <div
                key={`${item.id || item.title}-${idx}`}
                className="industries-card"
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  window.location.href = item.link || '/services';
                }}
              >
                {/* 1. Top Image Container */}
                <div className="industries-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="industries-card-img"
                    loading="lazy"
                    onLoad={updateLayout}
                    draggable="false"
                  />
                  <div className="industries-card-badge">
                    {item.displayNum}
                  </div>
                </div>

                {/* 2. Card Content Block */}
                <div className="industries-card-content">
                  <h3 className="industries-card-title">{item.title}</h3>
                  <p className="industries-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default IndustriesV2;


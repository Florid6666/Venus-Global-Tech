import React, { useRef, useState, useEffect } from 'react';
import './IndustriesV2.css';

const DEFAULT_INDUSTRIES = [
  {
    id: '01',
    title: 'Aerospace',
    description: 'Cleared, certified, and compliance-ready aerospace design engineers, avionics, and flight systems talent.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '02',
    title: 'AutoTech',
    description: 'Bridging software innovation with automotive hardware to build the connected vehicles of tomorrow.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '03',
    title: 'Customer Service & Tech Support',
    description: 'Tier 1-3 support specialists and customer success directors focused on retention and satisfaction.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '04',
    title: 'C-Suite & Executive',
    description: 'Retained and confidential executive search for visionary CEOs, CTOs, CFOs, and Board Directors.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '05',
    title: 'Clinical Research',
    description: 'Pharma, biotech, and clinical trial managers ensuring regulatory compliance and trial excellence.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '06',
    title: 'E-commerce & Supply Chain',
    description: 'End-to-end logistics, warehouse automation, and omnichannel fulfillment operational experts.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '07',
    title: 'Manufacturing & Skilled Trade',
    description: 'Skilled tradespeople, millwrights, CNC programmers, and industrial plant operations leaders.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '08',
    title: 'Financial Services & Fintech',
    description: 'FinTech platforms, AI-powered risk analysis, automated fraud detection, and regulatory compliance.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '09',
    title: 'Healthcare & Life Sciences',
    description: 'Digital healthcare platforms, AI diagnostics, patient engagement, and HIPAA-compliant workflow automation.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    title: 'Energy & CleanTech',
    description: 'IoT monitoring, predictive grid maintenance, sustainability analytics, and smart infrastructure.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
  }
];

const IndustriesV2 = ({ content }) => {
  const headingText = content?.title || 'Industries We Serve';
  const rawItems = content?.items || DEFAULT_INDUSTRIES;
  
  const baseIndustries = rawItems.map((item, idx) => ({
    ...item,
    displayNum: item.id || String(idx + 1).padStart(2, '0')
  }));
  const cardsCount = baseIndustries.length;

  // Tripled array for infinite seamless looping [Set 1, Set 2, Set 3]
  const extendedIndustries = [...baseIndustries, ...baseIndustries, ...baseIndustries];

  // Start at middle group index (10)
  const [currentIndex, setCurrentIndex] = useState(cardsCount);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);
  const [stepWidth, setStepWidth] = useState(320);

  // Measure card width + gap for smooth sliding
  const updateLayout = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const firstChild = trackRef.current.children[0];
      const gap = 24; // 1.5rem
      setStepWidth(firstChild.offsetWidth + gap);
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
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

  // Autoplay slide right-to-left every 2.2 seconds (short time duration)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2200);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, cardsCount]);

  return (
    <section className="industries-serve-section" id="industries-we-serve">
      {/* Diagonal Ambient Light Glows (Top-Left & Bottom-Right) */}
      <div className="industries-ambient-glow glow-diagonal-left" aria-hidden="true"></div>
      <div className="industries-ambient-glow glow-diagonal-right" aria-hidden="true"></div>

      <div className="industries-serve-container">
        
        {/* A. HEADER SECTION */}
        <div className="industries-serve-header">
          <div className="industries-serve-header-left">
            <span className="industries-category-eyebrow">INDUSTRIES</span>
            <h2 className="industries-serve-title">
              Technology Solutions Built<br className="desktop-br" /> for Every Industry
            </h2>
          </div>

          {/* TOP CAROUSEL NAVIGATION CONTROLS */}
          <div className="industries-nav-controls">
            <button
              className="industries-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Industries"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="industries-nav-btn"
              onClick={handleNext}
              aria-label="Next Industries"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* B. CAROUSEL CARD STRUCTURE */}
        <div className="industries-slider-window">
          <div
            className={`industries-slider-track ${withTransition ? 'transition-enabled' : ''}`}
            ref={trackRef}
            style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {extendedIndustries.map((item, idx) => (
              <div
                key={`${item.id || item.title}-${idx}`}
                className="industries-card"
                onClick={() => {
                  window.location.href = '/services';
                }}
              >
                {/* 1. Top Image Container */}
                <div className="industries-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="industries-card-img"
                    loading="lazy"
                  />
                  {/* Numbered Badge (Top Right of Image) */}
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

import React, { useState, useEffect } from 'react';

/**
 * WhyChooseUsSection Component
 * 
 * Standalone React Component for "Building Intelligent Technology for Modern Businesses".
 * Smooth sliding carousel track where EXACTLY 3 cards appear on screen at a time,
 * prominent SVG arrow buttons, infinite looping, centered 52px numbers with blue hover transition.
 *
 * @param {string} [props.eyebrow] - Section eyebrow text.
 * @param {string} [props.title] - Section heading title.
 * @param {string} [props.subtitle] - Section descriptive paragraph.
 * @param {Array<{number: string, title: string, description: string}>} [props.features] - Feature cards list.
 */
const DEFAULT_5_CARDS = [
  {
    number: '01',
    title: 'AI-First Development',
    description: 'Custom machine learning models, generative AI, and intelligent automation engineered to scale enterprise workflows effortlessly.'
  },
  {
    number: '02',
    title: 'Enterprise-Grade Engineering',
    description: 'Robust, high-performance architecture built for mission-critical software, high concurrency, and zero downtime.'
  },
  {
    number: '03',
    title: 'Cloud-Native Solutions',
    description: 'Scalable multi-cloud infrastructure designed for maximum uptime, seamless migration, and optimized cost efficiency.'
  },
  {
    number: '04',
    title: 'Agile & Rapid Delivery',
    description: 'Accelerated development cycles powered by continuous integration, rapid prototyping, and transparent communication.'
  },
  {
    number: '05',
    title: 'Security & Compliance',
    description: 'End-to-end data encryption, strict SOC2 & GDPR compliance standards, and proactive threat protection built in from day one.'
  }
];

const WhyChooseUsSection = ({
  eyebrow = '[ WHY CHOOSE VENUS GLOBAL TECHNOLOGY ]',
  title = 'Building Intelligent Technology for Modern Businesses',
  subtitle = 'We partner with ambitious enterprises to engineer high-impact AI solutions, resilient cloud platforms, and modern enterprise software. From digital transformation to business automation, our battle-tested engineering powers sustainable growth and technical excellence.',
  features
}) => {
  const baseCards = features && features.length >= 5 ? features : DEFAULT_5_CARDS;
  const cardsCount = baseCards.length;
  
  // Extended array for seamless infinite looping: [Set 1, Set 2, Set 3]
  const extendedCards = [...baseCards, ...baseCards, ...baseCards];
  
  // Start at index of middle group (index 5)
  const [currentIndex, setCurrentIndex] = useState(cardsCount);
  const [withTransition, setWithTransition] = useState(true);

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless infinite loop reset when passing boundaries
  useEffect(() => {
    if (currentIndex >= cardsCount * 2) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(cardsCount);
      }, 450);
      return () => clearTimeout(timer);
    } else if (currentIndex < cardsCount) {
      const timer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(cardsCount * 2 - 1);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, cardsCount]);

  return (
    <section className="why-choose-v2-container" id="why-choose-us">
      {/* Embedded CSS Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        .why-choose-v2-container {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          width: 100%;
          padding: 100px 32px 120px 32px;
          background-color: #ffffff;
          box-sizing: border-box;
          color: #0f172a;
          overflow: hidden;
        }

        .why-choose-v2-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }

        /* HEADER BLOCK */
        .why-header-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: flex-end;
        }

        .why-header-left {
          max-width: 820px;
        }

        .why-eyebrow-tag {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .why-title {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 20px 0;
          letter-spacing: -0.03em;
        }

        .why-subtitle {
          font-size: 16.5px;
          line-height: 1.65;
          color: #64748b;
          margin: 0;
        }

        /* PROMINENT ARROW BUTTONS */
        .why-nav-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .why-nav-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05);
        }

        .why-nav-btn:hover {
          border-color: #2563eb;
          background-color: #2563eb;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
        }

        .why-nav-btn:active {
          transform: translateY(0);
        }

        /* CAROUSEL WINDOW & SLIDING TRACK */
        .why-carousel-window {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 10px 0 20px 0;
        }

        .why-carousel-track {
          display: flex;
          gap: 28px;
          width: 100%;
          will-change: transform;
        }

        .why-carousel-track.transition-enabled {
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* CARD STYLE - EXACTLY 3 CARDS FIT IN THE WINDOW AT A TIME */
        .why-card {
          flex: 0 0 calc((100% - 56px) / 3);
          width: calc((100% - 56px) / 3);
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 36px;
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
          box-sizing: border-box;
          min-height: 190px;
        }

        .why-card:hover {
          border-color: #93c5fd;
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -10px rgba(37, 99, 235, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04);
        }

        /* Large Card Number - Rotated & Centered, Turns Blue Smoothly on Hover */
        .why-card-number {
          font-size: 52px;
          font-weight: 800;
          color: #cbd5e1;
          line-height: 1;
          user-select: none;
          flex-shrink: 0;
          transform: rotate(-90deg);
          transition: color 0.35s ease, transform 0.35s ease;
        }

        .why-card:hover .why-card-number {
          color: #2563eb;
        }

        .why-card-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .why-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .why-card-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .why-card {
            flex: 0 0 calc((100% - 28px) / 2);
            width: calc((100% - 28px) / 2);
          }
          
          .why-title {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .why-header-top {
            grid-template-columns: 1fr;
          }
          
          .why-nav-controls {
            justify-content: flex-end;
          }
          
          .why-choose-v2-container {
            padding: 60px 16px;
          }
          
          .why-title {
            font-size: 28px;
          }
          
          .why-card {
            flex: 0 0 100%;
            width: 100%;
            padding: 32px 24px;
          }

          .why-card-number {
            font-size: 42px;
          }
        }
      `}</style>

      <div className="why-choose-v2-inner">
        {/* HEADER BLOCK */}
        <div className="why-header-top">
          <div className="why-header-left">
            <span className="why-eyebrow-tag">{eyebrow}</span>
            <h2 className="why-title">{title}</h2>
            <p className="why-subtitle">{subtitle}</p>
          </div>

          {/* PROMINENT ARROW CONTROLS */}
          <div className="why-nav-controls">
            <button
              className="why-nav-btn"
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button
              className="why-nav-btn"
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* SLIDESHOW CAROUSEL WINDOW & SLIDING TRACK */}
        <div className="why-carousel-window">
          <div
            className={`why-carousel-track ${withTransition ? 'transition-enabled' : ''}`}
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% / 3 + 28px / 3)))`
            }}
          >
            {extendedCards.map((item, idx) => (
              <div key={idx} className="why-card">
                <div className="why-card-number">{item.number}</div>
                <div className="why-card-content">
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

import React from 'react';
import ImageTrail from './ImageTrail';
import RichText from './RichText';
import './animated-hero.css';

const AnimatedHero = ({ content }) => {
  if (!content) {
    return <section className="animated-hero" />;
  }

  const heroContent = content;
  const trailImages = heroContent.trailImages || [];
  const backgroundWords = heroContent.backgroundWords || [];
  // Repeat the trail images so the mouse-trail effect has enough frames to
  // cycle through regardless of how many images the CMS provides.
  const trailItems = [...trailImages, ...trailImages, ...trailImages];

  return (
    <section className="animated-hero">
      {/* Image Trail Effect */}
      <ImageTrail
        items={trailItems}
        variant={1}
      />

      {/* Animated Background Text Layers */}
      <div className="hero-background-text">
        {/* Layer 1: Moving left to right */}
        <div className="text-layer layer-1">
          <div className="text-scroll scroll-left">
            {backgroundWords.map((word, i) => (
              <span key={`l1-${i}`} className="bg-word">{word}</span>
            ))}
            {backgroundWords.map((word, i) => (
              <span key={`l1-dup-${i}`} className="bg-word">{word}</span>
            ))}
          </div>
        </div>

        {/* Layer 2: Moving right to left */}
        <div className="text-layer layer-2">
          <div className="text-scroll scroll-right">
            {backgroundWords.map((word, i) => (
              <span key={`l2-${i}`} className="bg-word">{word}</span>
            ))}
            {backgroundWords.map((word, i) => (
              <span key={`l2-dup-${i}`} className="bg-word">{word}</span>
            ))}
          </div>
        </div>

        {/* Layer 3: Moving left to right */}
        <div className="text-layer layer-3">
          <div className="text-scroll scroll-left">
            {backgroundWords.map((word, i) => (
              <span key={`l3-${i}`} className="bg-word">{word}</span>
            ))}
            {backgroundWords.map((word, i) => (
              <span key={`l3-dup-${i}`} className="bg-word">{word}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="animated-hero-container">
        <div className="animated-hero-content">
          <div className="animated-hero-badge">
            <RichText html={heroContent.badge} as="span" />
          </div>
          
          <h1 className="animated-hero-title">
            <span className="title-line">{heroContent.titleLine1}</span>
            <span className="title-line highlight">{heroContent.titleLine2}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;

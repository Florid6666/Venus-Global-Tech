import React, { useState } from 'react';

// Simple prev/next image slideshow used for the "Image Slideshow" content block.
const ImageSlideshow = ({ images }) => {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="image-slideshow">
      <div className="image-slideshow-viewport">
        <img src={images[index]} alt={`Slide ${index + 1} of ${images.length}`} />
        {images.length > 1 && (
          <>
            <button type="button" className="slideshow-arrow slideshow-prev" onClick={prev} aria-label="Previous image">‹</button>
            <button type="button" className="slideshow-arrow slideshow-next" onClick={next} aria-label="Next image">›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="image-slideshow-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`slideshow-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlideshow;

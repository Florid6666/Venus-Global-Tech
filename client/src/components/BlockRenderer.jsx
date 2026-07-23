import React from 'react';
import RichText from './RichText';
import VideoEmbed from './VideoEmbed';
import ImageSlideshow from './ImageSlideshow';
import { headingId } from '../utils/slugify';
import { stripHtml } from '../utils/stripHtml';

// Renders a blog post body authored as a list of content blocks (the
// WordPress-style block builder in the admin panel). Used both for the
// live preview in Admin.jsx and the actual public BlogDetail page, so the
// two always match exactly.
const BlockRenderer = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'legacy':
            return <RichText key={index} html={block.html} />;
          case 'heading': {
            const Tag = block.level === 3 ? 'h3' : 'h2';
            return (
              <RichText
                key={index}
                html={block.text}
                as={Tag}
                id={headingId(stripHtml(block.text), index)}
                className="content-heading"
              />
            );
          }
          case 'paragraph':
            return <RichText key={index} html={block.html} />;
          case 'image':
            return (
              <figure key={index} className={`content-image${block.fit === 'contain' ? ' fit-contain' : ''}`}>
                <img src={block.url} alt={block.caption || ''} />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul';
            return (
              <ListTag key={index}>
                {(block.items || []).map((item, i) => <li key={i}>{item}</li>)}
              </ListTag>
            );
          }
          case 'video':
            return <VideoEmbed key={index} url={block.url} />;
          case 'link':
            return (
              <p key={index}>
                <a href={block.url} target="_blank" rel="noopener noreferrer">{block.text || block.url}</a>
              </p>
            );
          case 'slideshow':
            return <ImageSlideshow key={index} images={block.images} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlockRenderer;

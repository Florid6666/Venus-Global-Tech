import React from 'react';
import { headingId } from '../utils/slugify';

// Built entirely from the heading blocks a post actually uses — no separate
// "table of contents" field to keep in sync in the admin panel. Ids here
// must match what BlockRenderer assigns to the same heading (see headingId).
const TableOfContents = ({ blocks }) => {
  const headings = (blocks || [])
    .map((block, index) => ({ ...block, index }))
    .filter((block) => block.type === 'heading' && block.text);

  if (headings.length < 2) return null;

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <h2 className="blog-toc-title">Table of Contents</h2>
      <ol className="blog-toc-list">
        {headings.map((block) => (
          <li key={block.index} className={block.level === 3 ? 'blog-toc-item sub' : 'blog-toc-item'}>
            <a href={`#${headingId(block.text, block.index)}`}>{block.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;

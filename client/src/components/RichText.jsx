import React from 'react';
import DOMPurify from 'dompurify';

// Tags whose content model can't legally contain a block-level <p> (heading
// and inline/phrasing contexts). CKEditor always wraps even single-line text
// in a <p>, so when rendering into one of these, unwrap that single
// enclosing paragraph first to avoid producing invalid nested HTML (which
// browsers silently mangle, e.g. dropping the wrapper's own class).
const BLOCK_INCOMPATIBLE_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li']);

const unwrapSingleParagraph = (html) => {
  const match = html.match(/^<p>([\s\S]*)<\/p>$/);
  return match ? match[1] : html;
};

// Renders CMS content that was authored as rich text (HTML) in the admin panel.
// Content is sanitized server-side on save; DOMPurify here is a second layer of
// defense in case older/unsanitized data is still present.
const RichText = ({ html, as: Tag = 'div', className }) => {
  if (!html) return null;
  let sanitized = DOMPurify.sanitize(html);
  if (BLOCK_INCOMPATIBLE_TAGS.has(Tag)) {
    sanitized = unwrapSingleParagraph(sanitized);
  }
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default RichText;

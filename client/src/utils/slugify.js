// Shared by BlockRenderer (sets heading ids) and TableOfContents (links to
// them), so anchor hrefs always match the ids actually rendered on the page.
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Headings can repeat text ("Conclusion" on two different posts isn't an
// issue, but two same-page headings would collide) — suffixing with the
// block's index guarantees a unique, stable id.
export const headingId = (text, index) => `${slugify(text) || 'section'}-${index}`;

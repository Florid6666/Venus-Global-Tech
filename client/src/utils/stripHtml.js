// Rich text fields (title, excerpt, blog content, etc.) are stored as HTML
// from CKEditor. Use this wherever the plain-text value is needed instead —
// slugs, search matching, share text, alt attributes, truncated previews.
export function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

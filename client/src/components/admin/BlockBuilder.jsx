import React from 'react';
import RichText from '../RichText';
import RichTextEditor from './RichTextEditor';
import ImageField from './ImageField';
import StringArrayEditor from './StringArrayEditor';
import ImageArrayEditor from './ImageArrayEditor';

const BLOCK_TEMPLATES = {
  heading: { type: 'heading', level: 2, text: '' },
  paragraph: { type: 'paragraph', html: '' },
  image: { type: 'image', url: '', caption: '', fit: 'cover' },
  list: { type: 'list', ordered: false, items: [''] },
  video: { type: 'video', url: '' },
  link: { type: 'link', url: '', text: '' },
  slideshow: { type: 'slideshow', images: [''] },
};

const BLOCK_LABELS = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  image: 'Image',
  list: 'List',
  video: 'Video',
  link: 'Link',
  slideshow: 'Image Slideshow',
  legacy: 'Legacy Content',
};

// WordPress-style block builder used for a blog post's body: a flat list of
// typed blocks (heading/paragraph/image/list/video/link/slideshow), each
// with its own small editor, that can be added, removed, and reordered.
// "legacy" blocks hold the raw HTML of posts written before this builder
// existed — they're shown read-only so nothing is lost, and can be deleted
// once their content has been recreated as real blocks.
const BlockBuilder = ({ blocks, onChange, token }) => {
  const list = blocks || [];

  const addBlock = (type) => onChange([...list, { ...BLOCK_TEMPLATES[type] }]);
  const updateBlock = (index, patch) => {
    const next = [...list];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };
  const removeBlock = (index) => onChange(list.filter((_, i) => i !== index));
  const moveBlock = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="block-builder">
      <div className="block-add-row">
        {Object.keys(BLOCK_TEMPLATES).map((type) => (
          <button key={type} type="button" className="btn-add-block" onClick={() => addBlock(type)}>
            + {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <div className="block-builder-empty">No content blocks yet — add some above.</div>
      )}

      {list.map((block, index) => (
        <div key={index} className="block-card">
          <div className="block-card-header">
            <span className="block-type-label">{BLOCK_LABELS[block.type] || block.type}</span>
            <div className="block-card-actions">
              <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} title="Move up">↑</button>
              <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === list.length - 1} title="Move down">↓</button>
              <button type="button" className="btn-danger-outline" onClick={() => removeBlock(index)}>Remove</button>
            </div>
          </div>

          {block.type === 'legacy' && (
            <div className="block-legacy-preview">
              <RichText html={block.html} />
            </div>
          )}

          {block.type === 'heading' && (
            <div className="block-field-grid">
              <select value={block.level || 2} onChange={(e) => updateBlock(index, { level: Number(e.target.value) })}>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
              </select>
              <input
                type="text"
                value={block.text}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                placeholder="Heading text"
              />
            </div>
          )}

          {block.type === 'paragraph' && (
            <RichTextEditor value={block.html} onChange={(v) => updateBlock(index, { html: v })} token={token} />
          )}

          {block.type === 'image' && (
            <>
              <ImageField label="Image" value={block.url} onChange={(v) => updateBlock(index, { url: v })} token={token} />
              <input
                type="text"
                value={block.caption}
                onChange={(e) => updateBlock(index, { caption: e.target.value })}
                placeholder="Caption (optional)"
              />
              <div className="block-field-grid">
                <select value={block.fit || 'cover'} onChange={(e) => updateBlock(index, { fit: e.target.value })}>
                  <option value="cover">Fill — crop to fit the frame</option>
                  <option value="contain">Fit — show the whole image, no cropping</option>
                </select>
              </div>
              <p className="block-field-hint">
                Displays at full column width × 360px tall. "Fill" crops the image (centered) to cover that
                frame completely; "Fit" shows the entire image uncropped, letterboxed on a light background
                if its proportions don't match. For "Fill", upload an image close to a 2:1 landscape ratio
                (e.g. 1200×600px) so the crop keeps what matters; "Fit" works with any size or shape.
              </p>
            </>
          )}

          {block.type === 'list' && (
            <>
              <label className="block-checkbox-label">
                <input
                  type="checkbox"
                  checked={block.ordered || false}
                  onChange={(e) => updateBlock(index, { ordered: e.target.checked })}
                />
                Numbered list
              </label>
              <StringArrayEditor label="Item" items={block.items} onChange={(v) => updateBlock(index, { items: v })} />
            </>
          )}

          {block.type === 'video' && (
            <input
              type="text"
              value={block.url}
              onChange={(e) => updateBlock(index, { url: e.target.value })}
              placeholder="YouTube/Vimeo link or direct video URL"
            />
          )}

          {block.type === 'link' && (
            <div className="block-field-grid">
              <input
                type="text"
                value={block.url}
                onChange={(e) => updateBlock(index, { url: e.target.value })}
                placeholder="URL"
              />
              <input
                type="text"
                value={block.text}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                placeholder="Link text"
              />
            </div>
          )}

          {block.type === 'slideshow' && (
            <ImageArrayEditor images={block.images} onChange={(v) => updateBlock(index, { images: v })} token={token} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockBuilder;

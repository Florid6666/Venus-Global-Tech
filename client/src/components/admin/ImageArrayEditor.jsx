import React from 'react';
import ImageField from './ImageField';

// Array of uploadable images, e.g. the "Image Slideshow" content block.
const ImageArrayEditor = ({ images, onChange, token }) => {
  const list = images || [];
  const update = (index, value) => {
    const next = [...list];
    next[index] = value;
    onChange(next);
  };
  const add = () => onChange([...list, '']);
  const remove = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div>
      {list.map((image, index) => (
        <div key={index} className="array-card">
          <ImageField value={image} onChange={(v) => update(index, v)} token={token} />
          <button type="button" className="btn-danger-outline" onClick={() => remove(index)}>Remove Image</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={add}>+ Add Image</button>
    </div>
  );
};

export default ImageArrayEditor;

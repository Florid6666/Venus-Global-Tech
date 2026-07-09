import React from 'react';

const StringArrayEditor = ({ items, onChange, label }) => {
  const list = items || [];
  const update = (index, value) => {
    const next = [...list];
    next[index] = value;
    onChange(next);
  };
  const add = () => onChange([...list, '']);
  const remove = (index) => onChange(list.filter((_, i) => i !== index));

  return (
    <div>
      {list.map((item, index) => (
        <div key={index} className="array-row">
          <input type="text" value={item} placeholder={label} onChange={(e) => update(index, e.target.value)} />
          <button type="button" className="btn-danger-outline" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={add}>+ Add {label}</button>
    </div>
  );
};

export default StringArrayEditor;

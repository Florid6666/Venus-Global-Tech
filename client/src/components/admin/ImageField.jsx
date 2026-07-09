import React, { useState } from 'react';
import { getApiUrl } from '../../config/api';

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Image field used throughout the admin panel: a plain URL/path input (for
// pasting external image URLs, e.g. flag icons) plus a file picker that
// uploads the chosen file via POST /api/upload and fills the field with the
// resulting URL.
const ImageField = ({ label, value, onChange, token }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataBase64 = await fileToBase64(file);
      const response = await fetch(getApiUrl('api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filename: file.name, mimeType: file.type, dataBase64 }),
      });
      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        const error = await response.json().catch(() => ({}));
        alert(error.error || 'Image upload failed');
      }
    } catch (err) {
      alert('Image upload error: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="image-field">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.jpg or https://..."
        />
        <label className="image-upload-btn">
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>
      {value && <img src={value} alt="" className="image-field-preview" />}
    </div>
  );
};

export default ImageField;

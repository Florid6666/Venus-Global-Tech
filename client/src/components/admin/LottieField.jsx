import React, { useState } from 'react';
import { getApiUrl } from '../../config/api';

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Lottie animation field: a plain path/URL input (for pasting an existing
// /lottie/*.json path or external URL) plus a file picker that uploads the
// chosen .json file via POST /api/upload (same endpoint as ImageField) and
// fills the field with the resulting hosted URL.
const LottieField = ({ label, value, onChange, token }) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json')) {
      alert('Please choose a .json Lottie animation file');
      e.target.value = '';
      return;
    }
    setUploading(true);
    try {
      const dataBase64 = await fileToBase64(file);
      const response = await fetch(getApiUrl('api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filename: file.name, mimeType: 'application/json', dataBase64 }),
      });
      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        const error = await response.json().catch(() => ({}));
        alert(error.error || 'Lottie upload failed');
      }
    } catch (err) {
      alert('Lottie upload error: ' + err.message);
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
          placeholder="/images/homev2/animation.json or https://..."
        />
        <label className="image-upload-btn">
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept=".json,application/json" onChange={handleFile} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>
    </div>
  );
};

export default LottieField;

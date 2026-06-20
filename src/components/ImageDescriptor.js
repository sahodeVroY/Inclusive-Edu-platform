import React, { useState } from 'react';
import './ImageDescriptor.css';

const mockDescribeImage = async (file) => {
  // Simulate AI image description (replace with real API call later)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('A group of students sitting at desks in a classroom, listening to a teacher at the front.');
    }, 1200);
  });
};

const ImageDescriptor = ({ onReadAloud }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setDescription('');
    } else {
      setImage(null);
      setPreview(null);
      setDescription('');
      alert('Please upload a valid image file.');
    }
  };

  const handleDescribe = async () => {
    if (!image) return;
    setLoading(true);
    setDescription('');
    const desc = await mockDescribeImage(image);
    setDescription(desc);
    setLoading(false);
  };

  return (
    <div className="image-descriptor">
      <label className="img-label">
        Upload image:&nbsp;
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {preview && (
        <div className="img-preview">
          <img src={preview} alt="Preview" style={{maxWidth: 320, maxHeight: 180, borderRadius: 8, margin: '1rem 0'}} />
        </div>
      )}
      <button
        className="img-desc-btn"
        onClick={handleDescribe}
        disabled={!image || loading}
        aria-label="Describe Image"
      >
        {loading ? 'Describing...' : 'Describe Image'}
      </button>
      {description && (
        <div className="img-description">
          <strong>Description:</strong> {description}
          {onReadAloud && (
            <button className="img-read-btn" onClick={() => onReadAloud(description)} aria-label="Read description aloud">🔊</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDescriptor; 
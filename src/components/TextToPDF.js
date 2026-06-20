import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './TextToPDF.css';

const TextToPDF = () => {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('document.pdf');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
        setFilename(file.name.replace(/\.txt$/i, '.pdf'));
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt file.');
    }
  };

  const handleDownload = () => {
    if (!text.trim()) return;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 20);
    doc.save(filename);
  };

  return (
    <div className="text-to-pdf">
      <label className="file-label">
        Upload .txt file:&nbsp;
        <input type="file" accept=".txt" onChange={handleFileChange} />
      </label>
      <div className="or-divider">or</div>
      <textarea
        className="tpdf-input"
        rows={6}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter or paste text to convert to PDF..."
        aria-label="Text to convert to PDF"
      />
      <button
        className="tpdf-btn"
        onClick={handleDownload}
        disabled={!text.trim()}
        aria-label="Download as PDF"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default TextToPDF; 
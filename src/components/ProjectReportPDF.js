import React from 'react';
import { jsPDF } from 'jspdf';

const reportText = `Inclusive Education Platform\n\n\
Project Overview:\nInclusive Education Platform is a React-based web application designed to make learning accessible for everyone, including users with disabilities or special needs. The platform integrates multiple accessibility and assistive features, modern UI/UX, and AI-powered tools.\n\
Languages & Frameworks:\n- Frontend: JavaScript (React)\n- Styling: CSS\n- HTML: JSX\n\
Key Libraries & Tools:\n- React\n- @tensorflow-models/handpose, @tensorflow/tfjs\n- react-webcam\n- jspdf\n- @testing-library/react, @testing-library/jest-dom\n\
Main Features:\n- Theme Toggle: Default, High Contrast, Dark Mode\n- Font Size Toggle\n- Dyslexia-Friendly Font\n- Color Blindness Simulation\n- Speech to Text\n- Text to Speech\n- Text to PDF\n- Image Description (mock)\n- Gesture Navigation (TensorFlow Handpose)\n- Dashboard: Usage stats, course progress, feedback\n- Course Catalog\n\
System Diagram:\n\
User --> Web Browser --> React App\n  |--> Accessibility Toggles\n  |--> Assistive Tools (Speech API, jsPDF)\n  |--> Gesture Controls (Webcam, TensorFlow)\n  |--> Dashboard & Catalog\n\n`;

const ProjectReportPDF = () => {
  const handleDownload = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(reportText, 180);
    doc.text(lines, 10, 20);
    doc.save('Inclusive_Education_Platform_Report.pdf');
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        background: '#61dafb',
        color: '#181c24',
        border: 'none',
        borderRadius: 8,
        padding: '0.7rem 1.3rem',
        fontSize: '1.05rem',
        fontWeight: 600,
        cursor: 'pointer',
        margin: '1rem 0',
      }}
    >
      Download Project Report (PDF)
    </button>
  );
};

export default ProjectReportPDF; 
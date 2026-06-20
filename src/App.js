import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';
import CourseCatalog from './components/CourseCatalog';
import SpeechToText from './components/SpeechToText';
import TextToSpeech from './components/TextToSpeech';
import TextToPDF from './components/TextToPDF';
import Dashboard from './components/Dashboard';
import ImageDescriptor from './components/ImageDescriptor';
import GestureControls from './components/GestureControls';

function App() {
  const [feedback, setFeedback] = useState([
    'Great platform! Very accessible.',
    'Loved the speech-to-text feature.',
    'Would like more language options.',
  ]);
  const [feedbackInput, setFeedbackInput] = useState('');

  // Usage stats (simulate real-time for now)
  const [usage, setUsage] = useState({
    speechToText: 12,
    textToSpeech: 8,
    textToPDF: 3,
  });

  // Course engagement state
  const [courseEngagement, setCourseEngagement] = useState([
    { course: 'CS50: Introduction to Computer Science', progress: 80 },
    { course: 'Web Accessibility', progress: 40 },
    { course: 'Khan Academy Math', progress: 100 },
  ]);

  // Login streak logic
  const [lastLogin, setLastLogin] = useState('2024-06-10');
  const [loginStreak, setLoginStreak] = useState(1);
  React.useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (lastLogin !== today) {
      const last = new Date(lastLogin);
      const now = new Date(today);
      const diff = (now - last) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        setLoginStreak(s => s + 1);
      } else if (diff > 1) {
        setLoginStreak(1);
      }
      setLastLogin(today);
    }
  }, []);

  const [ttsText, setTtsText] = useState('');
  const [ttsKey, setTtsKey] = useState(0); // to force re-mount for new text

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackInput.trim()) {
      setFeedback(prev => {
        const updated = [...prev, feedbackInput.trim()];
        return updated.length > 5 ? updated.slice(updated.length - 5) : updated;
      });
      setFeedbackInput('');
    }
  };

  // Increment/decrement course progress by idx and amount
  const changeProgress = (idx, amount) => {
    setCourseEngagement(prev => prev.map((c, i) =>
      i === idx ? { ...c, progress: Math.max(0, Math.min(100, c.progress + amount)) } : c
    ));
  };

  const handleReadAloud = (text) => {
    setTtsText(text);
    setTtsKey(k => k + 1);
  };

  const sectionOrder = [
    'home',
    'speech-to-text',
    'text-to-speech',
    'text-to-pdf',
    'image-descriptor',
    'gesture-controls',
    'dashboard',
    'courses',
    'about',
  ];
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedBtnIdx, setSelectedBtnIdx] = useState(0);
  const [fingerCount, setFingerCount] = useState(0);

  // Scroll to section by id
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(id);
      setSelectedBtnIdx(0);
    }
  };

  // Gesture navigation handlers
  const handleGestureNav = (direction) => {
    const idx = sectionOrder.indexOf(currentSection);
    if (direction === 'right' && idx < sectionOrder.length - 1) {
      // right swipe = down (next section)
      scrollToSection(sectionOrder[idx + 1]);
    } else if (direction === 'left' && idx > 0) {
      // left swipe = up (previous section)
      scrollToSection(sectionOrder[idx - 1]);
    }
  };

  // Button selection/activation handlers
  const handleGestureButton = (action) => {
    const section = document.getElementById(currentSection);
    if (!section) return;
    const btns = section.querySelectorAll('button, [role="button"]');
    if (!btns.length) return;
    if (action === 'highlight') {
      // Cycle to next button
      const nextIdx = (selectedBtnIdx + 1) % btns.length;
      setSelectedBtnIdx(nextIdx);
      btns[nextIdx].focus();
    } else if (action === 'activate') {
      btns[selectedBtnIdx]?.click();
    }
  };

  return (
    <div className="App app-bg">
      <Header />
      <main>
        {/* Home Section */}
        <section id="home" className="section home-section">
          <h1>Welcome to the Inclusive Education Platform</h1>
          <p>Empowering every learner with accessible, AI-powered tools and resources.</p>
        </section>
        {/* Speech to Text Section */}
        <section id="speech-to-text" className="section speech-section">
          <h2>Speech to Text</h2>
          <SpeechToText />
        </section>
        {/* Text to Speech Section */}
        <section id="text-to-speech" className="section tts-section">
          <h2>Text to Speech</h2>
          <TextToSpeech />
        </section>
        {/* Text to PDF Section */}
        <section id="text-to-pdf" className="section tpdf-section">
          <h2>Text to PDF</h2>
          <TextToPDF />
        </section>
        {/* Image Descriptor Section */}
        <section id="image-descriptor" className="section imgdesc-section">
          <h2>Image Description</h2>
          <ImageDescriptor onReadAloud={handleReadAloud} />
          {ttsText && <TextToSpeech key={ttsKey} initialText={ttsText} autoSpeak />}
        </section>
        {/* Gesture Controls Section */}
        <section id="gesture-controls" className="section gesture-section">
          <h2>Gesture Controls</h2>
          <GestureControls
            onNavigate={handleGestureNav}
            onButtonAction={handleGestureButton}
            onFingerCount={setFingerCount}
            fingerCount={fingerCount}
          />
        </section>
        {/* Courses Section (placeholder) */}
        <section id="courses" className="section courses-section">
          <h2>Featured Courses</h2>
          <p>Explore free, high-quality learning resources curated for you.</p>
          <CourseCatalog />
        </section>
        {/* About Section (placeholder) */}
        <section id="about" className="section about-section">
          <h2>About</h2>
          <p>Our mission is to make education accessible, engaging, and effective for everyone.</p>
          <p>Our platform harnesses cutting-edge speech processing, language translation, and intelligent analytics to create a truly personalized learning experience for all students. Whether in the classroom or learning remotely, every student gains equal access to content, real-time feedback, and tailored support—regardless of language or ability. By seamlessly integrating advanced AI technologies, we break down barriers and foster an environment where every learner can thrive. Join us in shaping a future where education is not just accessible, but transformative for everyone.</p>
        </section>
        {/* Dashboard Section */}
        <section id="dashboard" className="section dashboard-section">
          <Dashboard
            feedback={feedback}
            usage={usage}
            courseEngagement={courseEngagement}
            changeProgress={changeProgress}
            lastLogin={lastLogin}
            loginStreak={loginStreak}
          />
          <form className="feedback-form" onSubmit={handleFeedbackSubmit} style={{marginTop: '1.5rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <label htmlFor="feedback-input" style={{marginBottom: 4}}><strong>Leave Feedback:</strong></label>
            <textarea
              id="feedback-input"
              value={feedbackInput}
              onChange={e => setFeedbackInput(e.target.value)}
              rows={3}
              style={{width: '100%', maxWidth: 600, margin: '0.5rem 0', borderRadius: 8, padding: '0.7rem 1rem', fontSize: '1.05rem'}}
              placeholder="Share your thoughts..."
              aria-label="Feedback"
              required
            />
            <button type="submit" style={{background: '#61dafb', color: '#181c24', border: 'none', borderRadius: 8, padding: '0.7rem 1.3rem', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer'}}>
              Submit Feedback
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;

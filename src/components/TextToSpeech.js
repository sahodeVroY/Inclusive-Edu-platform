import React, { useState } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support Text-to-Speech.');
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="text-to-speech">
      <textarea
        className="tts-input"
        rows={4}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter text to read aloud..."
        aria-label="Text to read aloud"
      />
      <div className="tts-controls">
        <button
          className="tts-btn"
          onClick={handleSpeak}
          disabled={speaking || !text.trim()}
          aria-label="Read text aloud"
        >
          {speaking ? 'Speaking...' : 'Read Aloud'}
        </button>
        <button
          className="tts-btn stop"
          onClick={handleStop}
          disabled={!speaking}
          aria-label="Stop reading"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech; 
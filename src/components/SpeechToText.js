import React, { useState, useRef } from 'react';
import './SpeechToText.css';

const SpeechToText = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript + ' ');
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (interimTranscript) {
        setTranscript((prev) => prev.split(' [interim]')[0] + ' ' + interimTranscript + ' [interim]');
      }
    };
    recognition.onend = () => {
      setListening(false);
      setTranscript((prev) => prev.replace(' [interim]', ''));
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className="speech-to-text">
      <button
        className={`stt-btn${listening ? ' listening' : ''}`}
        onClick={listening ? stopListening : startListening}
        aria-pressed={listening}
        aria-label={listening ? 'Stop listening' : 'Start voice input'}
      >
        {listening ? 'Stop Listening' : 'Start Voice Input'}
      </button>
      <div className="stt-transcript" aria-live="polite">
        {transcript ? transcript.replace(' [interim]', '') : 'Your speech will appear here.'}
      </div>
    </div>
  );
};

export default SpeechToText; 
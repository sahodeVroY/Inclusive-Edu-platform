import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import './GestureControls.css';

const GESTURE_LABELS = {
  left: 'Swipe Left',
  right: 'Swipe Right',
  open: 'Open Hand',
  closed: 'Closed Fist',
  none: 'No Gesture',
};

function countFingers(landmarks) {
  // Simple finger counting: count if tip is above MCP joint (y axis)
  if (!landmarks) return 0;
  const tips = [8, 12, 16, 20]; // index, middle, ring, pinky
  let count = 0;
  for (let i = 0; i < tips.length; i++) {
    if (landmarks[tips[i]][1] < landmarks[tips[i] - 2][1]) count++;
  }
  // Thumb: check if tip is to the right of MCP for right hand (x axis)
  if (landmarks[4][0] > landmarks[3][0]) count++;
  return count;
}

const GestureControls = ({ onNavigate, onButtonAction, onFingerCount, fingerCount }) => {
  const webcamRef = useRef(null);
  const [gesture, setGesture] = useState('none');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const modelRef = useRef(null);
  const lastX = useRef(null);
  const lastGesture = useRef('none');
  const gestureTimeout = useRef(null);
  const lastHandPresent = useRef(false);
  const holdInterval = useRef(null);
  const blinkTimeout = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    let isMounted = true;
    handpose.load().then(model => {
      if (!isMounted) return;
      modelRef.current = model;
      setLoading(false);
      runDetection();
    });
    return () => {
      isMounted = false;
      if (gestureTimeout.current) clearTimeout(gestureTimeout.current);
    };
    // eslint-disable-next-line
  }, [enabled]);

  const triggerRepeatedNav = (direction) => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdInterval.current = setInterval(() => {
      if (onNavigate) onNavigate(direction);
    }, 800); // adjust speed as needed
  };
  const stopRepeatedNav = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdInterval.current = null;
  };

  const runDetection = async () => {
    if (!webcamRef.current || !modelRef.current) return;
    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) {
      requestAnimationFrame(runDetection);
      return;
    }
    const predictions = await modelRef.current.estimateHands(video);
    if (predictions.length > 0) {
      // Hand detected
      const landmarks = predictions[0].landmarks;
      const fingers = countFingers(landmarks);
      if (onFingerCount) onFingerCount(fingers);
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const pinkyTip = landmarks[20];
      const palmBase = landmarks[0];
      const spread = Math.abs(indexTip[0] - pinkyTip[0]);
      const isOpen = spread > 60;
      const x = palmBase[0];
      if (lastX.current !== null) {
        if (x - lastX.current > 50) {
          setGesture('right');
          lastGesture.current = 'right';
          if (onNavigate) onNavigate('right'); // right swipe = down
          resetGestureAfterDelay();
        } else if (lastX.current - x > 50) {
          setGesture('left');
          lastGesture.current = 'left';
          if (onNavigate) onNavigate('left'); // left swipe = up
          resetGestureAfterDelay();
        } else if (isOpen) {
          setGesture('open');
          lastGesture.current = 'open';
          if (!holdInterval.current) triggerRepeatedNav('left'); // hold = up
        } else {
          setGesture('closed');
          lastGesture.current = 'closed';
          if (!holdInterval.current) triggerRepeatedNav('left'); // hold = up
        }
      }
      lastX.current = x;
      // If hand was not present before, clear blink timeout
      if (!lastHandPresent.current && blinkTimeout.current) {
        clearTimeout(blinkTimeout.current);
        blinkTimeout.current = null;
      }
      lastHandPresent.current = true;
    } else {
      setGesture('none');
      lastGesture.current = 'none';
      if (onFingerCount) onFingerCount(0);
      // If hand just disappeared, start blink timer
      if (lastHandPresent.current) {
        blinkTimeout.current = setTimeout(() => {
          // Blink detected (hand quickly removed)
          if (onNavigate) onNavigate('right'); // blink = down
          triggerRepeatedNav('right'); // start repeated down
        }, 200); // 200ms: adjust for blink sensitivity
        stopRepeatedNav(); // stop up navigation
      } else {
        stopRepeatedNav();
      }
      lastHandPresent.current = false;
    }
    requestAnimationFrame(runDetection);
  };

  const resetGestureAfterDelay = () => {
    if (gestureTimeout.current) clearTimeout(gestureTimeout.current);
    gestureTimeout.current = setTimeout(() => {
      setGesture('none');
    }, 1200);
  };

  return (
    <div className="gesture-controls">
      <div className="gesture-header">
        <label>
          <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
          Enable Gesture Controls
        </label>
        <span className="gesture-status">{loading ? 'Loading model...' : enabled ? 'Active' : 'Disabled'}</span>
      </div>
      {enabled && (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            width={320}
            height={240}
            style={{ borderRadius: 8, margin: '1rem 0' }}
            videoConstraints={{ facingMode: 'user' }}
          />
          <div className="gesture-feedback">
            <strong>Detected Gesture:</strong> <span className={`gesture-label gesture-${gesture}`}>{GESTURE_LABELS[gesture]}</span>
          </div>
          <div className="gesture-fingers">
            <strong>Fingers Detected:</strong> <span className="fingers-label">{fingerCount}</span>
          </div>
          <div className="gesture-instructions">
            <strong>Try:</strong> Swipe left to go up, swipe right to go down.<br/>
            Hold your hand steady to slowly go up.<br/>
            Hold and quickly remove (blink) to slowly go down.
          </div>
        </>
      )}
    </div>
  );
};

export default GestureControls; 
import React from 'react';
import './Dashboard.css';

const mockStats = {
  lastLogin: '2024-06-10 14:32',
};

const Dashboard = ({ feedback, usage, courseEngagement, changeProgress, lastLogin, loginStreak }) => (
  <div className="dashboard">
    <h2>Your Dashboard</h2>
    <div className="dashboard-section">
      <strong>Last Login:</strong> {lastLogin}
    </div>
    <div className="dashboard-section">
      <strong>Login Streak:</strong> {loginStreak} day{loginStreak !== 1 ? 's' : ''}
    </div>
    <div className="dashboard-section">
      <strong>Usage Stats:</strong>
      <ul>
        <li>Speech to Text: {usage.speechToText} times</li>
        <li>Text to Speech: {usage.textToSpeech} times</li>
        <li>Text to PDF: {usage.textToPDF} times</li>
      </ul>
    </div>
    <div className="dashboard-section">
      <strong>Recent Feedback:</strong>
      <ul>
        {feedback && feedback.length > 0 ? (
          feedback.slice().reverse().map((fb, i) => <li key={i}>{fb}</li>)
        ) : (
          <li>No feedback yet.</li>
        )}
      </ul>
    </div>
    <div className="dashboard-section">
      <strong>Course Engagement:</strong>
      <ul>
        {courseEngagement.map((c, i) => (
          <li key={i} style={{marginBottom: 8}}>
            {c.course}: {c.progress}% complete
            <button
              style={{marginLeft: 10, padding: '0.2rem 0.7rem', borderRadius: 6, border: 'none', background: '#61dafb', color: '#181c24', fontWeight: 600, cursor: 'pointer'}}
              onClick={() => changeProgress(i, 10)}
              aria-label={`Add 10% to ${c.course}`}
              disabled={c.progress >= 100}
            >+10%</button>
            <button
              style={{marginLeft: 6, padding: '0.2rem 0.7rem', borderRadius: 6, border: 'none', background: '#23283a', color: '#61dafb', fontWeight: 600, cursor: 'pointer'}}
              onClick={() => changeProgress(i, -10)}
              aria-label={`Subtract 10% from ${c.course}`}
              disabled={c.progress <= 0}
            >-10%</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Dashboard; 
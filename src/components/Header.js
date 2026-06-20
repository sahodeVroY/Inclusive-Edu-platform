import React from 'react';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import FontSizeToggle from './FontSizeToggle';
import DyslexiaFontToggle from './DyslexiaFontToggle';
import ColorBlindnessToggle from './ColorBlindnessToggle';

const Header = () => (
  <header className="header" role="banner">
    <nav aria-label="Main navigation">
      <ul className="nav-list">
        <li><a href="#home" tabIndex="0">Home</a></li>
        <li><a href="#courses" tabIndex="0">Courses</a></li>
        <li><a href="#dashboard" tabIndex="0">Dashboard</a></li>
        <li><a href="#about" tabIndex="0">About</a></li>
      </ul>
    </nav>
    <div className="header-contrast-toggle">
      <ThemeToggle />
      <FontSizeToggle />
      <DyslexiaFontToggle />
      <ColorBlindnessToggle />
    </div>
  </header>
);

export default Header; 
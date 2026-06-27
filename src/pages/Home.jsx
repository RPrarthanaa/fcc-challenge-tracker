// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Calendar, ArrowRight } from 'lucide-react';

export const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Code size={16} />
            <span>FreeCodeCamp Tracker</span>
          </div>
          <h1 className="hero-title">
            Track Your <span className="gradient-text">FreeCodeCamp</span> Journey
          </h1>
          <p className="hero-subtitle">
            Organize your daily challenges, monitor progress, track coding streaks, 
            and keep a record of every project and file you create.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
              <ArrowRight size={18} />
            </Link>
            <Link to="/calendar" className="btn-secondary">
              <Calendar size={18} />
              View Challenge Calendar
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};
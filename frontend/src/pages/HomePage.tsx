import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>📝 Notes Manager</h1>
        <p>Organize your thoughts and ideas with our powerful note-taking application</p>
        <div className="hero-actions">
          <Link to="/notes" className="btn btn-primary">
            View All Notes
          </Link>
          <Link to="/notes/create" className="btn btn-secondary">
            Create New Note
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>Create & Edit</h3>
            <p>Create new notes and edit existing ones with our intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Organize</h3>
            <p>Keep all your notes organized and easily accessible</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search</h3>
            <p>Find your notes quickly with our powerful search functionality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

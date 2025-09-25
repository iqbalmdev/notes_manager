import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          📝 Notes Manager
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
          <Link 
            to="/notes" 
            className={`nav-link ${isActive('/notes') ? 'active' : ''}`}
          >
            📋 All Notes
          </Link>
          <Link 
            to="/notes/create" 
            className={`nav-link ${isActive('/notes/create') ? 'active' : ''}`}
          >
            ✏️ Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

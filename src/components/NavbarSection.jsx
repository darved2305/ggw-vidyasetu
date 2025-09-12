
import React from 'react';
import '../styles/NavbarSection.css';

const NavbarSection = () => (
  <nav className="navbar-section" aria-label="Main navigation">
    <div className="navbar-left">
      <div className="navbar-logos">
        <a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener noreferrer">
          <img src="src/assets/digilocker.jpg" alt="Digilocker Logo" className="navbar-logo-img" />
        </a>
        <a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer">
          <img src="src/assets/mygov.png" alt="MyGov Logo" className="navbar-logo-img" />
        </a>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search using Candidate ID, Certificate No., Course, or Event..."
          className="navbar-search-input"
          aria-label="Search"
        />
        <span className="navbar-search-icon" aria-label="Search icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <span className="navbar-portfolio-icon" aria-label="Portfolio icon">
          <img src="/src/assets/portfolio.png" alt="search-icon" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
        </span>
        <span className="navbar-info-icon" aria-label="Info icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </span>
      </div>
    </div>
    <div className="navbar-right">
      <span className="navbar-language-icon" aria-label="Language icon">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </span>
      <span className="navbar-language-label">Change Language:</span>
      <select className="navbar-language-select" defaultValue="English" aria-label="Change language">
        <option value="English">English</option>
        <option value="Hindi">हिन्दी</option>
        <option value="Marathi">मराठी</option>
      </select>
  
  
      <span className="navbar-icon-btn" tabIndex={0} aria-label="Notifications">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 1 0-12 0c0 7 6 13 6 13s6-6 6-13z" />
        </svg>
        <span className="navbar-notification-dot" />
        <span className="navbar-tooltip">Notifications</span>
      </span>
      <span className="navbar-icon-btn" tabIndex={0} aria-label="Download Document">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="M19 12l-7 7-7-7" />
        </svg>
        <span className="navbar-tooltip">Download Document</span>
      </span>
      <span className="navbar-icon-btn" tabIndex={0} aria-label="Upload Document">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 16V8" />
          <path d="M8 12l4-4 4 4" />
        </svg>
        <span className="navbar-tooltip">Upload Document</span>
      </span>
      <span className="navbar-avatar-btn" tabIndex={0} aria-label="Ram Vyas profile">
        <span className="navbar-avatar">RV</span>
        <span className="navbar-avatar-dot" />
        <span className="navbar-tooltip top-[110%]">Ram Vyas</span>
      </span>
    </div>
  </nav>
);

export default NavbarSection;

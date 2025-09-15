import React, { useState } from 'react';

const NavbarFaculty = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <>
      <div className="bg-blue-700 text-white text-sm py-1 text-center w-full">
        <div className="flex items-center justify-center gap-4">
          <a
            href="#main-content"
            className="text-white underline font-medium"
          >
            Skip to Main Content
          </a>

          <span className="ml-6">
            <span className="mx-1 cursor-pointer">A-</span>
            <span className="mx-1 cursor-pointer font-bold border border-white rounded px-1">
              A
            </span>
            <span className="mx-1 cursor-pointer">A+</span>
            <span className="mx-1 cursor-pointer">◐</span>
            <span className="mx-1 cursor-pointer">🧑‍🦽</span>
            <span className="mx-1 cursor-pointer">More</span>
          </span>
        </div>
      </div>

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
              placeholder="Search Using Student ID..."
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
              <img src="/src/assets/portfolio.png" alt="search-icon" className="w-5 h-5 rounded-full" />
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

          <span 
            className="navbar-avatar-btn relative inline-block" 
            tabIndex={0} 
            aria-label="Faculty profile"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <span className="navbar-avatar">SM</span>
            <span className="navbar-avatar-dot" />
          </span>
        </div>
      </nav>
    </>
  );
};

export default NavbarFaculty;
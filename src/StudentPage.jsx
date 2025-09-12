import React from 'react';
import './styles/global.css';
import TopBarSection from './components/TopBarSection';
import NavbarSection from './components/NavbarSection';
import SidebarSection from './components/SidebarSection';
import HeaderSection from './components/HeaderSection';
import CertificatesSection from './components/CertificatesSection';
import TestRecordsSection from './components/TestRecordsSection';
import FooterSection from './components/FooterSection';

const StudentPage = () => {
  const handleMouseEnter = (e) => {
    const tooltip = e.currentTarget.querySelector('.navbar-tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = 1;
    }
  };

  const handleMouseLeave = (e) => {
    const tooltip = e.currentTarget.querySelector('.navbar-tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = 0;
    }
  };


  return (
    <div
      style={{
        display: 'block',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: 'Inter, Arial, sans-serif',
        background: '#f5f8fa',
      }}
    >
      <TopBarSection />
      <NavbarSection handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      <div
        style={{
          display: 'flex',
          maxWidth: '1400px',
          margin: '2rem auto',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}
      >
        <SidebarSection />
        <main style={{ flex: 1, padding: '2rem 2.5rem' }}>
          <HeaderSection />
          <CertificatesSection />
          <TestRecordsSection />
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default StudentPage;

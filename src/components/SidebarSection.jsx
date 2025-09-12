import React from 'react';

const SidebarSection = () => (
  <aside
    style={{
      width: '260px',
      minHeight: '700px',
      padding: '2rem 1rem',
      color: '#fff',
      background: '#3b6fc2',
      borderRadius: '12px 0 0 12px',
    }}
  >
    <div
      style={{
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '2rem',
      }}
    >
      Welcome, Ram Vyas!
    </div>

    <nav>
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          ACADEMIC
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>My Academic Records</li>
          <li>Certificates & Courses</li>
          <li>Work Experiences</li>
          <li>Skill Development</li>
          <li>Competitions</li>
          <li>Course Plan</li>
        </ul>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          PROFILE & APPLICATIONS
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>Profile</li>
          <li>Document Hub</li>
          <li>Applications & Requests</li>
          <li>Approvals & Verification</li>
        </ul>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          SETTINGS
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>Account Settings</li>
          <li>Notification Preferences</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '2rem',
          fontWeight: 'bold',
        }}
      >
        Logout
      </div>
    </nav>
  </aside>
);

export default SidebarSection;

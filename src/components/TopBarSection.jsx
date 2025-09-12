import React from 'react';

const sepLight = {
  display: 'inline-block',
  width: '1px',
  height: '14px',
  opacity: 0.7,
  background: '#ffffff',
};

const TopBarSection = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.2rem',
      height: '28px',
      background: '#3b6fc2',
      color: '#fff',
      fontSize: '0.98rem',
      fontWeight: 500,
    }}
  >
    <span style={{ marginRight: '1.2rem' }}>
      Skip to Main Content
    </span>

    <span style={sepLight} />

    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        opacity: 0.9,
      }}
    >
      <span title="Increase Font Size" style={{ opacity: 0.7 }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <text
            x="4"
            y="17"
            fontSize="16"
            fontFamily="Arial"
            fill="#fff"
          >
            A
          </text>
        </svg>
      </span>

      <span title="Decrease Font Size" style={{ opacity: 0.7 }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <text
            x="10"
            y="17"
            fontSize="12"
            fontFamily="Arial"
            fill="#fff"
          >
            A
          </text>
        </svg>
      </span>

      <span title="High Contrast" style={{ opacity: 0.7 }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <circle cx="9" cy="12" r="6" fill="#fff" />
          <circle cx="15" cy="12" r="6" fill="#3b6fc2" />
        </svg>
      </span>
    </span>

    <span style={sepLight} />

    <span
      title="More"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        opacity: 0.7,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M12 8v8m0 0l-4-4m4 4l4-4" />
      </svg>
      More
    </span>
  </div>
);

export default TopBarSection;

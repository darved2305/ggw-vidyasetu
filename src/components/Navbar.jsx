import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../assets/logo.svg';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      // Convert to Mumbai time (IST) UTC+5:30
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istOffset = 5.5 * 60 * 60000;
      const istTime = new Date(utc + istOffset);
      const timeString = istTime.toLocaleTimeString('en-IN', { hour12: false });
      setCurrentTime(timeString);
    }
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const navItems = [
    {
      label: 'Student Services',
      submenu: ['Admission', 'Exams', 'Results'],
    },
    {
      label: 'Faculty Services',
      submenu: ['Attendance', 'Reports'],
    },
    {
      label: 'Dashboard and Report',
      submenu: ['Analytics', 'Progress'],
    },
    {
      label: 'Integrations',
      submenu: ['API', 'Third Party'],
    },
    {
      label: 'Resources',
      submenu: ['Docs', 'Help Center'],
    },
    { label: 'Sitemap' },
    { label: 'About Us' },
    { label: 'Contact Us' },
  ];

  return (
    <>
      <div className="bg-blue-700 text-white text-sm py-1 text-center w-full">
        <div className="flex items-center justify-center gap-4">
          {/* Live Mumbai Time Display */}
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Mumbai Time:</span>
            <span className="text-white font-bold bg-blue-800 px-2 py-1 rounded">
              {currentTime}
            </span>
          </div>
          <span className="ml-6">
            <span className="mx-1 cursor-pointer">A-</span>
            <span className="mx-1 cursor-pointer font-bold border border-white rounded px-1">A</span>
            <span className="mx-1 cursor-pointer">A+</span>
            <span className="mx-1 cursor-pointer">◐</span>
            <span className="mx-1 cursor-pointer">🧑‍🦽</span>
            <span className="mx-1 cursor-pointer">More</span>
          </span>
        </div>
      </div>

      <header
        className="topbar"
        style={{
          background: '#fff',
          color: '#3266b0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          width: '100%',
        }}
      >
        <div
          className="topbar-inner container"
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 0,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 0',
              gap: 24,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <img src={logo1} alt="Logo1" style={{ height: 32, width: 32 }} />
              <img
                src="https://vidyasetu.com/assets/images/vidya-setu-logo.png"
                alt="Logo2"
                style={{ height: 32, width: 32 }}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 600, maxWidth: '100%' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 10,
                    color: '#3266b0',
                    fontSize: 18,
                  }}
                >
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search FAQs"
                  style={{
                    width: '100%',
                    padding: '8px 38px 8px 38px',
                    borderRadius: 8,
                    border: '1px solid #e6eaf2',
                    fontSize: 15,
                    background: '#fff',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: 38,
                    top: 10,
                    color: '#3266b0',
                    fontSize: 18,
                  }}
                >
                  
                </span>
                <span
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 10,
                    color: '#3266b0',
                    fontSize: 18,
                  }}
                >
                  
                </span>
              </div>
            </div>

            <div className="relative mr-3">
              <button
                className="bg-white text-black border-2 border-black rounded-md px-6 py-2 font-semibold text-base cursor-pointer flex items-center gap-1"
                onClick={() => setOpenMenu(openMenu === 'login' ? null : 'login')}
                type="button"
              >
                Login <span className="text-sm ml-1">▼</span>
              </button>
              {openMenu === 'login' && (
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md min-w-[160px] py-2 z-50 text-base font-medium text-gray-800">
                  <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenMenu(null); navigate('/student-login'); }}>Student Login</li>
                  <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenMenu(null); navigate('/faculty-login'); }}>Faculty Login</li>
                  <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenMenu(null); navigate('/admin-login'); }}>Institute Login</li>
                </ul>
              )}
            </div>
          </div>

          <nav
            className={mobileNav ? 'open' : ''}
            aria-label="Primary"
            style={{ marginTop: 8, width: '100%' }}
          >
            <ul
              style={{
                display: 'flex',
                gap: 32,
                listStyle: 'none',
                padding: 0,
                margin: 0,
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {navItems.map((item, idx) => (
                <li
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenMenu(idx)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <a
                    href={`#${item.label.replace(/\s+/g, '').toLowerCase()}`}
                    style={{
                      color: '#3266b0',
                      fontWeight: 500,
                      textDecoration: 'none',
                      padding: '6px 10px',
                      borderRadius: 4,
                      fontSize: 17,
                    }}
                  >
                    {item.label}
                    {item.submenu && <span style={{ marginLeft: 6 }}>▼</span>}
                  </a>

                  {item.submenu && openMenu === idx && (
                    <ul
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        borderRadius: 6,
                        minWidth: 160,
                        zIndex: 10,
                        padding: '8px 0',
                        margin: 0,
                      }}
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub}>
                          <a
                            href={`#${sub.replace(/\s+/g, '').toLowerCase()}`}
                            style={{
                              display: 'block',
                              color: '#3266b0',
                              padding: '8px 18px',
                              textDecoration: 'none',
                              fontSize: 15,
                            }}
                          >
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

import { Route, Routes } from 'react-router-dom';
import FacultyPage from './FacultyPage.jsx';
import HomePage from './HomePage.jsx';
import StudentPage from './StudentPage.jsx';
import AdminPage from './AdminPage.jsx';
import StudentLogin from './StudentLogin.jsx';
import FacultyLogin from './FacultyLogin.jsx';
import StudentProfile from './StudentProfile.jsx';
import UploadDocs from './components/UploadDocs.jsx';
import Preloader from './components/Preloader.jsx';
import FacultyDashboard from './FacultyDashboard.jsx';
import FacultySettings from './FacultySettings.jsx';
import FacultyProfile from './FacultyProfile.jsx';
import { useState, useEffect } from 'react';

export default function App() {
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('preloaderShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/faculty' element={<FacultyPage />} />
      <Route path='/faculty-login' element={<FacultyLogin />} />
      <Route path='/student' element={<StudentPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/student-login' element={<StudentLogin />} />
      <Route path='/student-profile' element={<StudentProfile />} />
      <Route path='/upload-documents' element={<UploadDocs />} />
      <Route path='/faculty-dashboard' element={<FacultyDashboard />} />
      <Route path='/faculty-settings' element={<FacultySettings />} />
      <Route path='/faculty-profile' element={<FacultyProfile />} />
    </Routes>
  );
}

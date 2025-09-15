import { Route, Routes } from 'react-router-dom';
import FacultyPage from './FacultyPage.jsx';
import HomePage from './HomePage.jsx';
import StudentPage from './StudentPage.jsx';
import AdminPage from './AdminPage.jsx';
import StudentLogin from './StudentLogin.jsx';
import UploadDocs from './components/UploadDocs.jsx';
import Preloader from './components/Preloader.jsx';
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
      <Route path='/student' element={<StudentPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/student-login' element={<StudentLogin />} />
      <Route path='/upload-documents' element={<UploadDocs />} />
    </Routes>
  );
}

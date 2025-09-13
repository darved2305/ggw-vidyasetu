
import { Route, Routes } from 'react-router-dom';
import FacultyPage from './FacultyPage.jsx';
import HomePage from './HomePage.jsx';
import StudentPage from './StudentPage.jsx';
import AdminPage from './AdminPage.jsx';
import StudentLogin from './StudentLogin.jsx';

export default function App() {
  return (
  
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/faculty' element={<FacultyPage />} />
      <Route path='/student' element={<StudentPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/student-login' element={<StudentLogin />} />
    </Routes>
      
    
  )
}
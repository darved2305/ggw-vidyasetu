import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/FacultySidebar'
import FacultyStudentDataTable from './components/FacultyStudentDataTable'
import FooterSection from './components/FooterSection'
import VerifiedStatus from './components/VerifiedStatus'
import studentData from './data/studentdata'

const FacultyPage = () => {


  const verifiedCount = studentData.filter(student => student.verification === 'Verified').length;
  const pendingCount = studentData.filter(student => student.verification === 'Pending').length;


  return (
    <>
      <VerifiedStatus status={{ verified: verifiedCount, pending: pendingCount }} />
      <div className='flex items-center justify-between'>
        <Sidebar />
        <FacultyStudentDataTable /> 
      </div>
      <FooterSection/>
    </>
  )
}

export default FacultyPage
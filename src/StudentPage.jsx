import React from 'react'
import Navbar from './components/Navbar'
import TestRecordsSection from './components/TestRecordsSection'
import TopBarSection from './components/TopBarSection'
import Sidebar from './components/Sidebar'

const StudentPage = () => {
  return (
    <>
    
        <Navbar/>
        <h1>Student Dashboard HERE</h1>
        <div className='flex'>
          <Sidebar />
          <TestRecordsSection />
        </div>
      <TopBarSection />
    </>
  )
}

export default StudentPage
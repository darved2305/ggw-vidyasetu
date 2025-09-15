import React from 'react';
import NavbarFaculty from './components/NavbarFaculty';
import FacultySidebar from './components/FacultySidebar';
import FacultyStudentDataTable from './components/FacultyStudentDataTable';
import FooterSection from './components/FooterSection';
import VerifiedStatus from './components/VerifiedStatus';
import FacultyPromotionBanner from './components/FacultyPromotionBanner';
import studentData from './data/studentdata';

const FacultyPage = () => {
  const verifiedCount = studentData.filter(student => student.verification === 'Verified').length;
  const pendingCount = studentData.filter(student => student.verification === 'Pending').length;

  return (
    <>
      <NavbarFaculty />
      <div className="flex bg-slate-50 min-h-screen p-8">
        <div className="min-w-65 mr-8">
          <FacultySidebar />
        </div>
        <div className="flex-1 max-w-6xl bg-white rounded-xl p-0 shadow-lg shadow-blue-100/50">
          <FacultyPromotionBanner />
          <VerifiedStatus status={{ verified: verifiedCount, pending: pendingCount }} />
          <FacultyStudentDataTable />
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default FacultyPage;
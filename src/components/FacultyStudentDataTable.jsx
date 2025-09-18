// import React from 'react'
// import { BiSort } from "react-icons/bi";
// import studentData from '../data/studentdata';
// import { RiFileListFill } from "react-icons/ri";

// const FacultyStudentDataTable = () => {
//   const getVerificationBadge = (status) => {
//     if (status === 'Verified' || status === 'verified') {
//       return (
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
//           ✓ Verified
//         </span>
//       );
//     } else {
//       return (
//         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
//           ✗ Pending
//         </span>
//       );
//     }
//   };

//   return (
//     <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
//       <h1 className='text-xl font-bold flex items-center gap-2 mb-6 text-gray-800'>
//         <RiFileListFill className="text-blue-600" />
//         Student Records and Verification Status
//       </h1>
      
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b-2 border-gray-200">
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student Name
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Student ID
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Department
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//               <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   Verification Status
//                   <BiSort className="text-gray-400 hover:text-gray-600" />
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentData.map((element, index) => (
//               <tr 
//                 key={index} 
//                 className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//               >
//                 <td className="py-4 px-6 font-medium text-gray-900">
//                   {element.name}
//                 </td>
//                 <td className="py-4 px-6 text-gray-700 font-mono text-sm">
//                   {element.id}
//                 </td>
//                 <td className="py-4 px-6 text-gray-700">
//                   <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
//                     {element.department}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6">
//                   {getVerificationBadge(element.verification)}
//                 </td>
//                 <td className="py-4 px-6">
//                   <button
//                     onClick={() => generateStudentPortfolio(element)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Generate Portfolio
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default FacultyStudentDataTable


import React, { useState, useEffect } from 'react';
import { BiSort } from "react-icons/bi";
import { RiFileListFill } from "react-icons/ri";

const FacultyStudentDataTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students data when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('facultyToken'); // or however you store the token
      
      const response = await fetch('/api/auth/faculty/students', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents(data.students);
      } else {
        setError(data.message || 'Failed to fetch students');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = (status) => {
    // Keep verification status blank for now as it's a different schema
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
        - Not Available -
      </span>
    );
  };

  const generateStudentPortfolio = (student) => {
    // Portfolio generation logic here
    console.log('Generating portfolio for:', student);
    // Implement portfolio generation
  };

  if (loading) {
    return (
      <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading students...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
        <div className="flex justify-center items-center h-32">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-xl border-x border-b border-blue-200 p-6 shadow-sm">
      <h1 className='text-xl font-bold flex items-center gap-2 mb-6 text-gray-800'>
        <RiFileListFill className="text-blue-600" />
        Student Records and Verification Status
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  Student Name
                  <BiSort className="text-gray-400 hover:text-gray-600" />
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  Student ID
                  <BiSort className="text-gray-400 hover:text-gray-600" />
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  Department
                  <BiSort className="text-gray-400 hover:text-gray-600" />
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  Verification Status
                  <BiSort className="text-gray-400 hover:text-gray-600" />
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 px-6 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr 
                  key={student._id || index} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {student.studentName}
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-mono text-sm">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {student.deptName}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {getVerificationBadge(null)}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => generateStudentPortfolio(student)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Generate Portfolio
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyStudentDataTable;
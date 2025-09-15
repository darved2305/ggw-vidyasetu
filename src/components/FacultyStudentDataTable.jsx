import React from 'react'
import { BiSort } from "react-icons/bi";
import studentData from '../data/studentdata';
import { RiFileListFill } from "react-icons/ri";

const FacultyStudentDataTable = () => {
  const getVerificationBadge = (status) => {
    if (status === 'Verified' || status === 'verified') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          ✓ Verified
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
          ✗ Pending
        </span>
      );
    }
  };

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
            </tr>
          </thead>
          <tbody>
            {studentData.map((element, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {element.name}
                </td>
                <td className="py-4 px-6 text-gray-700 font-mono text-sm">
                  {element.id}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {element.department}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {getVerificationBadge(element.verification)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FacultyStudentDataTable
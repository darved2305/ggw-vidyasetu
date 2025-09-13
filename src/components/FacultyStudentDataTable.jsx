import React from 'react'
import { BiSort } from "react-icons/bi";
import studentData from '../data/studentdata';
import { RiFileListFill } from "react-icons/ri";

const FacultyStudentDataTable = () => {


  return (

    <div>
          <h1 className='text-xl font-bold flex mb-2'> <RiFileListFill />Student Records and Verified Status</h1>
        <table>
            <thead>
                <tr>
                    <th>Student name <BiSort /></th>
                    <th>Student ID <BiSort /></th>
                    <th>Department <BiSort /></th>
                    <th>Verification <BiSort /></th>
                </tr>

                {studentData.map((element, index) => (
                    <tr key={index}>
                        <td>{element.name}</td>
                        <td>{element.id}</td>
                        <td>{element.department}</td>
                        <td>{element.verification}</td>
                    </tr>
                ))}
            </thead>
        </table>
    </div>
  )
}

export default FacultyStudentDataTable
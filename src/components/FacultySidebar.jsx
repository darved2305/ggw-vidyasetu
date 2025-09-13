import React from 'react'
import { BsCalendar3, BsClipboard2Fill, BsFillPieChartFill, BsPersonFillCheck, BsFillPersonLinesFill, BsLaptop, BsFiles } from "react-icons/bs";
import { PiScrollLight } from "react-icons/pi";
import { IoSettingsSharp, IoExit } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const Sidebar = () => {

    const Details = [
        { name: 'Shraddha Mishra' },
    ]
  return (
    <div className='w-[25%] h-screen bg-gray-100'>
        <div className='flex justify-between items-center p-4 border-b'>
            <h1>Welcome, {Details.map(detail => detail.name)}</h1>
            <button>{">>"}</button>
        </div>
      <nav className='p-4 flex flex-col'>
        <div className='mb-[1.5rem]'>
          <div className='font-bold mb-[0.5rem]'>
            ACADEMIC
          </div>
          <ul className='flex-col list-none p-0 m-0'>
            <li className='flex gap-3'><BsCalendar3 />View Academic Records</li>
            <li className='flex gap-3'><PiScrollLight />View Certificates</li>
            <li className='flex gap-3'><BsClipboard2Fill />View Work Experiences</li>
            <li className='flex gap-3'><BsFillPieChartFill />Generate Student Report</li>
            <li className='flex gap-3'><BsLaptop />View Competitions</li>
            <li className='flex gap-3'><BsFiles />View Course Plan</li>
          </ul>
        </div>

        <div className='mb-[1.5rem]'>
          <div
            className='font-bold mb-[0.5rem]'
          >
            PROFILE & APPLICATIONS
          </div>
          <ul className='flex-col list-none p-0 m-0'>
            <li className='flex gap-3'><BsFillPersonLinesFill />User Profiles</li>
            <li className='flex gap-3'><BsFiles />Document Hub</li>
            <li className='flex gap-3'><BsPersonFillCheck />Approvals & Verification</li>
          </ul>
        </div>

        <div className='mb-[1.5rem]'>
          <div className='font-bold mb-[0.5rem]'>
            SETTINGS
          </div>
          <ul className='flex-col list-none p-0 m-0'>
            <li className='flex gap-3'><IoSettingsSharp />Account Settings</li>
            <li className='flex gap-3'><MdNotificationsActive />Notification Preferences</li>
          </ul>
        </div>

        <div className='mt-[2rem] font-bold flex gap-3 cursor-pointer'>
          <IoExit />Logout
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
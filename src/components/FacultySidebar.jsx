import React from 'react';
import { BsCalendar3, BsClipboard2Fill, BsFillPieChartFill, BsPersonFillCheck, BsFillPersonLinesFill, BsLaptop, BsFiles } from "react-icons/bs";
import { PiScrollLight } from "react-icons/pi";
import { IoSettingsSharp, IoExit } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const FacultySidebar = () => {
  const userDetails = [
    { name: 'Shraddha Mishra' },
  ];

  const handleItemHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.classList.add('bg-white/5', 'text-yellow-200', 'translate-x-1');
    } else {
      e.currentTarget.classList.remove('bg-white/5', 'text-yellow-200', 'translate-x-1');
    }
  };

  return (
    <div className="w-80 h-full bg-slate-800 text-white flex flex-col border-r border-gray-700 z-50">
      <div className="flex justify-between items-center p-4 border-b border-gray-700 min-h-15">
        <h1 className="font-semibold text-lg m-0 text-white">
          Welcome, {userDetails.map(detail => detail.name)}
        </h1>
        <button className="font-bold text-lg bg-transparent border-none text-white cursor-pointer py-1 px-2 rounded hover:bg-white/10 transition-colors">
          {">>"}
        </button>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto flex flex-col">
        <div className="mb-8">
          <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
            ACADEMIC
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsCalendar3 className="text-lg min-w-4" />
              <span>View Academic Records</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <PiScrollLight className="text-lg min-w-4" />
              <span>View Certificates</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsClipboard2Fill className="text-lg min-w-4" />
              <span>View Work Experiences</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsFillPieChartFill className="text-lg min-w-4" />
              <span>Generate Student Report</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsLaptop className="text-lg min-w-4" />
              <span>View Competitions</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsFiles className="text-lg min-w-4" />
              <span>View Course Plan</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
            PROFILE & APPLICATIONS
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsFillPersonLinesFill className="text-lg min-w-4" />
              <span>User Profiles</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsFiles className="text-lg min-w-4" />
              <span>Document Hub</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <BsPersonFillCheck className="text-lg min-w-4" />
              <span>Approvals & Verification</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider pl-2">
            SETTINGS
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1">
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <IoSettingsSharp className="text-lg min-w-4" />
              <span>Account Settings</span>
            </li>
            <li 
              className="flex items-center gap-3 cursor-pointer py-3 px-2 text-gray-300 rounded-md text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => handleItemHover(e, true)}
              onMouseLeave={(e) => handleItemHover(e, false)}
            >
              <MdNotificationsActive className="text-lg min-w-4" />
              <span>Notification Preferences</span>
            </li>
          </ul>
        </div>

        <div 
          className="mt-auto py-4 px-2 font-semibold flex items-center gap-3 cursor-pointer text-red-500 rounded-md border-t border-gray-700 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:translate-x-1"
        >
          <IoExit className="text-lg min-w-4" />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default FacultySidebar;
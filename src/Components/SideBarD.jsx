import React from "react";
import { LuStethoscope } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa6";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";

const SideBarD = () => {
  return (
    <div className="bg-[#0B2648] w-64 h-screen p-5 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className="flex place-items-center text-white gap-4">
          <LuStethoscope
            size={30}
            className="bg-blue-400 text-white p-2 text-2xl rounded-md"
          />
          <h1 className="font-bold text-2xl">MedFlow</h1>
        </div>
      </div>

      <ul className="flex flex-col gap-5 justify-around mt-5 ">
        <li className="p-3 rounded-md bg-[#0B2648] hover:bg-[#0A1F3D] transition-colors duration-300">
          <NavLink className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            {" "}
            <IoAnalyticsOutline />
            <p>Overview</p>
          </NavLink>
        </li>
        <li className="p-3 rounded-md bg-[#0B2648] hover:bg-[#0A1F3D] transition-colors duration-300">
          <NavLink className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            {" "}
            <BsPeopleFill />
            <p>Patients</p>
          </NavLink>
        </li>
        <li className="p-3 rounded-md bg-[#0B2648] hover:bg-[#0A1F3D] transition-colors duration-300">
          <NavLink className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            {" "}
            <FaNewspaper />
            <p>Appointments</p>
          </NavLink>
        </li>
        <li className="p-3 rounded-md bg-[#0B2648] hover:bg-[#0A1F3D] transition-colors duration-300">
          <NavLink className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            {" "}
            <BsFileEarmarkSpreadsheetFill />
            <p>Prescriptions</p>
          </NavLink>
        </li>
        <li className="p-3 rounded-md bg-[#0B2648] hover:bg-[#0A1F3D] transition-colors duration-300">
          <NavLink className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            {" "}
            <LuBrain />
            <p>AI Insights</p>
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto">
        <NavLink
          to={"/login"}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
        >
          {" "}
          <CgProfile />
          <p>alimuzmmil294....</p>
          <PiSignOutBold />
        </NavLink>
      </div>
    </div>
  );
};

export default SideBarD;

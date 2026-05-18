import React from "react";
import { LuStethoscope } from "react-icons/lu";
import { links } from "../Constants/links";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-around bg-transparent p-2 md:p-4 lg:p-7 border-b border-gray-300">
      <div className="flex place-items-center gap-2">
        <LuStethoscope
          size={30}
          className="bg-blue-400 text-white p-2 text-3xl rounded-md"
        />
        <h1 className="font-bold text-2xl">MedFlow</h1>
      </div>
      <ul className="  hidden md:flex lg:flex items-center gap-6">
        {links.map((link) => (
          <li
            className="text-gray-500 hover:text-black transition-colors duration-300"
            key={link.id}
          >
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="flex text-[14px] gap-2">
        <NavLink
          to={"/login"}
          className="rounded-md p-1 md:p-2 lg:p-3 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] hover:bg-[#CFF2FE] text-black transition-colors duration-300"
        >
          Sign In
        </NavLink>
        <NavLink
          to={"/signup"}
          className="rounded-md px-1.5 py-1 md:p-2 lg:p-3 bg-[#0092E1] text-white hover:bg-[#0077B6] transition-colors duration-300"
        >
          Get Started
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

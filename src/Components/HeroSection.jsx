import React from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="container mx-auto">
      <div className=" bg-[#E4F1F9] sm:h-full lg:h-[90vh] flex items-center justify-center">
        <main className="flex flex-col w-[50%] mx-auto justify-start gap-6 py-20 ">
          <h1 className=" text-3xl text-center md:text-5xl lg:text-5xl  font-bold">
            The modern operating system for small clinics.
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Digital patient records, appointments, and prescriptions — with AI
            that assists doctors on diagnosis and explains it to patients in
            plain language.
          </p>
          <div className="flex flex-col  md:flex-row lg:flex-row gap-4">
            <NavLink
              to={"/signup"}
              className="rounded-md p-3 bg-[#0092E1] text-white hover:bg-[#0077B6] transition-colors duration-300"
            >
              Start Free Trial
            </NavLink>
            <NavLink
              to={"/login"}
              className="rounded-md px-1 py-2 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] hover:bg-[#CFF2FE] text-black transition-colors duration-300"
            >
              Login
            </NavLink>
          </div>
          <p className="text-sm text-gray-500">
            Role-based access · Encrypted records · HIPAA-friendly architecture
          </p>
        </main>
      </div>
    </div>
  );
};

export default HeroSection;

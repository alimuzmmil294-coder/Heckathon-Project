import React, { useState } from "react";
// Importing specific, high-quality icons from standard react-icons sub-packages
import { LuStethoscope, LuEye, LuEyeOff } from "react-icons/lu";
import { FaCircleCheck, FaSpinner } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  // 1. Core Form States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // 2. Input Change Handler
  const handleChange = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };
  // 4. Submission Simulation Pipeline
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password || formData.email === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }
    console.log(formData);

    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex min-h-screen w-full font-sans antialiased bg-white select-none">
      {/* LEFT PANEL: Branding & Visuals (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-[#0B2545] p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Decorative backdrop layout accent glow */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[50%] bg-[#13B0E8]/5 rounded-full blur-[120px]" />

        {/* Top Branding Section */}
        <NavLink className={"cursor-pointer flex flex-col"} to={"/"}>
          <div className="flex items-center gap-2 z-10">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#13B0E8] text-white shadow-sm">
              <LuStethoscope size={18} className="stroke-[2.5]" />
            </div>
            <span className="text-xl font-semibold tracking-wide">MedFlow</span>
          </div>
        </NavLink>

        {/* Marketing Core Text */}
        <div className="max-w-md space-y-4 z-10">
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white">
            The modern OS <br />
            for small clinics.
          </h1>
          <p className="text-slate-300 text-sm lg:text-base font-normal leading-relaxed max-w-[90%]">
            Digital records, smart scheduling, and AI assistance that respects
            clinical judgment.
          </p>
        </div>

        {/* Footnote branding label */}
        <div className="text-xs text-slate-400 font-light z-10">
          &copy; {new Date().getFullYear()} MedFlow Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Auth Form Interface Workspace */}
      <div className="flex flex-col w-full md:w-[55%] h-full  p-8 lg:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome Back to MedFlow
          </h1>
          <p className="text-gray-600 mb-8">Sign in to your account</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.password.length < 8 && formData.password.length > 0 ? (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <FaCircleCheck className="text-red-500" />
                Password must be at least 8 characters
              </p>
            ) : formData.password.length >= 8 ? (
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <FaCircleCheck className="text-green-500" />
                Password is valid
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className=" transition-all duration-300 bg-[#199DE4] hover:bg-[#157ABC] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
        <p className="text-gray-600 mt-4">
          New to MedFlow?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

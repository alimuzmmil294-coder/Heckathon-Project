import React, { useState } from "react";
// import { Stethoscope, Eye, EyeOff, Loader2, CheckCircle2 } from "react-icons";
import { LuStethoscope } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignupPage() {
  // 1. Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // 2. Input Change Handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(() => ({ ...formData, [id]: value }));
  };

  // 3. Validation Logic
  const validateForm = () => {
    const newErrors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Form Submission Simulation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulating API integration call
    console.log("Account registered successfully:", formData);

    if (formData.role === "Doctor") {
      navigate("/doctor-dashboard");
    } else if (formData.role === "Clinic Manager") {
      navigate("/clinic-manager-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans antialiased bg-white select-none">
      {/* LEFT PANEL: Brand Messaging (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-[#0B2545] p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Subtle geometric structural design element */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[50%] bg-[#13B0E8]/5 rounded-full blur-[120px]" />

        {/* App Branding */}
        <div className="flex items-center gap-2 z-10">
          <NavLink to={"/"} className={"flex items-center gap-2 z-10"}>
            {" "}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#13B0E8] text-white shadow-sm">
              <LuStethoscope size={19} className="stroke-[2.5]" />
            </div>
            <span className="text-xl font-semibold tracking-wide">MedFlow</span>
          </NavLink>
        </div>

        {/* Dynamic Typography Value Proposition */}
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

        {/* Alignment anchor bottom container node */}
        <div className="text-xs text-slate-400 font-light z-10">
          &copy; {new Date().getFullYear()} MedFlow Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Form Workspace */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 bg-white transition-all duration-300">
        {/* Header container configuration tailored for mobile alignment */}
        <div className="w-full max-w-md md:hidden flex items-center gap-2 mb-8 self-start">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#13B0E8] text-white">
            <LuStethoscope size={16} className="stroke-[2.5]" />
          </div>
          <span className="text-lg font-semibold tracking-wide text-[#0B2545]">
            MedFlow
          </span>
        </div>

        <div className="w-full max-w-md space-y-7">
          {/* Success Application State Screen */}
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                {/* <CheckCircle2 size={36} /> */}
              </div>
              <h2 className="text-2xl font-bold text-[#0B2545]">
                Welcome to MedFlow!
              </h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Your profile as a{" "}
                <span className="font-semibold text-[#0091DC]">
                  {formData.role}
                </span>{" "}
                has been configured. Let's build your dashboard workspace next.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-sm font-medium text-[#0091DC] hover:underline"
              >
                Reset form demo
              </button>
            </div>
          ) : (
            <>
              {/* Intent Header */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B2545] tracking-tight">
                  Create your account
                </h2>
                <p className="text-gray-400 text-sm font-normal">
                  Join your clinic in seconds
                </p>
              </div>

              {/* Form Entry Fieldsets */}
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Full Name input markup */}
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 bg-slate-50/50 transition-all duration-200 outline-none
                      ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-[#13B0E8] focus:ring-4 focus:ring-[#13B0E8]/10"
                      }`}
                    placeholder="Dr. John Doe"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium pt-0.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address input markup */}
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 bg-slate-50/50 transition-all duration-200 outline-none
                      ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-slate-200 focus:border-[#13B0E8] focus:ring-4 focus:ring-[#13B0E8]/10"
                      }`}
                    placeholder="name@clinic.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium pt-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input container incorporating custom visibility toggle action */}
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-4 pr-10 py-2.5 rounded-lg border text-sm text-gray-900 bg-slate-50/50 transition-all duration-200 outline-none
                        ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 focus:border-[#13B0E8] focus:ring-4 focus:ring-[#13B0E8]/10"
                        }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 font-medium pt-0.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Role dropdown styling and custom vector overlay chevron */}
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    htmlFor="role"
                  >
                    I am a
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#13B0E8]/10 focus:border-[#13B0E8] transition-all cursor-pointer"
                    >
                      <option value="Patient">Patient</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Clinic Manager">Clinic Manager</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-normal leading-normal pt-1">
                    Demo: choose your role to explore the matching dashboard.
                  </p>
                </div>

                {/* Primary Interaction Form Control Element */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full !mt-5 py-2.5 px-4 rounded-lg bg-[#0091DC] hover:bg-[#007bba] disabled:bg-[#0091DC]/70 text-white font-medium shadow-sm transition-colors duration-150 text-sm flex items-center justify-center gap-2 outline-none focus:ring-4 focus:ring-[#0091DC]/30"
                >
                  {isLoading ? (
                    <>
                      {/* <Loader2 size={16} className="animate-spin" /> */}
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              {/* Alternate route access pipeline node */}
              <div className="text-center text-sm text-gray-500 font-normal pt-1">
                Already have one?{" "}
                <NavLink
                  to="/login"
                  className="text-[#0091DC] hover:underline font-semibold transition-all"
                >
                  Sign in
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

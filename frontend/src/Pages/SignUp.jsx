import { useState } from "react";
import { LuStethoscope, LuLoaderCircle, LuTriangleAlert } from "react-icons/lu";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { registerApi } from "../services/api";

export default function SignupPage() {
  // 1. Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // 2. Input Change Handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (apiError) setApiError("");
  };

  // 3. Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please provide a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Form Submission with Backend MongoDB Registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const res = await registerApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (res?.token) {
        localStorage.setItem("medflow_token", res.token);
      }

      const userSession = res?.user || {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      localStorage.setItem("medflow_user", JSON.stringify(userSession));

      const targetRole = (res?.user?.role || formData.role || "")
        .toLowerCase()
        .replace(/\s+/g, "_");

      if (targetRole === "doctor") {
        navigate("/doctor-dashboard");
      } else if (targetRole === "clinic_manager") {
        navigate("/clinic-manager-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error("Account registration error:", err);
      setApiError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans antialiased bg-white select-none">
      {/* LEFT PANEL: Signature Medical Navy Branding */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-[#0B2545] p-12 lg:p-16 text-white relative overflow-hidden">
        {/* App Branding */}
        <div className="flex items-center gap-3 z-10">
          <NavLink to="/" className="flex items-center gap-3 text-white">
            <div className="bg-[#0092E1] text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
              <LuStethoscope size={22} />
            </div>
            <span className="text-2xl font-bold tracking-tight">MedFlow</span>
          </NavLink>
        </div>

        {/* Dynamic Typography Value Proposition */}
        <div className="max-w-md space-y-4 z-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
            The modern OS <br />
            for small clinics.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-[90%]">
            Digital records, smart scheduling, and clinical AI assistance that respects
            clinical judgment.
          </p>
        </div>

        {/* Alignment anchor bottom container node */}
        <div className="text-xs text-slate-400 font-normal z-10">
          &copy; {new Date().getFullYear()} MedFlow Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Form Workspace */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 bg-white">
        {/* Header container for mobile alignment */}
        <div className="w-full max-w-md md:hidden flex items-center gap-2.5 mb-8 self-start">
          <div className="bg-[#0092E1] text-white p-2 rounded-lg flex items-center justify-center shadow-sm">
            <LuStethoscope size={20} />
          </div>
          <span className="text-xl font-bold text-[#0B2545] tracking-tight">
            MedFlow
          </span>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Success Application State Screen */}
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-2">
                <FaCircleCheck size={28} />
              </div>
              <h2 className="text-xl font-bold text-[#0B2545]">
                Welcome to MedFlow!
              </h2>
              <p className="text-slate-500 text-xs max-w-xs mx-auto">
                Your profile as a{" "}
                <span className="font-semibold text-[#0B2545]">
                  {formData.role}
                </span>{" "}
                has been configured.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs font-semibold text-[#0091DC] hover:underline cursor-pointer"
              >
                Reset form demo
              </button>
            </div>
          ) : (
            <>
              {/* Intent Header */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
                  Create your account
                </h2>
                <p className="text-slate-500 text-xs">
                  Join your clinic in seconds with cloud sync
                </p>
              </div>

              {/* API Error Notification */}
              {apiError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                  <LuTriangleAlert size={16} className="text-rose-600 shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Form Entry Fieldsets */}
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
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
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 bg-white transition-all outline-none
                      ${
                        errors.name
                          ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                          : "border-slate-300 focus:border-[#0091DC] focus:ring-2 focus:ring-[#0091DC]"
                      }`}
                    placeholder="Dr. John Doe"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-600 font-medium pt-0.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
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
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-900 bg-white transition-all outline-none
                      ${
                        errors.email
                          ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                          : "border-slate-300 focus:border-[#0091DC] focus:ring-2 focus:ring-[#0091DC]"
                      }`}
                    placeholder="name@clinic.com"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 font-medium pt-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
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
                      className={`w-full pl-3.5 pr-10 py-2.5 rounded-lg border text-xs text-slate-900 bg-white transition-all outline-none
                        ${
                          errors.password
                            ? "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-slate-300 focus:border-[#0091DC] focus:ring-2 focus:ring-[#0091DC]"
                        }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-600 font-medium pt-0.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Role dropdown */}
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
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0091DC] transition-all cursor-pointer"
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
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full !mt-5 py-2.5 px-4 rounded-lg bg-[#0091DC] hover:bg-[#0077B6] disabled:bg-blue-300 text-white font-semibold shadow-sm transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-blue-400"
                >
                  {isLoading ? (
                    <>
                      <LuLoaderCircle size={15} className="animate-spin" />
                      <span>Creating database account...</span>
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              {/* Sign in link */}
              <div className="text-center text-xs text-slate-500 font-normal pt-1">
                Already have an account?{" "}
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

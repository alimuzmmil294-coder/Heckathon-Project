import { useState } from "react";
import { LuStethoscope, LuEye, LuEyeOff } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Doctor",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleQuickDemo = (role, email, name) => {
    const demoUser = {
      name,
      email,
      role,
    };
    localStorage.setItem("medflow_user", JSON.stringify(demoUser));
    if (role === "Doctor") navigate("/doctor-dashboard");
    else if (role === "Clinic Manager") navigate("/clinic-manager-dashboard");
    else navigate("/patient-dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password before submitting.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const userName = formData.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const userSession = {
      name: userName || "Dr. Alex Rivera",
      email: formData.email,
      role: formData.role,
    };

    localStorage.setItem("medflow_user", JSON.stringify(userSession));

    setTimeout(() => {
      setIsLoading(false);
      if (formData.role === "Doctor") {
        navigate("/doctor-dashboard");
      } else if (formData.role === "Clinic Manager") {
        navigate("/clinic-manager-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen w-full font-sans antialiased bg-white select-none">
      {/* LEFT PANEL: Branding & Visuals (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-[#0B2545] p-12 lg:p-16 text-white relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[50%] bg-[#13B0E8]/10 rounded-full blur-[120px]" />

        {/* Top Branding Section */}
        <NavLink className="cursor-pointer flex flex-col z-10" to="/">
          <div className="flex items-center gap-2">
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
          &copy; {new Date().getFullYear()} MedFlow. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Auth Form Interface Workspace */}
      <div className="flex flex-col justify-center w-full md:w-[55%] min-h-screen p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#13B0E8] text-white">
              <LuStethoscope size={16} />
            </div>
            <span className="text-lg font-bold text-[#0B2545]">MedFlow</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Sign in to access your clinic workspace
          </p>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              ⚡ Quick Demo 1-Click Access:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("Doctor", "dr.mitchell@clinic.com", "Dr. Sarah Mitchell")}
                className="py-1.5 px-2 bg-blue-50 text-[#0091DC] hover:bg-blue-100 text-xs font-semibold rounded border border-blue-200 transition-colors"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Patient", "alex.rivera@patient.com", "Alex Rivera")}
                className="py-1.5 px-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded border border-emerald-200 transition-colors"
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Clinic Manager", "admin@medflow.com", "Director Davis")}
                className="py-1.5 px-2 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold rounded border border-purple-200 transition-colors"
              >
                Manager
              </button>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@clinic.com"
                className="border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091DC] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091DC] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
              {formData.password.length >= 6 ? (
                <p className="text-emerald-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <FaCircleCheck size={12} /> Password valid
                </p>
              ) : formData.password.length > 0 ? (
                <p className="text-amber-600 text-xs mt-1.5 font-medium">
                  At least 6 characters required
                </p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="role">
                Select Your Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0091DC] transition-all cursor-pointer"
              >
                <option value="Doctor">Doctor (Clinical Portal)</option>
                <option value="Patient">Patient (Health Records)</option>
                <option value="Clinic Manager">Clinic Manager (Administration)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 transition-all duration-300 bg-[#0091DC] hover:bg-[#0077B6] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : `Sign in as ${formData.role}`}
            </button>
          </form>

          <p className="text-gray-600 text-sm text-center mt-6">
            New to MedFlow?{" "}
            <NavLink to="/signup" className="text-[#0091DC] font-semibold hover:underline">
              Create an account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

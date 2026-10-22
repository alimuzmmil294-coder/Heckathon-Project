import { useState } from "react";
import { LuStethoscope, LuEye, LuEyeOff, LuLoaderCircle, LuTriangleAlert } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { loginApi } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Doctor",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleQuickDemo = async (role, email, name) => {
    setFormData({
      email,
      password: "password123",
      role,
    });
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await loginApi({ email, password: "password123" });
      if (res?.token) {
        localStorage.setItem("medflow_token", res.token);
      }
      const user = res?.user || { name, email, role };
      localStorage.setItem("medflow_user", JSON.stringify(user));

      if (role === "Doctor") navigate("/doctor-dashboard");
      else if (role === "Clinic Manager") navigate("/clinic-manager-dashboard");
      else navigate("/patient-dashboard");
    } catch {
      // Graceful fallback for offline demo session
      const fallbackUser = { name, email, role };
      localStorage.setItem("medflow_user", JSON.stringify(fallbackUser));
      if (role === "Doctor") navigate("/doctor-dashboard");
      else if (role === "Clinic Manager") navigate("/clinic-manager-dashboard");
      else navigate("/patient-dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg("Please fill in both email and password before submitting.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await loginApi({
        email: formData.email,
        password: formData.password,
      });

      if (res?.token) {
        localStorage.setItem("medflow_token", res.token);
      }

      const userName =
        res?.user?.name ||
        formData.email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      const userSession = {
        name: userName,
        email: formData.email,
        role: res?.user?.role || formData.role,
      };

      localStorage.setItem("medflow_user", JSON.stringify(userSession));

      const targetRole = res?.user?.role || formData.role;
      if (targetRole === "Doctor") {
        navigate("/doctor-dashboard");
      } else if (targetRole === "Clinic Manager") {
        navigate("/clinic-manager-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error("Login authentication error:", err);
      setErrorMsg(err.message || "Invalid email or password. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans antialiased bg-white select-none">
      {/* LEFT PANEL: Neutral Dark Enterprise Branding */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-neutral-900 border-r border-neutral-800 p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Top Branding Section */}
        <NavLink className="cursor-pointer flex flex-col z-10" to="/">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-800 border border-neutral-700 text-white p-2.5 rounded-lg flex items-center justify-center shadow-xs">
              <LuStethoscope size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">MedFlow</span>
          </div>
        </NavLink>

        {/* Marketing Core Text */}
        <div className="max-w-md space-y-4 z-10">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
            The modern OS <br />
            for small clinics.
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-[90%]">
            Digital records, smart scheduling, and clinical AI assistance that respects
            clinical judgment.
          </p>
        </div>

        {/* Footnote branding label */}
        <div className="text-xs text-neutral-500 font-normal z-10">
          &copy; {new Date().getFullYear()} MedFlow Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Auth Form Interface Workspace */}
      <div className="flex flex-col justify-center w-full md:w-[55%] min-h-screen p-6 sm:p-10 lg:p-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2.5 mb-6">
            <div className="bg-neutral-900 text-white p-2 rounded-lg flex items-center justify-center">
              <LuStethoscope size={18} />
            </div>
            <span className="text-lg font-bold text-neutral-900 tracking-tight">MedFlow</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1.5 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-neutral-500 mb-6 text-xs sm:text-sm">
            Sign in to access your clinic workspace
          </p>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              ⚡ 1-Click Quick Demo Access (Seeded MongoDB Atlas):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("Doctor", "dr.mitchell@clinic.com", "Dr. Sarah Mitchell")}
                className="py-1.5 px-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-medium rounded-lg border border-neutral-200 shadow-xs transition-colors cursor-pointer text-center"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Patient", "alex.rivera@patient.com", "Alex Rivera")}
                className="py-1.5 px-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-medium rounded-lg border border-neutral-200 shadow-xs transition-colors cursor-pointer text-center"
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Clinic Manager", "admin@medflow.com", "Director Davis")}
                className="py-1.5 px-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-medium rounded-lg border border-neutral-200 shadow-xs transition-colors cursor-pointer text-center"
              >
                Manager
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-800 text-xs flex items-center gap-2">
              <LuTriangleAlert size={16} className="text-neutral-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1" htmlFor="email">
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
                className="border border-neutral-300 rounded-lg py-2.5 px-3.5 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1" htmlFor="password">
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
                  className="w-full border border-neutral-300 rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
              {formData.password.length >= 6 ? (
                <p className="text-emerald-700 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                  <FaCircleCheck size={12} /> Password valid
                </p>
              ) : formData.password.length > 0 ? (
                <p className="text-neutral-500 text-[11px] mt-1.5 font-medium">
                  At least 6 characters required
                </p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1" htmlFor="role">
                Select Your Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-neutral-300 rounded-lg py-2.5 px-3 text-xs bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all cursor-pointer"
              >
                <option value="Doctor">Doctor (Clinical Portal)</option>
                <option value="Patient">Patient (Health Records)</option>
                <option value="Clinic Manager">Clinic Manager (Administration)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-xs text-xs disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isLoading ? (
                <>
                  <LuLoaderCircle size={15} className="animate-spin" />
                  <span>Signing in with database...</span>
                </>
              ) : (
                `Sign in as ${formData.role}`
              )}
            </button>
          </form>

          <p className="text-neutral-500 text-xs text-center mt-6">
            New to MedFlow?{" "}
            <NavLink to="/signup" className="text-neutral-900 font-semibold hover:underline">
              Create an account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

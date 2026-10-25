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
      {/* LEFT PANEL: Signature Medical Navy Branding */}
      <div className="hidden md:flex flex-col justify-between w-[45%] bg-[#0B2545] p-12 lg:p-16 text-white relative overflow-hidden">
        {/* Top Branding Section */}
        <NavLink className="cursor-pointer flex flex-col z-10" to="/">
          <div className="flex items-center gap-3">
            <div className="bg-[#0092E1] text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
              <LuStethoscope size={22} />
            </div>
            <span className="text-2xl font-bold tracking-tight">MedFlow</span>
          </div>
        </NavLink>

        {/* Marketing Core Text */}
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

        {/* Footnote branding label */}
        <div className="text-xs text-slate-400 font-normal z-10">
          &copy; {new Date().getFullYear()} MedFlow Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Dynamic Auth Form Interface Workspace */}
      <div className="flex flex-col justify-center w-full md:w-[55%] min-h-screen p-6 sm:p-10 lg:p-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2.5 mb-6">
            <div className="bg-[#0092E1] text-white p-2 rounded-lg flex items-center justify-center shadow-sm">
              <LuStethoscope size={20} />
            </div>
            <span className="text-xl font-bold text-[#0B2545] tracking-tight">MedFlow</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] mb-1.5 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 mb-6 text-xs sm:text-sm">
            Sign in to access your clinic workspace
          </p>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
            <p className="text-[11px] font-bold text-[#0091DC] uppercase tracking-wider mb-2">
              ⚡ 1-Click Quick Demo Access (Seeded MongoDB Atlas):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("Doctor", "dr.mitchell@clinic.com", "Dr. Sarah Mitchell")}
                className="py-1.5 px-2 bg-blue-100/70 hover:bg-blue-200/80 text-[#0091DC] text-xs font-semibold rounded-lg border border-blue-200 transition-colors cursor-pointer text-center"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Patient", "alex.rivera@patient.com", "Alex Rivera")}
                className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors cursor-pointer text-center"
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("Clinic Manager", "admin@medflow.com", "Director Davis")}
                className="py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200 transition-colors cursor-pointer text-center"
              >
                Manager
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
              <LuTriangleAlert size={16} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

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
                className="border border-slate-300 rounded-lg py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0091DC] focus:border-transparent transition-all"
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
                  className="w-full border border-slate-300 rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0091DC] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
              {formData.password.length >= 6 ? (
                <p className="text-emerald-700 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                  <FaCircleCheck size={12} /> Password valid
                </p>
              ) : formData.password.length > 0 ? (
                <p className="text-amber-600 text-[11px] mt-1.5 font-medium">
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
                className="w-full border border-slate-300 rounded-lg py-2.5 px-3 text-xs bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0091DC] transition-all cursor-pointer"
              >
                <option value="Doctor">Doctor (Clinical Portal)</option>
                <option value="Patient">Patient (Health Records)</option>
                <option value="Clinic Manager">Clinic Manager (Administration)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 bg-[#0091DC] hover:bg-[#0077B6] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm text-xs disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer transition-colors focus:ring-2 focus:ring-blue-400"
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

          <p className="text-slate-600 text-xs text-center mt-6">
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

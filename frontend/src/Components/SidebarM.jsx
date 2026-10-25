import { useState } from "react";
import { LuStethoscope, LuX } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa6";
import { BsFileEarmarkSpreadsheetFill, BsPeopleFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { PiSignOutBold } from "react-icons/pi";

const SidebarM = ({ activeTab = "overview", setActiveTab, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const [userName] = useState(() => {
    try {
      const saved = localStorage.getItem("medflow_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) return parsed.name;
      }
    } catch (e) {
      console.warn("Could not read user state", e);
    }
    return "Director Davis";
  });

  const [userEmail] = useState(() => {
    try {
      const saved = localStorage.getItem("medflow_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) return parsed.email;
      }
    } catch (e) {
      console.warn("Could not read user state", e);
    }
    return "admin@medflow.com";
  });

  const handleSignOut = () => {
    localStorage.removeItem("medflow_user");
    navigate("/login");
  };

  const navItems = [
    { id: "overview", label: "Clinic Overview", icon: <IoAnalyticsOutline size={18} /> },
    { id: "staff", label: "Team & Staff Shifts", icon: <BsPeopleFill size={18} /> },
    { id: "appointments", label: "Clinic Schedule", icon: <FaNewspaper size={18} /> },
    { id: "prescriptions", label: "Pharmacy & Prescriptions", icon: <BsFileEarmarkSpreadsheetFill size={18} /> },
    { id: "analytics", label: "Billing & Settings", icon: <CiSettings size={18} /> },
  ];

  return (
    <>
      {/* Mobile / Tablet Backdrop (< 1024px) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Sidebar: Fixed Drawer on < 1024px, Sticky on Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B2648] border-r border-[#134375]/40 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
            <NavLink to="/" className="flex items-center gap-3 text-white">
              <div className="bg-[#0092E1] text-white p-2 rounded-lg flex items-center justify-center shadow-sm">
                <LuStethoscope size={20} />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none text-white tracking-tight">MedFlow</h1>
                <span className="text-[10px] text-purple-300 uppercase tracking-widest font-semibold">
                  Manager Portal
                </span>
              </div>
            </NavLink>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
              aria-label="Close Sidebar"
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-1.5 mt-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab(item.id);
                      if (setMobileOpen) setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#134375] text-white font-semibold shadow-sm border-l-4 border-purple-400"
                        : "text-slate-300 hover:bg-[#0E325D] hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Profile & Sign Out Footer */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 bg-[#081C35] rounded-lg border border-slate-700/60">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {userName.charAt(0) || "M"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-rose-300 hover:text-white hover:bg-rose-900/30 rounded-lg transition-colors border border-rose-500/20 cursor-pointer"
          >
            <PiSignOutBold size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarM;

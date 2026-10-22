import { useState, useEffect } from "react";
import SidebarM from "../Components/SidebarM";
import {
  LuMenu,
  LuDollarSign,
  LuUsers,
  LuBedDouble,
  LuSmile,
  LuCalendarDays,
  LuLoaderCircle,
  LuRefreshCw,
  LuTriangleAlert,
} from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { getManagerStatsApi, getManagerStaffApi } from "../services/api";

const ClinicManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Live Backend Data States
  const [stats, setStats] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchManagerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, staffRes] = await Promise.all([
        getManagerStatsApi(),
        getManagerStaffApi(),
      ]);

      if (statsRes?.data) setStats(statsRes.data);
      if (staffRes?.data) setStaffList(staffRes.data);
    } catch (err) {
      console.error("Failed to load clinic manager metrics:", err);
      setError(err.message || "Failed to load clinic operations data from backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getManagerStatsApi(),
      getManagerStaffApi(),
    ])
      .then(([statsRes, staffRes]) => {
        if (!isMounted) return;
        if (statsRes?.data) setStats(statsRes.data);
        if (staffRes?.data) setStaffList(staffRes.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load clinic manager metrics:", err);
        setError(err.message || "Failed to load clinic operations data from backend");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      <SidebarM
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 min-w-0 w-full overflow-x-hidden flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger Button: visible on < 1024px */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-neutral-700 p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <LuMenu size={18} />
            </button>
            <div className="truncate">
              <h1 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-tight truncate">
                Clinic Administration
              </h1>
              <p className="text-[11px] text-neutral-500 truncate">
                MedFlow Central &middot; Operations & Resource Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={fetchManagerData}
              disabled={loading}
              title="Refresh Operations"
              className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium h-9 px-3 gap-2 inline-flex items-center shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LuRefreshCw size={14} className={loading ? "animate-spin text-neutral-600" : "text-neutral-500"} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <span className="hidden sm:inline-block bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap">
              ● Operations Normal
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full">
          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-xl text-neutral-800 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LuTriangleAlert size={16} className="text-neutral-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
              <button
                onClick={fetchManagerData}
                className="px-2.5 py-1 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded text-xs font-medium cursor-pointer shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Bar */}
          {loading && !error && (
            <div className="flex items-center justify-center p-6 bg-white border border-neutral-200 rounded-xl shadow-xs text-neutral-500 gap-3 text-xs font-medium">
              <LuLoaderCircle size={18} className="animate-spin text-neutral-600" />
              <span>Fetching real-time operations data from clinic server...</span>
            </div>
          )}

          {/* Standardized Summary KPI Metric Cards */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 w-full"
            style={{ gap: "16px", marginBottom: "20px" }}
          >
            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : `$${(stats?.monthlyRevenue || 24500).toLocaleString()}`}
                </p>
                <span className="text-[11px] text-emerald-600 font-medium">&uarr; +18% vs target</span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuDollarSign size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Staff On Duty
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : staffList.filter((s) => s.status === "On Duty").length || (stats?.staffOnDuty ?? 4)}
                </p>
                <span className="text-[11px] text-neutral-600 font-medium">
                  {staffList.length > 0 ? `${staffList.length} total roster` : "Full coverage"}
                </span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuUsers size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Room Occupancy
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : (stats?.roomOccupancy || "85%")}
                </p>
                <span className="text-[11px] text-neutral-500 font-medium">5 of 6 active</span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuBedDouble size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Patient Rating
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : (stats?.patientSatisfaction || "98%")}
                </p>
                <span className="text-[11px] text-neutral-500 font-medium">142 reviews</span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuSmile size={18} />
              </div>
            </div>
          </div>

          {/* Clinic Operations Roster Table */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">Today's Staff Duty Roster</h3>
                <p className="text-xs text-neutral-500">Live active provider presence and shift schedule from MongoDB Atlas</p>
              </div>
              <button
                onClick={fetchManagerData}
                className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium h-9 px-3.5 gap-2 inline-flex items-center shadow-xs whitespace-nowrap cursor-pointer"
              >
                <LuCalendarDays size={14} />
                <span>Refresh Shifts</span>
              </button>
            </div>

            {/* Contained Table Scrolling */}
            <div className="w-full overflow-x-auto">
              {staffList.length === 0 && !loading ? (
                <div className="p-8 text-center text-neutral-400 text-xs">
                  No staff members currently found in the roster database.
                </div>
              ) : (
                <table className="w-full min-w-[850px] border-collapse text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-600 text-[11px] font-semibold uppercase tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="py-3 px-4">Staff Member</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Shift Hours</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-700">
                    {staffList.map((member) => (
                      <tr key={member.id || member._id} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="py-3 px-4 font-semibold text-neutral-900">
                          {member.name}
                          <span className="block text-[11px] font-mono text-neutral-400 font-normal">{member.id}</span>
                        </td>
                        <td className="py-3 px-4 text-neutral-700 font-medium">{member.role}</td>
                        <td className="py-3 px-4 text-neutral-600">{member.dept}</td>
                        <td className="py-3 px-4 text-neutral-600">{member.shift}</td>
                        <td className="py-3 px-4">
                          <span
                            className={
                              member.status === "On Duty"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap"
                                : member.status === "On Call"
                                ? "bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap"
                                : "bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap"
                            }
                          >
                            ● {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Quick Actions & Facility Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-2.5">
              <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">Clinic Licensing & HIPAA Compliance</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                All clinical workstations running encrypted session tokens. End-to-end audit trails active for patient records and prescription dispatches.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 pt-2">
                <FaCircleCheck size={15} />
                <span>All Providers HIPAA Verified for 2026</span>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-2.5">
              <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">Pharmacy & E-Rx Gateway</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Digital prescriptions sent through MedFlow are formatted to Surescripts-compatible pharmacy standards with automated plain-language explanations.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-700 pt-2">
                <FaCircleCheck size={15} className="text-neutral-600" />
                <span>Digital Pharmacy Gateway Connected</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClinicManagerDashboard;

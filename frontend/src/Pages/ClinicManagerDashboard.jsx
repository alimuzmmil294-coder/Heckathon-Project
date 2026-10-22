import { useState } from "react";
import SidebarM from "../Components/SidebarM";
import {
  LuMenu,
  LuDollarSign,
  LuUsers,
  LuBedDouble,
  LuSmile,
  LuCalendarDays,
} from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";

const STAFF_MEMBERS = [
  { id: "STF-01", name: "Dr. Sarah Mitchell", role: "Attending Physician", dept: "Internal Medicine", shift: "Morning (08:00 - 16:00)", status: "On Duty" },
  { id: "STF-02", name: "Dr. James Wilson", role: "Cardiology Consultant", dept: "Cardiology", shift: "Afternoon (12:00 - 18:00)", status: "On Call" },
  { id: "STF-03", name: "Elena Rostova, RN", role: "Lead Triage Nurse", dept: "Emergency & Intake", shift: "Morning (07:00 - 15:30)", status: "On Duty" },
  { id: "STF-04", name: "Marcus Vance", role: "Head Receptionist", dept: "Front Desk & Scheduling", shift: "Day (08:30 - 17:00)", status: "On Duty" },
  { id: "STF-05", name: "Chloe Bennett, PharmD", role: "Clinical Pharmacist", dept: "Pharmacy & E-Rx", shift: "Day (09:00 - 17:30)", status: "On Duty" },
];

const ClinicManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarM
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <LuMenu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Clinic Administration</h1>
              <p className="text-xs text-slate-500">
                MedFlow Central Clinic &middot; Operations & Resource Management
              </p>
            </div>
          </div>

          <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1 rounded-full border border-purple-200">
            Clinic Status: Operational
          </span>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Revenue</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">$24,500</p>
                <span className="text-[11px] text-emerald-600 font-semibold">&uarr; +18% vs last month</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <LuDollarSign size={24} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff On Duty</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">8</p>
                <span className="text-[11px] text-blue-600 font-semibold">2 Doctors, 3 Nurses, 3 Staff</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0091DC] flex items-center justify-center">
                <LuUsers size={24} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Room Occupancy</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">85%</p>
                <span className="text-[11px] text-amber-600 font-semibold">5 of 6 rooms active</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <LuBedDouble size={24} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Rating</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">98%</p>
                <span className="text-[11px] text-purple-600 font-semibold">142 verified reviews</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <LuSmile size={24} />
              </div>
            </div>
          </div>

          {/* Clinic Operations Roster Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Staff Duty Roster</h3>
                <p className="text-xs text-slate-500">Live active provider presence and shift schedule</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">
                <LuCalendarDays size={14} />
                <span>Manage Shifts</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Staff Member</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Shift Hours</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {STAFF_MEMBERS.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {member.name}
                        <span className="block text-[11px] font-mono text-slate-400 font-normal">{member.id}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{member.role}</td>
                      <td className="py-3.5 px-4 text-slate-600">{member.dept}</td>
                      <td className="py-3.5 px-4 text-slate-600">{member.shift}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            member.status === "On Duty"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          ● {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions & Facility Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Clinic Licensing & HIPAA Compliance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All clinical workstations running encrypted session tokens. End-to-end audit trails active for patient records and prescription dispatches.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 pt-2">
                <FaCircleCheck size={16} />
                <span>All 4 Providers HIPAA Verified for 2026</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Pharmacy & E-Rx Integration</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Digital prescriptions sent through MedFlow are formatted to Surescripts-compatible pharmacy standards with automated plain-language explanations.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 pt-2">
                <FaCircleCheck size={16} />
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

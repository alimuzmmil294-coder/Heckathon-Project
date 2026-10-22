import { useState } from "react";
import SideBar from "../Components/SideBar";
import {
  LuMenu,
  LuCalendar,
  LuPill,
  LuFileText,
  LuDownload,
  LuX,
  LuClock,
} from "react-icons/lu";
import { FaUserDoctor, FaCircleCheck } from "react-icons/fa6";
import { BsHeartPulse } from "react-icons/bs";

const SAMPLE_PRESCRIPTIONS = [
  {
    id: "RX-801",
    drug: "Amoxicillin-Clavulanate (Augmentin)",
    dosage: "875/125 mg",
    frequency: "Twice daily with meals",
    duration: "7 days",
    prescribedBy: "Dr. Sarah Mitchell, MD",
    date: "Oct 20, 2026",
    status: "Active",
    aiExplanation:
      "Augmentin is an antibiotic that fights the bacterial infection in your airways. Taking it with food helps protect your stomach. Be sure to finish all pills even if you start feeling completely recovered.",
  },
  {
    id: "RX-742",
    drug: "Cetirizine (Zyrtec)",
    dosage: "10 mg",
    frequency: "Once daily before bedtime",
    duration: "30 days",
    prescribedBy: "Dr. Sarah Mitchell, MD",
    date: "Sep 12, 2026",
    status: "Active",
    aiExplanation:
      "Cetirizine is an antihistamine that reduces allergies, sneezing, and sinus irritation from seasonal allergens.",
  },
];

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar with mobile drawer toggle */}
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <LuMenu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Patient Portal</h1>
              <p className="text-xs text-slate-500">
                Welcome back &middot; MedFlow Patient Health Record Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              ● Primary Care Active
            </span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8 space-y-8 max-w-6xl">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Visits</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">1</p>
                <span className="text-[11px] text-blue-600 font-semibold">Tomorrow at 10:30 AM</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0091DC] flex items-center justify-center">
                <LuCalendar size={24} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Prescriptions</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">2</p>
                <span className="text-[11px] text-emerald-600 font-semibold">All refills authorized</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <LuPill size={24} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medical Records</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">5</p>
                <span className="text-[11px] text-purple-600 font-semibold">Vitals & Labs up to date</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <BsHeartPulse size={24} />
              </div>
            </div>
          </div>

          {/* Next Upcoming Appointment Card */}
          <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0091DC] flex items-center justify-center">
                  <FaUserDoctor size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    Confirmed Visit
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">Consultation with Dr. Sarah Mitchell</h3>
                  <p className="text-xs text-slate-500">General Practice &middot; MedFlow Central Clinic (Room 304)</p>
                </div>
              </div>

              <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
                  <LuClock size={16} className="text-[#0091DC]" />
                  <span>Tomorrow &middot; 10:30 AM</span>
                </div>
                <span className="text-xs text-slate-400">Duration: ~20 mins</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Reason for visit: </span>
                Follow-up respiratory checkup & prescription refill review.
              </p>
              <button
                onClick={() => setCheckedIn(!checkedIn)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer ${
                  checkedIn
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0092E1] hover:bg-[#0077B6] text-white"
                }`}
              >
                {checkedIn ? "✓ Pre-Arrival Checked In" : "Pre-Check In Online"}
              </button>
            </div>
          </div>

          {/* Active E-Prescriptions with AI Plain Language Explanations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Active E-Prescriptions</h3>
                <p className="text-xs text-slate-500">
                  Reviewed by your doctor with AI plain-language medication summaries
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">Updated 2 days ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_PRESCRIPTIONS.map((rx) => (
                <div
                  key={rx.id}
                  className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{rx.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{rx.drug}</h4>
                      <p className="text-xs text-slate-500">{rx.dosage} &middot; {rx.frequency}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {rx.status}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0091DC] flex items-center gap-1 mb-1">
                      <LuFileText size={12} /> Plain-Language AI Explanation:
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">{rx.aiExplanation}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">Prescribed by {rx.prescribedBy}</span>
                    <button
                      onClick={() => {
                        setSelectedRx(rx);
                        setDownloadSuccess(false);
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-[#0091DC] hover:text-[#0077B6]"
                    >
                      <LuDownload size={14} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prescription Download Modal */}
        {selectedRx && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Digital Prescription Receipt</h3>
                  <p className="text-xs text-slate-500">Official MedFlow Electronic Health Document</p>
                </div>
                <button
                  onClick={() => setSelectedRx(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <LuX size={18} />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Prescription ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedRx.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Medication:</span>
                  <span className="font-bold text-slate-800">{selectedRx.drug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dosage:</span>
                  <span className="font-semibold text-slate-800">{selectedRx.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Physician:</span>
                  <span className="font-semibold text-slate-800">{selectedRx.prescribedBy}</span>
                </div>
              </div>

              {downloadSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                  <FaCircleCheck size={18} className="text-emerald-600 shrink-0" />
                  <span>Prescription PDF generated and downloaded successfully!</span>
                </div>
              ) : null}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedRx(null)}
                  className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => setDownloadSuccess(true)}
                  className="px-4 py-2 bg-[#0092E1] hover:bg-[#0077B6] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <LuDownload size={14} />
                  <span>Download Signed PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;

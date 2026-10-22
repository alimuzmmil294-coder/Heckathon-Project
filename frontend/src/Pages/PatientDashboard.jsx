import { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import {
  LuMenu,
  LuCalendar,
  LuPill,
  LuFileText,
  LuDownload,
  LuX,
  LuClock,
  LuLoaderCircle,
  LuRefreshCw,
  LuTriangleAlert,
} from "react-icons/lu";
import { FaUserDoctor, FaCircleCheck } from "react-icons/fa6";
import { BsHeartPulse } from "react-icons/bs";
import {
  getPatientProfileApi,
  getPatientAppointmentsApi,
  getPatientPrescriptionsApi,
} from "../services/api";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  // Live Backend Data States
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [profRes, aptRes, rxRes] = await Promise.all([
        getPatientProfileApi(),
        getPatientAppointmentsApi(),
        getPatientPrescriptionsApi(),
      ]);

      if (profRes?.data) setProfile(profRes.data);
      if (aptRes?.data) setAppointments(aptRes.data);
      if (rxRes?.data) setPrescriptions(rxRes.data);
    } catch (err) {
      console.error("Failed to load patient records:", err);
      setError(err.message || "Failed to load live data from backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getPatientProfileApi(),
      getPatientAppointmentsApi(),
      getPatientPrescriptionsApi(),
    ])
      .then(([profRes, aptRes, rxRes]) => {
        if (!isMounted) return;
        if (profRes?.data) setProfile(profRes.data);
        if (aptRes?.data) setAppointments(aptRes.data);
        if (rxRes?.data) setPrescriptions(rxRes.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load patient records:", err);
        setError(err.message || "Failed to load live data from backend");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const upcomingVisits = appointments.filter((a) => a.status !== "Completed");
  const nextAppointment = upcomingVisits[0] || appointments[0];
  const activeRxCount = prescriptions.length;
  const medicalRecordsCount =
    (profile?.allergies?.length || 0) +
    (profile?.chronicConditions?.length || 0) +
    appointments.length;

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Sidebar with mobile drawer toggle */}
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full overflow-x-hidden flex flex-col">
        {/* Top Header */}
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
                Patient Portal
              </h1>
              <p className="text-[11px] text-neutral-500 truncate">
                Welcome back{profile?.fullName ? `, ${profile.fullName}` : ""} &middot; MedFlow Health Record
              </p>
            </div>
          </div>

          {/* Grouped Header Actions Toolbar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={fetchPatientData}
              disabled={loading}
              title="Refresh Records"
              className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium h-9 px-3 gap-2 inline-flex items-center shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LuRefreshCw size={14} className={loading ? "animate-spin text-neutral-600" : "text-neutral-500"} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <span className="hidden sm:inline-block bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap">
              ● Primary Care Active
            </span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full">
          {/* Error Banner */}
          {error && (
            <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-xl text-neutral-800 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LuTriangleAlert size={16} className="text-neutral-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
              <button
                onClick={fetchPatientData}
                className="px-2.5 py-1 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded text-xs font-medium cursor-pointer shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && !error && (
            <div className="flex items-center justify-center p-6 bg-white border border-neutral-200 rounded-xl shadow-xs text-neutral-500 gap-3 text-xs font-medium">
              <LuLoaderCircle size={18} className="animate-spin text-neutral-600" />
              <span>Syncing live health records with clinical database...</span>
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
                  Upcoming Visits
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : upcomingVisits.length}
                </p>
                <span className="text-[11px] text-neutral-600 font-medium">
                  {nextAppointment ? `${nextAppointment.date}` : "None scheduled"}
                </span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuCalendar size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Active Prescriptions
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : activeRxCount}
                </p>
                <span className="text-[11px] text-emerald-600 font-medium">
                  {activeRxCount > 0 ? "Authorized" : "No active meds"}
                </span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <LuPill size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Medical Records
                </p>
                <p className="text-2xl font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  {loading ? "..." : medicalRecordsCount}
                </p>
                <span className="text-[11px] text-neutral-500 font-medium">Vitals & Labs sync</span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <BsHeartPulse size={18} />
              </div>
            </div>

            <div
              className="bg-white border border-neutral-200 rounded-xl shadow-xs flex items-center justify-between"
              style={{ padding: "18px 20px" }}
            >
              <div className="min-w-0 pr-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap truncate">
                  Care Physician
                </p>
                <p className="text-base font-bold text-neutral-900 tracking-tight whitespace-nowrap mt-1">
                  Dr. S. Mitchell
                </p>
                <span className="text-[11px] text-neutral-500 font-medium">Internal Medicine</span>
              </div>
              <div
                className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                style={{ width: "38px", height: "38px" }}
              >
                <FaUserDoctor size={17} />
              </div>
            </div>
          </div>

          {/* Next Upcoming Appointment Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-xs">
            {nextAppointment ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                      style={{ width: "38px", height: "38px" }}
                    >
                      <FaUserDoctor size={18} />
                    </div>
                    <div>
                      <span className="bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2 py-0.5 whitespace-nowrap">
                        {nextAppointment.status || "Confirmed Visit"}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 mt-1">
                        Consultation with {nextAppointment.doctorName || "Dr. Sarah Mitchell"}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {nextAppointment.specialty || "General Practice"} &middot; MedFlow Central Clinic ({nextAppointment.room || "Room 304"})
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                      <LuClock size={14} className="text-neutral-500" />
                      <span>{nextAppointment.date} &middot; {nextAppointment.time}</span>
                    </div>
                    <span className="text-neutral-400">Duration: ~20 mins</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-900">Reason for visit: </span>
                    {nextAppointment.reason || "Routine consultation checkup and health evaluation."}
                  </p>
                  <button
                    onClick={() => setCheckedIn(!checkedIn)}
                    className={`h-9 px-4 text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5 shrink-0 ${
                      checkedIn
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                    }`}
                  >
                    {checkedIn ? "✓ Pre-Arrival Checked In" : "Pre-Check In Online"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-neutral-500 space-y-1">
                <LuCalendar size={28} className="mx-auto text-neutral-400 mb-2" />
                <h4 className="font-bold text-neutral-900 text-xs">No Upcoming Appointments</h4>
                <p className="text-[11px] text-neutral-400">You currently have no scheduled appointments on file.</p>
              </div>
            )}
          </div>

          {/* Active E-Prescriptions with AI Plain Language Explanations */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">Your Active E-Prescriptions</h3>
                <p className="text-xs text-neutral-500">
                  Reviewed by your doctor with AI plain-language medication summaries
                </p>
              </div>
              <span className="bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2.5 py-1 whitespace-nowrap">
                Live from EHR
              </span>
            </div>

            {prescriptions.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-neutral-200 rounded-xl text-neutral-500 space-y-2">
                <LuPill size={28} className="mx-auto text-neutral-400" />
                <p className="text-xs font-semibold text-neutral-700">No Prescriptions on Record</p>
                <p className="text-[11px] text-neutral-400">
                  Your electronic prescriptions issued by your physician will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((rx) => {
                  const displayId = rx.id ? `RX-${String(rx.id).slice(-4).toUpperCase()}` : "RX-LIVE";
                  return (
                    <div
                      key={rx.id}
                      className="p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 shadow-xs transition-all space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-neutral-400">
                            {displayId}
                          </span>
                          <h4 className="font-bold text-neutral-900 text-xs mt-0.5">{rx.drug}</h4>
                          <p className="text-xs text-neutral-500">
                            {rx.dosage} {rx.frequency ? `&middot; ${rx.frequency}` : ""}
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[11px] font-medium px-2 py-0.5 whitespace-nowrap">
                          {rx.status || "Active"}
                        </span>
                      </div>

                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200/80">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 flex items-center gap-1 mb-1">
                          <LuFileText size={12} /> Plain-Language AI Explanation:
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {rx.aiExplanation || "Follow all prescribed physician directions carefully."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-neutral-400">
                          Prescribed by {rx.doctorName || "Dr. Sarah Mitchell"}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedRx(rx);
                            setDownloadSuccess(false);
                          }}
                          className="h-7 px-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-md inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                        >
                          <LuDownload size={13} />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Prescription Download Modal */}
        {selectedRx && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative space-y-4 border border-neutral-200">
              <div className="flex justify-between items-start border-b border-neutral-200 pb-3">
                <div>
                  <h3 className="font-bold text-base text-neutral-900">Digital Prescription Receipt</h3>
                  <p className="text-xs text-neutral-500">Official MedFlow Electronic Health Document</p>
                </div>
                <button
                  onClick={() => setSelectedRx(null)}
                  className="text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
                >
                  <LuX size={18} />
                </button>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Prescription ID:</span>
                  <span className="font-mono font-bold text-neutral-800">
                    {selectedRx.id ? `RX-${String(selectedRx.id).slice(-4).toUpperCase()}` : "RX-DOC"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Medication:</span>
                  <span className="font-bold text-neutral-800">{selectedRx.drug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Dosage:</span>
                  <span className="font-semibold text-neutral-800">{selectedRx.dosage || "As directed"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Physician:</span>
                  <span className="font-semibold text-neutral-800">{selectedRx.doctorName || "Dr. Sarah Mitchell"}</span>
                </div>
                {selectedRx.diagnosis && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Diagnosis:</span>
                    <span className="font-semibold text-neutral-800">{selectedRx.diagnosis}</span>
                  </div>
                )}
              </div>

              {downloadSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                  <FaCircleCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>Prescription PDF generated and downloaded successfully!</span>
                </div>
              ) : null}

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setSelectedRx(null)}
                  className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium h-9 px-3.5 inline-flex items-center shadow-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => setDownloadSuccess(true)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium h-9 px-4 gap-1.5 inline-flex items-center shadow-xs cursor-pointer"
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

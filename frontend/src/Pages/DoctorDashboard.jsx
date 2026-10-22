import { useState } from "react";
import SideBarD from "../Components/SideBarD";
import {
  LuBrain,
  LuSparkles,
  LuMenu,
  LuFileText,
  LuPrinter,
  LuX,
  LuActivity,
} from "react-icons/lu";
import { FaUserDoctor, FaCalendarCheck, FaCircleCheck } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";

const SAMPLE_CASES = [
  {
    label: "Case 1: Respiratory / Pneumonia",
    symptoms:
      "42-year-old male with persistent dry-to-productive cough for 4 days, fever reaching 101.8°F, fatigue, and mild dyspnea on mild exertion. Auscultation reveals left lower lobe crackles.",
  },
  {
    label: "Case 2: Cardiac / Chest Pain",
    symptoms:
      "58-year-old female presenting with sudden retrosternal tightness radiating to left shoulder and jaw, accompanied by mild nausea and diaphoresis for 45 minutes.",
  },
  {
    label: "Case 3: Seasonal Allergy / Bronchospasm",
    symptoms:
      "29-year-old female experiencing severe rhinorrhea, paroxysmal sneezing, nocturnal wheezing, and bilateral ocular itching following pollen exposure.",
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-201",
    patient: "Emily Jenkins",
    time: "09:00 AM",
    type: "In-Person",
    reason: "Severe migraine with visual aura",
    status: "Completed",
    room: "Exam Room 1",
  },
  {
    id: "APT-202",
    patient: "Michael Chang",
    time: "10:15 AM",
    type: "Follow-up",
    reason: "Hypertension medication titration",
    status: "In Progress",
    room: "Exam Room 2",
  },
  {
    id: "APT-203",
    patient: "Sophia Martinez",
    time: "11:30 AM",
    type: "In-Person",
    reason: "Persistent productive cough, fatigue",
    status: "Confirmed",
    room: "Exam Room 1",
  },
  {
    id: "APT-204",
    patient: "David Kim",
    time: "02:00 PM",
    type: "Telehealth",
    reason: "Routine lipid panel lab review",
    status: "Confirmed",
    room: "Virtual Room A",
  },
  {
    id: "APT-205",
    patient: "Hannah Baker",
    time: "03:15 PM",
    type: "In-Person",
    reason: "Allergic rhinitis & inhaler refill",
    status: "Confirmed",
    room: "Exam Room 3",
  },
  {
    id: "APT-206",
    patient: "Robert Evans",
    time: "04:30 PM",
    type: "Follow-up",
    reason: "Post-op wound check & suture check",
    status: "Confirmed",
    room: "Exam Room 2",
  },
];

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  // AI Copilot State
  const [symptomInput, setSymptomInput] = useState(SAMPLE_CASES[0].symptoms);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Prescription Modal State
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("Sophia Martinez");
  const [rxSuccess, setRxSuccess] = useState(false);

  const handleRunAiAnalysis = () => {
    if (!symptomInput.trim()) {
      alert("Please provide clinical symptoms to analyze.");
      return;
    }

    setIsAiLoading(true);

    setTimeout(() => {
      setIsAiLoading(false);
      const lower = symptomInput.toLowerCase();

      if (lower.includes("chest") || lower.includes("shoulder") || lower.includes("heart")) {
        setAiResult({
          condition: "Chest Pain / Suspected Acute Coronary Syndrome",
          urgency: "CRITICAL",
          differentials: [
            { name: "Acute Coronary Syndrome (NSTEMI / STEMI Rule-Out)", prob: "82%", badge: "High Risk" },
            { name: "Costochondritis / Musculoskeletal Chest Wall Strain", prob: "45%", badge: "Moderate" },
            { name: "Gastroesophageal Reflux (GERD) with Esophageal Spasm", prob: "38%", badge: "Standard" },
          ],
          tests: [
            "Immediate 12-lead Electrocardiogram (ECG) within 10 minutes",
            "Serial High-Sensitivity Cardiac Troponin (hs-cTnI) at 0h and 2h",
            "Basic Metabolic Panel & Portable Chest X-Ray",
          ],
          redFlags: [
            "Radiation of pain to left jaw, back, or left arm",
            "Diaphoresis with hemodynamic instability or hypotension",
            "Resting tachycardia > 115 bpm or severe diaphoresis",
          ],
          suggestedRx: {
            drug: "Aspirin 324 mg (Chewable) + Sublingual Nitroglycerin 0.4mg",
            rationale: "Antiplatelet therapy and coronary vasodilation pending ECG rule-out.",
          },
        });
      } else {
        setAiResult({
          condition: "Respiratory Infection / Bronchopulmonary Disorder",
          urgency: "Moderate to High",
          differentials: [
            { name: "Community-Acquired Atypical Pneumonia", prob: "78%", badge: "Likely" },
            { name: "Acute Viral Bronchitis", prob: "64%", badge: "Possible" },
            { name: "COVID-19 / Influenza Viral Infiltration", prob: "52%", badge: "Consider" },
          ],
          tests: [
            "Posteroanterior (PA) & Lateral Chest Radiograph",
            "Complete Blood Count (CBC) with Differential",
            "Pulse Oximetry continuous SpO2 monitoring (flag if < 94%)",
            "Multiplex Respiratory PCR Swab",
          ],
          redFlags: [
            "Resting SpO2 saturation drops below 93% on ambient air",
            "Onset of pleuritic chest pain or hemoptysis",
            "Tachypnea with respiratory rate > 24 breaths/min",
          ],
          suggestedRx: {
            drug: "Amoxicillin-Clavulanate 875/125mg PO BID x 7d + Benzonatate 100mg PO TID PRN",
            rationale: "Broad empirical bacterial airway coverage with non-narcotic cough suppression.",
          },
        });
      }
    }, 1200);
  };

  const handleQuickLoadCase = (caseObj) => {
    setSymptomInput(caseObj.symptoms);
    setAiResult(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Responsive Sidebar */}
      <SideBarD
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <LuMenu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Doctor Workspace</h1>
              <p className="text-xs text-slate-500">
                Clinic: <span className="font-semibold text-slate-700">MedFlow Central Clinic</span> &middot; Shift: Morning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("ai");
                if (!aiResult) handleRunAiAnalysis();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-50 text-[#0091DC] border border-cyan-200 rounded-lg text-xs font-semibold hover:bg-cyan-100 transition-colors shadow-sm"
            >
              <LuSparkles size={14} className="text-[#0091DC]" />
              <span>Launch AI Copilot</span>
            </button>

            <button
              onClick={() => {
                setSelectedPatient("Sophia Martinez");
                setShowPrescriptionModal(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#0092E1] text-white rounded-lg text-xs font-semibold hover:bg-[#0077B6] transition-colors shadow-sm"
            >
              <LuFileText size={14} />
              <span>New E-Prescription</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-6 md:p-8 space-y-8 max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Patients</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">24</p>
                    <span className="text-[11px] text-emerald-600 font-semibold">&uarr; +12% this month</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0091DC] flex items-center justify-center">
                    <BsPeopleFill size={24} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appointments Today</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">6</p>
                    <span className="text-[11px] text-blue-600 font-semibold">2 Completed, 1 In-Prog</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FaCalendarCheck size={22} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Labs</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">3</p>
                    <span className="text-[11px] text-amber-600 font-semibold">1 Critical X-Ray</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <LuActivity size={24} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consultations</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">8</p>
                    <span className="text-[11px] text-slate-500">Average 14 mins</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <FaUserDoctor size={22} />
                  </div>
                </div>
              </div>

              {/* AI Copilot Showcase Feature Banner */}
              <div className="bg-gradient-to-r from-[#0B2545] to-[#123E72] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30">
                      <LuSparkles size={14} />
                      <span>MedFlow AI Diagnosis Assist</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">AI Clinical Copilot for Differential Diagnosis</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Enter patient symptoms to instantly generate structured differential diagnoses, recommended lab tests, and clinical red flags calibrated for primary care.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("ai");
                      if (!aiResult) handleRunAiAnalysis();
                    }}
                    className="shrink-0 px-5 py-3 bg-[#0092E1] hover:bg-[#0077B6] text-white rounded-xl font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <LuBrain size={18} />
                    <span>Open AI Copilot</span>
                  </button>
                </div>
              </div>

              {/* Today's Schedule Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Today's Patient Schedule</h3>
                    <p className="text-xs text-slate-500">Real-time clinic queue for Dr. Sarah Mitchell</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
                    {INITIAL_APPOINTMENTS.length} Visits Scheduled
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Time</th>
                        <th className="py-3.5 px-4">Patient Name</th>
                        <th className="py-3.5 px-4">Type</th>
                        <th className="py-3.5 px-4">Chief Complaint / Reason</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {INITIAL_APPOINTMENTS.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{apt.time}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-900">
                            {apt.patient}
                            <span className="block text-[11px] text-slate-400 font-normal">{apt.room}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                                apt.type === "In-Person"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : apt.type === "Follow-up"
                                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              {apt.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{apt.reason}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                apt.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : apt.status === "In Progress"
                                  ? "bg-amber-100 text-amber-800 animate-pulse"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedPatient(apt.patient);
                                setShowPrescriptionModal(true);
                              }}
                              className="text-xs font-semibold text-[#0091DC] hover:text-[#0077B6] hover:underline"
                            >
                              Write Rx
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: AI CLINICAL COPILOT */}
          {(activeTab === "ai" || activeTab === "overview" === false && activeTab !== "patients" && activeTab !== "appointments" && activeTab !== "prescriptions") && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                      <LuBrain size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">MedFlow AI Clinical Copilot</h2>
                      <p className="text-xs text-slate-500">
                        Evidence-based differential diagnosis and recommended workup support
                      </p>
                    </div>
                  </div>

                  {/* Preset Case Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400">Quick Test Cases:</span>
                    {SAMPLE_CASES.map((sc, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickLoadCase(sc)}
                        className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
                      >
                        {sc.label.split(":")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Patient Clinical History & Presenting Symptoms
                    </label>
                    <textarea
                      rows={4}
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      placeholder="Describe patient's age, chief complaint, duration, auscultation findings, and vitals..."
                      className="w-full p-3.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0091DC] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-slate-400">
                      🔒 HIPAA Compliant Demo Mode &middot; Clinical decision support for licensed providers
                    </p>
                    <button
                      onClick={handleRunAiAnalysis}
                      disabled={isAiLoading}
                      className="px-6 py-2.5 bg-[#0092E1] hover:bg-[#0077B6] text-white rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {isAiLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Analyzing Clinical Context...</span>
                        </>
                      ) : (
                        <>
                          <LuSparkles size={16} />
                          <span>Generate Clinical Insights</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Structured AI Results */}
              {aiResult && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Differentials */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          Differential Diagnosis
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          AI Ranked
                        </span>
                      </div>

                      <div className="space-y-3">
                        {aiResult.differentials.map((diff, i) => (
                          <div key={i} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-900">{diff.name}</span>
                              <span className="text-[#0091DC] font-extrabold">{diff.prob}</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#0092E1] h-full rounded-full"
                                style={{ width: diff.prob }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Recommended Diagnostic Tests */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          Recommended Workup
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                          Protocol
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {aiResult.tests.map((test, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <FaCircleCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 3: Red Flags / Urgent Alerts */}
                    <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-sm space-y-4 bg-rose-50/20">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          Red Flags & Warnings
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                          Urgent
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {aiResult.redFlags.map((flag, i) => (
                          <li key={i} className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-lg border border-rose-100 font-medium">
                            &bull; {flag}
                          </li>
                        ))}
                      </ul>

                      {/* Convert to Rx shortcut */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setSelectedPatient("Sophia Martinez");
                            setShowPrescriptionModal(true);
                          }}
                          className="w-full py-2 bg-[#0092E1] hover:bg-[#0077B6] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <LuFileText size={14} />
                          <span>Convert to E-Prescription</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PATIENTS LIST */}
          {activeTab === "patients" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Registered Patient Records</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Sophia Martinez", age: 38, sex: "Female", blood: "A+", chronic: "Asthma", allergies: "Penicillin" },
                  { name: "Michael Chang", age: 52, sex: "Male", blood: "O+", chronic: "Hypertension", allergies: "None" },
                  { name: "Emily Jenkins", age: 29, sex: "Female", blood: "B+", chronic: "Migraine", allergies: "Sulfa" },
                  { name: "David Kim", age: 44, sex: "Male", blood: "O-", chronic: "Hyperlipidemia", allergies: "Aspirin" },
                  { name: "Alex Rivera", age: 34, sex: "Male", blood: "O+", chronic: "None", allergies: "Dust Mites" },
                ].map((pat, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900">{pat.name}</h4>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{pat.blood}</span>
                    </div>
                    <p className="text-xs text-slate-500">{pat.age} yrs &middot; {pat.sex}</p>
                    <div className="text-xs pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400">Allergies: </span>
                      <span className="text-rose-600 font-semibold">{pat.allergies}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Clinic Scheduling Queue</h2>
              <p className="text-xs text-slate-500">Manage patient consultations and walk-ins.</p>
              <div className="divide-y divide-slate-100">
                {INITIAL_APPOINTMENTS.map((apt) => (
                  <div key={apt.id} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-slate-900">{apt.patient}</p>
                      <p className="text-xs text-slate-500">{apt.time} &middot; {apt.room} &middot; {apt.reason}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRESCRIPTIONS */}
          {activeTab === "prescriptions" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">E-Prescription Logs</h2>
                <button
                  onClick={() => setShowPrescriptionModal(true)}
                  className="px-3 py-1.5 bg-[#0092E1] text-white text-xs font-semibold rounded-lg hover:bg-[#0077B6]"
                >
                  + New Prescription
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { id: "RX-901", patient: "Sophia Martinez", drug: "Augmentin 875mg", status: "Active", date: "Today" },
                  { id: "RX-884", patient: "Michael Chang", drug: "Lisinopril 10mg", status: "Active", date: "Yesterday" },
                  { id: "RX-872", patient: "Emily Jenkins", drug: "Sumatriptan 50mg", status: "Filled", date: "Oct 20, 2026" },
                ].map((rx, i) => (
                  <div key={i} className="p-3.5 border border-slate-200 rounded-lg flex items-center justify-between text-sm">
                    <div>
                      <span className="text-xs font-mono text-slate-400 font-bold">{rx.id}</span>
                      <p className="font-bold text-slate-900">{rx.patient}</p>
                      <p className="text-xs text-slate-500">{rx.drug} &middot; Issued {rx.date}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                      {rx.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* E-PRESCRIPTION SIMULATOR MODAL */}
        {showPrescriptionModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Official E-Prescription</h3>
                  <p className="text-xs text-slate-500">MedFlow Certified Clinical Electronic Order</p>
                </div>
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <LuX size={20} />
                </button>
              </div>

              {rxSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <FaCircleCheck size={28} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-900">Prescription Dispatched</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Sent to MedFlow Patient Portal and local partner pharmacy. Digital copy generated.
                  </p>
                  <button
                    onClick={() => {
                      setRxSuccess(false);
                      setShowPrescriptionModal(false);
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700">Patient</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedPatient}
                      className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Prescribed Medication & Dosage</label>
                    <input
                      type="text"
                      defaultValue="Amoxicillin-Clavulanate 875/125mg PO BID x 7d"
                      className="w-full mt-1 p-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700">Plain-Language Patient AI Explanation</label>
                    <textarea
                      rows={3}
                      defaultValue="This antibiotic eliminates the bacterial respiratory infection in your lungs. Take one tablet every 12 hours with a meal to avoid stomach upset. Complete the full 7-day course even if you feel better earlier."
                      className="w-full mt-1 p-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPrescriptionModal(false)}
                      className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRxSuccess(true);
                      }}
                      className="px-4 py-2 bg-[#0092E1] hover:bg-[#0077B6] text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <LuPrinter size={14} />
                      <span>Authorize & Sign Prescription</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;

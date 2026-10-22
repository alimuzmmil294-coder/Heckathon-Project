import { LuShieldCheck, LuStethoscope, LuUserCheck, LuCalendarClock } from "react-icons/lu";

const ROLES_DATA = [
  {
    role: "Clinic Manager",
    icon: <LuShieldCheck size={22} className="text-purple-600" />,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    features: ["Manage staff rosters & permissions", "Financial metrics & subscription usage", "Clinic-wide operational analytics"],
  },
  {
    role: "Doctor / Clinician",
    icon: <LuStethoscope size={22} className="text-[#0091DC]" />,
    badgeColor: "bg-blue-50 text-[#0091DC] border-blue-200",
    features: ["AI differential diagnosis assistant", "Manage digital patient charts & vitals", "Generate signed electronic prescriptions"],
  },
  {
    role: "Patient",
    icon: <LuUserCheck size={22} className="text-emerald-600" />,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    features: ["View complete personal medical history", "Download PDF prescriptions & plain explanations", "Online check-in & visit scheduling"],
  },
  {
    role: "Receptionist",
    icon: <LuCalendarClock size={22} className="text-amber-600" />,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    features: ["Instant patient intake & room queue", "Reshuffle appointments in seconds", "Check-in tracking & attendance logs"],
  },
];

const Reason = () => {
  return (
    <section id="team" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0091DC]">
            Role-Based Workspaces
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            Tailored for every member of the care team
          </h3>
          <p className="text-slate-600 text-sm">
            Each role sees only what they need with strict security and zero unnecessary clutter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLES_DATA.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    Portal
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{item.role}</h4>

                <ul className="space-y-2 text-xs text-slate-600">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#0091DC] font-bold">&check;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reason;

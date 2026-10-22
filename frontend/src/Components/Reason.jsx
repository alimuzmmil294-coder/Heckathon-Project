import { LuShieldCheck, LuStethoscope, LuUserCheck, LuCalendarClock } from "react-icons/lu";

const ROLES_DATA = [
  {
    role: "Clinic Manager",
    icon: <LuShieldCheck size={18} />,
    features: ["Manage staff rosters & permissions", "Financial metrics & operational health", "Clinic-wide operational analytics"],
  },
  {
    role: "Doctor / Clinician",
    icon: <LuStethoscope size={18} />,
    features: ["AI differential diagnosis assistant", "Manage digital patient charts & vitals", "Generate signed electronic prescriptions"],
  },
  {
    role: "Patient",
    icon: <LuUserCheck size={18} />,
    features: ["View complete personal medical history", "Download PDF prescriptions & plain explanations", "Online check-in & visit scheduling"],
  },
  {
    role: "Receptionist",
    icon: <LuCalendarClock size={18} />,
    features: ["Instant patient intake & room queue", "Reshuffle appointments in seconds", "Check-in tracking & attendance logs"],
  },
];

const Reason = () => {
  return (
    <section id="team" className="py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Role-Based Workspaces
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Tailored for every member of the care team
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm">
            Each role sees only what they need with strict security and zero unnecessary clutter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLES_DATA.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 shrink-0"
                    style={{ width: "38px", height: "38px" }}
                  >
                    {item.icon}
                  </div>
                  <span className="bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-md text-[11px] font-medium px-2 py-0.5 whitespace-nowrap">
                    Portal
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-neutral-900">{item.role}</h4>

                <ul className="space-y-2 text-xs text-neutral-600">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">&check;</span>
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

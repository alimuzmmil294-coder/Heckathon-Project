import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import Info from "../Components/Info";
import Reason from "../Components/Reason";
import Footer from "../Components/Footer";
import { LuBrain, LuSparkles } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Info />

      {/* AI Diagnosis Assist Showcase Section */}
      <section id="aiAssist" className="py-20 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-[#0B2545] rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30">
                <LuSparkles size={14} />
                <span>Next-Generation Clinical AI</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                AI Diagnostic Assistance that respects clinical judgment
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Empower your doctors with rapid differential diagnosis scoring, recommended laboratory workups, and critical red flag detection &mdash; all integrated directly into patient consultation workflows.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300 font-medium">
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-cyan-400" /> Differential diagnosis ranked by symptom probability
                </p>
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-cyan-400" /> Evidence-based lab tests and radiology workup suggestions
                </p>
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-cyan-400" /> Automatic plain-language translations for patient prescriptions
                </p>
              </div>
              <div className="pt-4">
                <NavLink
                  to="/doctor-dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0092E1] hover:bg-[#0077B6] text-white text-sm font-semibold rounded-xl shadow-md transition-all"
                >
                  <LuBrain size={18} />
                  <span>Test AI Copilot in Doctor Dashboard</span>
                </NavLink>
              </div>
            </div>

            {/* AI Preview Card Mock */}
            <div className="w-full lg:w-[420px] bg-white rounded-2xl p-5 text-slate-900 shadow-2xl space-y-3 border border-slate-100">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 flex items-center gap-1.5">
                  <LuSparkles size={13} /> Live AI Copilot Analysis
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Validated
                </span>
              </div>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                &ldquo;42yo male with fever (101.8°F), productive cough x 4d, dyspnea on exertion.&rdquo;
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">1. Atypical Pneumonia</span>
                  <span className="text-[#0091DC] font-extrabold">78% Match</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0092E1] h-full w-[78%]" />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-slate-800">2. Acute Viral Bronchitis</span>
                  <span className="text-slate-500 font-extrabold">64% Match</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[64%]" />
                </div>
              </div>
              <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 text-[11px] text-rose-800 font-medium">
                ⚠️ <span className="font-bold">Red Flag:</span> Monitor SpO2; flag if &lt; 94% on room air.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reason />
      <Footer />
    </div>
  );
};

export default Home;

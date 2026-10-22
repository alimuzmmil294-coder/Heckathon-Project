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
      <section id="aiAssist" className="py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 text-white shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 text-[11px] font-medium border border-neutral-700">
                <LuSparkles size={13} className="text-neutral-400" />
                <span>Clinical Intelligence Assist</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                AI Diagnostic Assistance that respects clinical judgment
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Empower your doctors with rapid differential diagnosis scoring, recommended laboratory workups, and critical red flag detection &mdash; all integrated directly into patient consultation workflows.
              </p>
              <div className="space-y-2 pt-1 text-xs text-neutral-300 font-medium">
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-neutral-400" /> Differential diagnosis ranked by symptom probability
                </p>
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-neutral-400" /> Evidence-based lab tests and radiology workup suggestions
                </p>
                <p className="flex items-center gap-2">
                  <FaCircleCheck className="text-neutral-400" /> Automatic plain-language translations for patient prescriptions
                </p>
              </div>
              <div className="pt-2">
                <NavLink
                  to="/doctor-dashboard"
                  className="bg-white hover:bg-neutral-100 text-neutral-900 rounded-lg text-xs font-semibold h-9 px-4 gap-2 inline-flex items-center shadow-xs cursor-pointer"
                >
                  <LuBrain size={16} />
                  <span>Test AI Copilot in Doctor Dashboard</span>
                </NavLink>
              </div>
            </div>

            {/* AI Preview Card Mock */}
            <div className="w-full lg:w-[400px] bg-white rounded-xl p-5 text-neutral-900 shadow-xs space-y-3 border border-neutral-200">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                  <LuSparkles size={13} className="text-neutral-500" /> AI Copilot Evaluation
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[11px] font-medium px-2 py-0.5">
                  Validated
                </span>
              </div>
              <p className="text-xs text-neutral-600 italic bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                &ldquo;42yo male with fever (101.8°F), productive cough x 4d, dyspnea on exertion.&rdquo;
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neutral-900">1. Atypical Pneumonia</span>
                  <span className="text-neutral-900 font-bold">78% Match</span>
                </div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neutral-800 h-full w-[78%]" />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-neutral-900">2. Acute Viral Bronchitis</span>
                  <span className="text-neutral-500 font-medium">64% Match</span>
                </div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neutral-400 h-full w-[64%]" />
                </div>
              </div>
              <div className="bg-rose-50/70 p-2.5 rounded-lg border border-rose-200 text-[11px] text-rose-800 font-medium">
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

import { NavLink } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#EBF5FB] via-[#F3F8FC] to-white py-16 md:py-24 border-b border-slate-200/60">
      <div className="container mx-auto px-6 max-w-5xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-[#0091DC] text-xs font-semibold border border-blue-200">
          <LuSparkles size={14} />
          <span>Built for modern outpatient practices</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B2545] tracking-tight max-w-4xl mx-auto leading-[1.12]">
          The modern operating system for small healthcare clinics.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Digital patient records, intelligent scheduling, and e-prescriptions &mdash; powered by clinical AI that assists doctors on differential diagnosis and explains medication to patients in plain language.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <NavLink
            to="/signup"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0092E1] text-white rounded-xl font-semibold shadow-md hover:bg-[#0077B6] transition-all transform hover:-translate-y-0.5 text-sm"
          >
            Start Free Clinic Trial
          </NavLink>
          <NavLink
            to="/login"
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-800 rounded-xl font-semibold border border-slate-300 shadow-sm hover:bg-slate-50 transition-all text-sm"
          >
            Explore Live Demo
          </NavLink>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-[#0092E1]" /> Role-Based Access Control
          </span>
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-[#0092E1]" /> AI Clinical Decision Support
          </span>
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-[#0092E1]" /> HIPAA-Compliant Architecture
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

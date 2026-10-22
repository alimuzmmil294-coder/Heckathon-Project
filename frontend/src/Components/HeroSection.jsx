import { NavLink } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-100 via-neutral-50 to-white py-16 md:py-24 border-b border-neutral-200">
      <div className="container mx-auto px-6 max-w-5xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/70 text-neutral-700 text-xs font-medium border border-neutral-300">
          <LuSparkles size={13} className="text-neutral-500" />
          <span>Built for modern outpatient practices</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
          The modern operating system for small healthcare clinics.
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Digital patient records, intelligent scheduling, and e-prescriptions &mdash; powered by clinical AI that assists doctors on differential diagnosis and explains medication to patients in plain language.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <NavLink
            to="/signup"
            className="w-full sm:w-auto h-10 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium text-xs shadow-xs transition-colors inline-flex items-center justify-center"
          >
            Start Free Clinic Trial
          </NavLink>
          <NavLink
            to="/login"
            className="w-full sm:w-auto h-10 px-6 bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg font-medium border border-neutral-300 shadow-xs transition-colors text-xs inline-flex items-center justify-center"
          >
            Explore Live Demo
          </NavLink>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-neutral-700" /> Role-Based Access Control
          </span>
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-neutral-700" /> AI Clinical Decision Support
          </span>
          <span className="flex items-center gap-1.5">
            <FaCircleCheck className="text-neutral-700" /> HIPAA-Compliant Architecture
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

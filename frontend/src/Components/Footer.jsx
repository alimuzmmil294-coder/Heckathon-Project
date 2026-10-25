import { LuStethoscope } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-[#0B2545] text-white py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0092E1] flex items-center justify-center text-white">
              <LuStethoscope size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MedFlow</span>
          </div>
          <p className="text-sm text-slate-400 text-center md:text-right">
            The modern operating system for small healthcare clinics.
          </p>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} MedFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

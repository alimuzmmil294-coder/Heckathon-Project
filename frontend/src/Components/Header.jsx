import { LuStethoscope } from "react-icons/lu";
import { links } from "../Constants/links";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white/95 backdrop-blur-md px-6 py-4 md:px-12 sticky top-0 z-40 border-b border-slate-200">
      <NavLink to="/" className="flex items-center gap-2.5">
        <div className="bg-[#0092E1] text-white p-2 rounded-lg flex items-center justify-center shadow-sm">
          <LuStethoscope size={22} />
        </div>
        <h1 className="font-bold text-2xl tracking-tight text-[#0B2545]">MedFlow</h1>
      </NavLink>

      <ul className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.path}
              className="text-sm font-medium text-slate-600 hover:text-[#0092E1] transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 text-sm">
        <NavLink
          to="/login"
          className="rounded-lg px-3.5 py-2 font-medium text-slate-700 hover:text-[#0092E1] hover:bg-slate-50 transition-colors"
        >
          Sign In
        </NavLink>
        <NavLink
          to="/signup"
          className="rounded-lg px-4 py-2 bg-[#0092E1] text-white font-medium hover:bg-[#0077B6] shadow-sm transition-colors"
        >
          Get Started
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

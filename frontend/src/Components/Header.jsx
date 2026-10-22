import { LuStethoscope } from "react-icons/lu";
import { links } from "../Constants/links";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white/95 backdrop-blur-md px-6 py-3.5 md:px-12 sticky top-0 z-40 border-b border-neutral-200">
      <NavLink to="/" className="flex items-center gap-2.5">
        <div className="bg-neutral-900 border border-neutral-800 text-white p-2 rounded-lg flex items-center justify-center shadow-xs">
          <LuStethoscope size={20} />
        </div>
        <h1 className="font-bold text-xl tracking-tight text-neutral-900">MedFlow</h1>
      </NavLink>

      <ul className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.path}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5 text-xs">
        <NavLink
          to="/login"
          className="bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg text-xs font-medium h-9 px-3.5 gap-2 inline-flex items-center shadow-xs whitespace-nowrap cursor-pointer transition-colors"
        >
          Sign In
        </NavLink>
        <NavLink
          to="/signup"
          className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium h-9 px-4 gap-2 inline-flex items-center shadow-xs whitespace-nowrap cursor-pointer transition-colors"
        >
          Get Started
        </NavLink>
      </div>
    </header>
  );
};

export default Header;

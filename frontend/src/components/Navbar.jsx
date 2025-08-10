import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Determine active tab from current path
  const active = location.pathname === "/history" ? "history" : "shortener";

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const linkBaseClasses =
    "font-medium px-3 py-1 rounded cursor-pointer transition-colors duration-200";

  const activeClasses = "bg-purple-500 text-white";
  const hoverClasses = "hover:bg-slate-200";

  return (
    <nav className="bg-transparent h-20 px-10 flex items-center justify-between border-b border-gray-300 relative">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold text-xl">
        TinyURL
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex space-x-6">
        <Link
          to="/"
          className={`${linkBaseClasses} ${
            active === "shortener" ? activeClasses : "text-indigo-500 " + hoverClasses
          }`}
          onClick={() => setMenuOpen(false)}
        >
          Shortener
        </Link>
        <Link
          to="/history"
          className={`${linkBaseClasses} ${
            active === "history" ? activeClasses : "text-indigo-500 " + hoverClasses
          }`}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-gray-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col space-y-3 px-10 py-4 sm:hidden z-10">
          <Link
            to="/"
            className={`${linkBaseClasses} ${
              active === "shortener" ? activeClasses : "text-indigo-500 " + hoverClasses
            }`}
            onClick={() => setMenuOpen(false)}
          >
            URL Shortener
          </Link>
          <Link
            to="/history"
            className={`${linkBaseClasses} ${
              active === "history" ? activeClasses : "text-indigo-500 " + hoverClasses
            }`}
            onClick={() => setMenuOpen(false)}
          >
            History
          </Link>
        </div>
      )}
    </nav>
  );
}

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="text-blue-600 font-bold text-xl cursor-default">
        URL Shortener
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-semibold underline"
              : "text-gray-900 font-semibold hover:text-blue-700 hover:underline"
          }
        >
          URL Shortener
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-semibold underline"
              : "text-gray-900 font-semibold hover:text-blue-700 hover:underline"
          }
        >
          History
        </NavLink>
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
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col space-y-3 px-6 py-4 sm:hidden z-10">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold underline"
                : "text-gray-900 font-semibold hover:text-blue-700 hover:underline"
            }
          >
            URL Shortener
          </NavLink>
          <NavLink
            to="/history"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold underline"
                : "text-gray-900 font-semibold hover:text-blue-700 hover:underline"
            }
          >
            History
          </NavLink>
        </div>
      )}
    </nav>
  );
}

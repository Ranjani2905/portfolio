import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-700 p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide transition-all duration-300 hover:scale-105"
        >
          Ranjani<span className="text-yellow-300">'s Portfolio</span>
        </Link>

        {/* Hamburger Menu (for mobile) */}
        <button
          className="md:hidden text-white focus:outline-none text-2xl transition-transform duration-300 hover:rotate-90"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navbar Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-purple-700 w-full left-0 top-16 md:w-auto md:flex-row md:items-center p-2 md:p-0 transition-all duration-500 ease-in-out transform ${
            isMenuOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 md:opacity-100"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-white transition-all duration-300 hover:text-yellow-300 hover:scale-105"
            >
              Home
            </Link>
          </li>

          {/* Learnings Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-4 py-2 transition-all duration-300 hover:text-yellow-300 focus:outline-none"
            >
              Learnings{" "}
              <ChevronDown
                size={16}
                className="transition-transform duration-300"
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 bg-purple-500 rounded-lg shadow-lg w-40 overflow-hidden"
              >
                <li>
                  <Link
                    to="/html"
                    className="block px-4 py-2 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-800"
                  >
                    HTML
                  </Link>
                </li>
                <li>
                  <Link
                    to="/css"
                    className="block px-4 py-2 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-800"
                  >
                    CSS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/javascript"
                    className="block px-4 py-2 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-800"
                  >
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tailwindcss"
                    className="block px-4 py-2 transition-all duration-300 hover:bg-yellow-300 hover:text-purple-800"
                  >
                    Tailwind CSS
                  </Link>
                </li>
              </motion.ul>
            )}
          </li>

          {/* Tasks Tab */}
          <li>
            <Link
              to="/tasks"
              className="block px-4 py-2 transition-all duration-300 hover:text-yellow-300 hover:scale-105"
            >
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

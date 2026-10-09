import { useState } from "react";
import { Link } from "react-router-dom";
import Hover_button from "../Ui/Hover_button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 shadow-2xl shadow-gray-500/20 backdrop-blur-md">

      <div className="flex items-center justify-between px-5 py-4 md:px-8 lg:px-12">

        {/* Logo */}
        <Link to="/">
          <h1 className="main-font text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Marcus Velde
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mono-font hidden items-center gap-6 text-sm text-white/70 lg:flex">
          <Link className="transition hover:text-white" to="/">
            HOME
          </Link>

          <Link className="transition hover:text-white" to="/About">
            ABOUT
          </Link>

          <Link className="transition hover:text-white" to="/Services">
            SERVICES
          </Link>

          <Link className="transition hover:text-white" to="/Contact">
            CONTACT
          </Link>
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Hover_button
            text="HIRE ME"
            path="/Contact"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-6 bg-white"></span>
          <span className="h-0.5 w-6 bg-white"></span>
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-5 py-6 lg:hidden">

          <nav className="mono-font flex flex-col gap-5 text-sm text-white/70">

            <Link
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-white"
              to="/"
            >
              HOME
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-white"
              to="/About"
            >
              ABOUT
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-white"
              to="/Services"
            >
              SERVICES
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-white"
              to="/Contact"
            >
              CONTACT
            </Link>

            <div className="pt-2">
              <Hover_button
                text="HIRE ME"
                path="/Contact"
              />
            </div>

          </nav>
        </div>
      )}

    </header>
  );
};

export default Navbar;
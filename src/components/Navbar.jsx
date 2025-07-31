import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LeafIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center shadow-lg">
              <LeafIcon className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-zinc-100 transition-colors duration-200">
              LeafMind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/books")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Books
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/contact")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-300 hover:text-cyan-400 p-2 rounded-md hover:bg-zinc-800/60 transition-all duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-zinc-700/50">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/books")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Books
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/contact")
                  ? "text-cyan-400 bg-cyan-500/10 shadow-inner"
                  : "text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800/60"
              }`}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
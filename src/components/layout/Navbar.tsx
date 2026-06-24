import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ArrowRight } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Routes', path: '/routes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-elevation-1 border-b border-slate-100">
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-elevation-2 bg-white p-1">
              <img
                src={logo}
                alt="Trinity Express"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Trinity</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Express</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors relative group ${
                  isActive(link.path) ? 'text-primary-600' : 'text-slate-700 hover:text-primary-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium transition-colors">
              <User className="w-4 h-4" />
              Agent
            </Link>
            <Link to="/routes" className="btn-primary">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="container-wide py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-lg font-medium ${
                  isActive(link.path) ? 'text-primary-600' : 'text-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link to="/login" className="btn-secondary w-full" onClick={() => setIsOpen(false)}>
                Agent Login
              </Link>
              <Link to="/routes" className="btn-primary w-full" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

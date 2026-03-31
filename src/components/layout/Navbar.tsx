import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, User } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import logo from '../../assets/logo.jpeg';
import { useAdmin } from '../../context/AdminContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contactInfo } = useAdmin();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-[#1E3A8A] text-white py-2 text-xs md:text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 opacity-90 hover:opacity-100 transition-opacity">
            <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2" /> {contactInfo.phoneKE} (KE) | {contactInfo.phoneUG} (UG) | {contactInfo.phoneRW} (RW) | {contactInfo.phoneSS} (SS)</span>
          </div>
          <div className="flex items-center space-x-4 opacity-90">
            <Link to="/login" className="hover:text-blue-200 transition-colors flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Agent Login
            </Link>
            <span className="text-blue-400">|</span>
            <Link to="/contact" className="hover:text-blue-200 transition-colors">Support</Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border-2 border-white ring-1 ring-gray-100">
              <OptimizedImage 
                src={logo} 
                alt="Trinity Express Logo" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                priority={true}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-lg md:text-xl font-bold text-[#1E3A8A] tracking-wide">TRINITY</span>
                <span className="text-lg md:text-xl font-bold text-[#F97316] tracking-wide">EXPRESS BUS</span>
              </div>
              <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium ml-0.5">Premium Bus Service</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center ml-auto space-x-8">
            <Link to="/routes" className="text-gray-600 hover:text-[#1E88E5] font-semibold transition-colors text-sm uppercase tracking-wide">Our Routes</Link>
            <Link to="/about" className="text-gray-600 hover:text-[#1E88E5] font-semibold transition-colors text-sm uppercase tracking-wide">About Us</Link>
            <Link to="/routes" className="px-8 py-3 bg-[#1E88E5] text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 text-sm uppercase tracking-wide">
              Book Your Seat
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 z-50 relative ml-auto hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex items-center justify-center animate-in fade-in duration-200">
          <div className="flex flex-col space-y-8 text-center w-full max-w-sm px-6">
            <Link 
              to="/routes" 
              className="text-2xl font-bold text-gray-800 hover:text-[#1E88E5] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Our Routes
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-bold text-gray-800 hover:text-[#1E88E5] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-bold text-gray-800 hover:text-[#1E88E5] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact Support
            </Link>
            <div className="pt-4">
              <Link 
                to="/routes" 
                className="block w-full px-6 py-4 bg-[#1E88E5] text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 text-lg font-bold uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Book Your Seat
              </Link>
            </div>
            
            <div className="pt-8 border-t border-gray-100 mt-4 flex flex-col items-center space-y-4">
              <div className="flex space-x-6">
                <a href={`tel:${(contactInfo.phoneKE || '').replace(/\s+/g, '')}`} className="flex flex-col items-center text-gray-500 hover:text-[#1E88E5]">
                  <Phone className="w-6 h-6 mb-1" />
                  <span className="text-xs">KE</span>
                </a>
                <a href={`tel:${(contactInfo.phoneUG || '').replace(/\s+/g, '')}`} className="flex flex-col items-center text-gray-500 hover:text-[#1E88E5]">
                  <Phone className="w-6 h-6 mb-1" />
                  <span className="text-xs">UG</span>
                </a>
                <a href={`tel:${(contactInfo.phoneRW || '').replace(/\s+/g, '')}`} className="flex flex-col items-center text-gray-500 hover:text-[#1E88E5]">
                  <Phone className="w-6 h-6 mb-1" />
                  <span className="text-xs">RW</span>
                </a>
                <Link to="/login" className="flex flex-col items-center text-gray-500 hover:text-[#1E88E5]">
                  <User className="w-6 h-6 mb-1" />
                  <span className="text-xs">Agent</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ShieldCheck, Lock } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import logo from '../../assets/logo.jpeg';
import BookingModal from '../booking/BookingModal';
import { useAdmin, Route } from '../../context/AdminContext';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  
  // Admin Login Logic
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const { login, routes, contactInfo } = useAdmin();
  const navigate = useNavigate();

  const handleRouteClick = (routeData: Route) => {
    setSelectedRoute(routeData);
    setIsModalOpen(true);
  };

  const handleSecureClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 3) {
      setShowAdminLogin(true);
      setClickCount(0);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowAdminLogin(false);
      setPassword('');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid password');
    }
  };

  // Filter popular routes from the context
  const popularRoutes = routes.filter(r => [1, 10, 14, 11].includes(r.id));

  return (
    <>
      <footer className="bg-[#111827] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* ... (rest of the footer grid) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm bg-white flex items-center justify-center">
                  <OptimizedImage 
                    src={logo} 
                    alt="Trinity Express Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-white">TRINITY</span>
                  <span className="text-2xl font-bold text-[#F97316]">EXPRESS BUS</span>
                </div>
              </div>
              <p className="text-blue-100 mb-6 max-w-sm leading-relaxed">
                From Kenya to Uganda, Juba to Rwanda to Goma! Trinity Express takes you there with comfort and care. Sit back, relax, and enjoy the journey as we connect you to the heart of East Africa.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/people/Trinity-Bus-Service/100048591007583/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/trinity_express_bus_ltd/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link to="/routes" className="text-gray-300 hover:text-secondary transition-colors">Our Routes</Link></li>
                <li><Link to="/fleet" className="text-gray-300 hover:text-secondary transition-colors">Our Fleet</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact Support</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-secondary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Popular Routes */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Popular Routes</h3>
              <ul className="space-y-4">
                {popularRoutes.map((route, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => handleRouteClick(route)}
                      className="text-gray-300 hover:text-secondary transition-colors text-left"
                    >
                      {route.origin} - {route.destination}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span className="text-gray-300">{contactInfo.addressKE}<br />{contactInfo.addressUG}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <div className="flex flex-col">
                    <a href={`tel:${(contactInfo.phoneKE || '').replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white transition-colors">{contactInfo.phoneKE} (KE)</a>
                    <a href={`tel:${(contactInfo.phoneUG || '').replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white transition-colors">{contactInfo.phoneUG} (UG)</a>
                    <a href={`tel:${(contactInfo.phoneRW || '').replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white transition-colors">{contactInfo.phoneRW} (RW)</a>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-white transition-colors">{contactInfo.email}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Trinity Express. All rights reserved.
            </p>
            <button 
              onClick={handleSecureClick}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <ShieldCheck className="w-5 h-5 text-[#34D399]" />
              <span className="font-medium text-sm">Secure Payment</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedRoute && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          route={selectedRoute} 
        />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
              <p className="text-gray-500">Enter secure password to continue</p>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-center text-lg tracking-widest"
                placeholder="••••••••••"
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

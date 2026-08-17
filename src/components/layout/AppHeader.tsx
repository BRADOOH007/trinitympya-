import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo.webp';
import { useAdmin } from '../../context/AdminContext';

interface AppHeaderProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

const AppHeader = ({ drawerOpen, onToggleDrawer }: AppHeaderProps) => {
  const { contactInfo } = useAdmin();
  const whatsapp = contactInfo?.whatsapp?.replace(/[^0-9]/g, '') || '254735893829';
  const location = useLocation();

  const drawerLinks = [
    { label: 'Home', to: '/', icon: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { label: 'Routes', to: '/routes', icon: 'M12 21s-6-5.686-6-11a6 6 0 1 1 12 0c0 5.314-6 11-6 11z' },
    { label: 'About', to: '/about', icon: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' },
    { label: 'Our Fleet', to: '/fleet', icon: 'M8 6h13M8 6a3 3 0 0 1-6 0m6 0v8H2V6m6 0h13m0 0v8H8m13 0v3a2 2 0 0 1-2 2h-3' },
    { label: 'Contact', to: '/contact', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' },
  ];

  const routesList = [
    { label: 'Nairobi - Kampala', to: '/routes/nairobi-kampala' },
    { label: 'Nairobi - Kigali', to: '/routes/nairobi-kigali' },
    { label: 'Nairobi - Juba', to: '/routes/nairobi-juba' },
    { label: 'Nairobi - Dar es Salaam', to: '/routes/nairobi-dar-es-salaam' },
  ];

  return (
    <>
      {/* Header Bar */}
      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SimbaCoach" className="h-10 w-auto object-contain" />
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={onToggleDrawer}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors ml-0.5"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onToggleDrawer}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100 flex items-center justify-center shrink-0">
                <img src={logo} alt="SimbaCoach" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-sm text-gray-900 tracking-tight">SIMBACOACH</span>
            </div>
            <button onClick={onToggleDrawer} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {drawerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 font-bold text-sm transition-colors ${
                  location.pathname === link.to ? 'text-[#36498c] bg-[#36498c]/5' : 'text-gray-700'
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 text-[#36498c]">
                  <path d={link.icon} />
                </svg>
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Routes</p>
            {routesList.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 text-[#cc0000]">
                  <path d="M12 21s-6-5.686-6-11a6 6 0 1 1 12 0c0 5.314-6 11-6 11z" />
                </svg>
                {route.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
            <Link to="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 text-[#36498c]">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Agent Login
            </Link>
          </nav>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello SimbaCoach! I would like to book a bus ticket.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00a859] text-white font-bold py-3 rounded-xl text-sm transition-colors hover:bg-[#00904b]"
            >
              <MessageCircle className="w-4 h-4" /> Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;

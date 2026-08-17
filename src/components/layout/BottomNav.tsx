import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Printer, HelpCircle, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { page: 'home', label: 'Home', icon: Home, path: '/' },
    { page: 'print', label: 'Print', icon: Printer, path: '/print-ticket' },
    { page: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
    { page: 'account', label: 'Account', icon: User, path: '/account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] pb-5">
      <div className="max-w-md mx-auto flex items-center justify-around h-10">
        {items.map((item) => {
          const active =
            item.page === 'home'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0 h-full transition-all relative nav-btn ${
                active ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[8px] font-bold tracking-wider uppercase">{item.label}</span>
              {active && <div className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

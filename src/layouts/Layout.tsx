import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import BottomNav from '../components/layout/BottomNav';
import Footer from '../components/layout/Footer';
import Chatbot from '../components/chat/Chatbot';

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="flex flex-col min-h-screen select-none">
      {/* Top Announcement Banner */}
      <div className="bg-[#151515] text-white text-center text-xs py-2.5 px-4 font-semibold flex items-center justify-center gap-2 border-b border-neutral-700">
        <span className="text-amber-400 text-base leading-none">🎉</span>
        <span>Receive up to 25% discount when you book with our website!</span>
      </div>

      {/* Header */}
      <AppHeader drawerOpen={drawerOpen} onToggleDrawer={() => setDrawerOpen(v => !v)} />

      {/* App Container */}
      <div className="w-full md:max-w-md mx-auto bg-white md:shadow-2xl md:shadow-slate-200/80 md:border md:border-white/60 relative min-h-screen md:min-h-[85vh] md:rounded-3xl md:my-6 pb-24 flex-1">
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Layout;

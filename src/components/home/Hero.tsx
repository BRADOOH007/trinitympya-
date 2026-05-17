import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../booking/BookingModal';
import { Route } from '../../context/AdminContext';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleBookClick = () => {
    // Open modal without a pre-selected route to force user selection
    setSelectedRoute({
      id: 0,
      origin: '',
      destination: '',
      price: '',
      duration: ''
    } as Route);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-[600px] md:min-h-[650px] flex items-center bg-gray-900 overflow-hidden font-sans pt-24 md:pt-0">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-125"
          poster="/assets/nairobi.jpg"
        >
          {/* Sample travel/road video - replace with your own video file */}
          <source src="https://videos.pexels.com/video-files/855018/855018-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/30 to-transparent mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            ✨ The Premium Way to Travel East Africa
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 tracking-tight drop-shadow-lg">
            Travel Kenya & <br />
            Uganda in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42A5F5] to-[#2196F3]">Comfort & Class</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 font-light drop-shadow-md">
            Experience the journey as much as the destination. Luxury coaches, professional service, and seamless booking for the modern traveler.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button 
              onClick={handleBookClick}
              className="btn-sharp group px-8 py-4 bg-[#1E88E5] text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 flex items-center justify-center space-x-3"
            >
              <span>Book Your Seat</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            
            <Link to="/routes" className="btn-sharp px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-bold border border-white/20 hover:bg-white/10 hover:border-white/40 flex items-center justify-center space-x-2">
              <span>View Routes</span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 pb-16 md:pb-8">
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-white/90">No Booking Fees</span>
            </div>
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <span className="text-white/90">Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </div>
              <span className="text-white/90">Free Rescheduling</span>
            </div>
          </div>
        </div>

        {/* Floating Verified Badge - Positioned discreetly */}
        <div className="absolute top-32 right-4 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-right-8 duration-700 delay-700 hover:bg-white/20 transition-colors cursor-default hidden lg:flex">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <div>
            <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mb-0.5">Trusted Choice</p>
            <p className="text-sm font-bold text-white">100% Verified</p>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {selectedRoute && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          route={selectedRoute} 
        />
      )}
    </div>
  );
};

export default Hero;

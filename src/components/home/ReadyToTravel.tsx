import React from 'react';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadyToTravel = () => {
  return (
    <section className="py-24 bg-[#1E88E5] relative overflow-hidden">
      {/* Premium Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>
      
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Bookings Open 24/7
            </div>
            
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Ready to Start <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Your Journey?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-10 max-w-xl leading-relaxed font-light">
              Join thousands of satisfied travelers who choose Trinity Express for comfort, safety, and reliability across East Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/routes" 
                className="group px-8 py-4 bg-white text-[#1E88E5] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Book Your Trip Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Contact Support</span>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Instant E-Ticket</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">100+</div>
                <div className="text-blue-100 font-medium uppercase text-sm tracking-wider">Daily Departures</div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">24/7</div>
                <div className="text-blue-100 font-medium uppercase text-sm tracking-wider">Customer Support</div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">50+</div>
                <div className="text-blue-100 font-medium uppercase text-sm tracking-wider">Routes Covered</div>
              </div>

              {/* Card 4 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">100%</div>
                <div className="text-blue-100 font-medium uppercase text-sm tracking-wider">Safe & Secure</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReadyToTravel;
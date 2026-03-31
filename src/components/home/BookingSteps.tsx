import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../ui/OptimizedImage';
import logo from '../../assets/logo.jpeg';

const BookingSteps = () => {
  return (
    <section className="relative py-24 bg-[#F0F7FF] overflow-hidden">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bus-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#1E88E5" />
              <path d="M50 50 L70 70" stroke="#1E88E5" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="80" cy="80" r="3" stroke="#1E88E5" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bus-pattern)" />
        </svg>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Image Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700 ease-out group h-[400px] bg-white border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              
              {/* Main Bus Image with Logo Overlay */}
              <div className="w-full h-full relative group">
                {/* Bus Image - Matches the blue/cyan/white livery of Trinity Express */}
                <OptimizedImage 
                  src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20luxury%20white%20coach%20bus%20with%20cyan%20and%20blue%20wave%20graphics%20on%20side%20side%20view%20sunny%20day%20photorealistic%208k&image_size=square" 
                  alt="Trinity Express Bus" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-in-out"
                  priority={true}
                />
                
                {/* Logo Overlay - Positioned to look like branding */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-2xl flex items-center justify-center border-2 border-blue-500/20 z-20">
                   <OptimizedImage 
                    src={logo} 
                    alt="Trinity Logo" 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2">TRINITY EXPRESS</h3>
                <p className="text-blue-100 font-medium">Premium Travel Experience</p>
              </div>

              {/* 100+ Daily Trips Badge */}
              <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-700 delay-300 z-20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1565C0]">100+</p>
                  <p className="text-xs text-gray-500 font-medium">Daily Trips</p>
                </div>
              </div>

              {/* 24/7 Support Badge */}
              <div className="absolute bottom-6 right-6 bg-[#1565C0] p-4 rounded-xl shadow-lg flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 z-20">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 animate-pulse">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-white">
                  <p className="text-xl font-bold leading-none">24/7</p>
                  <p className="text-xs font-medium opacity-90">Support</p>
                </div>
              </div>
            </div>
            
            {/* Decorative blob */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#1E88E5] rounded-full blur-[100px] opacity-20"></div>
          </div>

          {/* Right Content Side */}
          <div className="lg:w-1/2">
            <div className="relative inline-block mb-4">
              <span className="text-[#1E88E5] font-bold tracking-wider uppercase text-sm bg-blue-100 px-3 py-1 rounded-full mb-4 inline-block">Easy Booking</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">
                Book in <span className="text-[#1E88E5]">3 Simple Steps</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-12">Get your ticket in minutes and travel with confidence across East Africa.</p>

            <div className="space-y-10">
              {/* Step 1 */}
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1565C0] text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-blue-50">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Route</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Select your departure city and destination. Our smart system finds the fastest route in seconds.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F97316] text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-orange-50">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select Your Seat</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pick your preferred seat. Real-time availability means you book in less than 60 seconds.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#22C55E] text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-green-50">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pay & Travel</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complete secure payment and receive instant confirmation. Show your ticket and board!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link 
                to="/routes" 
                className="btn-sharp inline-flex items-center px-8 py-4 bg-[#1565C0] text-white font-bold hover:bg-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Start Booking Now</span> <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingSteps;

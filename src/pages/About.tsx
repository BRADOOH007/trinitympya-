import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Clock, Users, MapPin, Award, Globe, Zap, Heart } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Helmet>
        <title>About Us - Trinity Express Bus | Safe & Reliable Travel in East Africa</title>
        <meta name="description" content="Learn more about Trinity Express Bus, East Africa's leading passenger transport company. Connecting Kenya, Uganda, Rwanda, and South Sudan with safety and comfort." />
        <link rel="canonical" href="https://www.trinityexpressbusonlinebooking.com/about" />
      </Helmet>
      {/* Hero Section - Immersive with Overlay */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20luxury%20bus%20travel%20experience%20scenic%20landscape%20east%20africa%20cinematic%20lighting%204k&image_size=landscape_16_9"
            alt="Trinity Express Experience"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 via-[#1E3A8A]/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-semibold mb-6 backdrop-blur-sm">
              EST. 2010 • EAST AFRICA'S FINEST
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Bridging Borders,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Connecting Hearts.</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl font-light">
              More than just a bus service, we are the pulse of East African travel. Experience a journey redefined by safety, comfort, and unwavering reliability.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section with Stats */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 relative z-10">
                  Redefining Regional Travel
                </h2>
                <div className="w-20 h-1.5 bg-[#F97316] rounded-full mb-8"></div>
                <div className="prose prose-lg text-gray-600 space-y-6">
                  <p>
                    <span className="font-bold text-[#1E3A8A]">Trinity Express</span> began with a simple yet ambitious vision: to transform how people move across East Africa. What started as a single route has blossomed into a comprehensive network connecting 7 nations.
                  </p>
                  <p>
                    We understand that every ticket represents a story—a student returning home, a business deal in a new city, or a family reunion. That's why we treat every mile with the care it deserves.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#1E3A8A]">
                    <h4 className="text-3xl font-bold text-[#1E3A8A]">50+</h4>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Destinations</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#F97316]">
                    <h4 className="text-3xl font-bold text-[#F97316]">1M+</h4>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Happy Travelers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <OptimizedImage 
                    src="/assets/kampala.jpg"
                    alt="Comfortable Interior" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-translate-y-2 transition-transform duration-500"
                  />
                  <div className="bg-[#1E3A8A] p-6 rounded-2xl text-white shadow-lg">
                    <Globe className="w-8 h-8 mb-3 text-blue-300" />
                    <h3 className="font-bold text-lg mb-1">7 Countries</h3>
                    <p className="text-sm text-blue-100">Seamless cross-border travel.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#F97316] p-6 rounded-2xl text-white shadow-lg">
                    <Shield className="w-8 h-8 mb-3 text-orange-200" />
                    <h3 className="font-bold text-lg mb-1">100% Safe</h3>
                    <p className="text-sm text-orange-100">Top-tier safety records.</p>
                  </div>
                  <OptimizedImage 
                    src="/assets/logo.jpeg"
                    alt="Professional Driver" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-translate-y-2 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values - Modern Cards */}
      <div className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Driven by Values</h2>
            <p className="text-gray-600 text-lg">Our core principles guide every decision we make, ensuring you get the best experience possible.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group border-t-4 border-transparent hover:border-[#1E3A8A]">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#1E3A8A] mb-6 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Uncompromised Safety</h3>
              <p className="text-gray-600 leading-relaxed">
                We employ rigorous maintenance checks and employ only the most experienced drivers. Your safety is our non-negotiable priority.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-300 group border-t-4 border-transparent hover:border-[#F97316]">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#F97316] mb-6 group-hover:bg-[#F97316] group-hover:text-white transition-colors duration-300">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliable Punctuality</h3>
              <p className="text-gray-600 leading-relaxed">
                Time is precious. Our logistics team works 24/7 to ensure schedules are met, so you can plan your journey with confidence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300 group border-t-4 border-transparent hover:border-[#10B981]">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-[#10B981] mb-6 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600 leading-relaxed">
                From easy booking to comfortable seats, every aspect of our service is designed with your comfort and convenience in mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why We Are Different */}
      <div className="py-20 bg-[#1E3A8A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Trinity Difference</h2>
              <p className="text-blue-200 max-w-xl">We don't just drive; we care. Here is what sets us apart from the rest.</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] font-bold rounded-full hover:bg-blue-50 transition-colors">
              Book a Seat <Zap className="w-4 h-4 fill-current" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Modern Fleet", desc: "Air-conditioned buses with charging ports." },
              { icon: MapPin, title: "Wide Network", desc: "Connecting 50+ cities across East Africa." },
              { icon: Award, title: "Award Winning", desc: "Recognized for excellence in transport." },
              { icon: Users, title: "Expert Crew", desc: "Friendly staff ready to assist you." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <item.icon className="w-8 h-8 text-[#F97316] mb-4" />
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-800 mb-8 leading-relaxed">
                "We believe in more than just transportation - we're building connections, supporting communities, and making East Africa feel smaller, one journey at a time."
              </h2>
              <div className="flex justify-center gap-4">
                <a href="/routes" className="px-8 py-4 bg-[#1E3A8A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-900 transition-all transform hover:-translate-y-1">
                  View Our Routes
                </a>
                <a href="/contact" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

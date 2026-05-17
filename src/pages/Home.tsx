import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import BookingWidget from '../components/home/BookingWidget';
import BookingSteps from '../components/home/BookingSteps';
import FeaturedRoutes from '../components/home/FeaturedRoutes';
import ReadyToTravel from '../components/home/ReadyToTravel';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Trinity Express Bus - Book Online Bus Tickets | Nairobi, Kampala, Kigali</title>
        <meta name="description" content="Book affordable and comfortable bus tickets online with Trinity Express. Daily departures from Nairobi to Kampala, Kigali, Juba, and more. Instant confirmation." />
        <meta name="keywords" content="Trinity Express, Bus Booking Kenya, Nairobi to Kampala Bus, Kampala to Kigali Bus, Online Bus Ticket, Trinity Bus Online Booking" />
        <link rel="canonical" href="https://www.trinitybusexpress.com/" />
        
        {/* Structured Data for FAQ */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "How do I book a Trinity Express bus ticket online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can easily book your ticket on our homepage by selecting your origin, destination, and travel date. Click 'Search Buses', choose your seat, and pay via M-Pesa or Card."
                }
              }, {
                "@type": "Question",
                "name": "What routes does Trinity Express cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We operate daily routes connecting Nairobi, Kampala, Kigali, Juba, Dar es Salaam, and Bukavu. We serve major cities across East Africa."
                }
              }, {
                "@type": "Question",
                "name": "Is it safe to travel with Trinity Express?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, passenger safety is our top priority. We have professional drivers, well-maintained modern buses, and 24/7 customer support."
                }
              }]
            }
          `}
        </script>
      </Helmet>

      <Hero />
      <div className="container mx-auto px-4">
        <BookingWidget />
      </div>
      
      <BookingSteps />

      <FeaturedRoutes />

      <ReadyToTravel />

      {/* SEO Content Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Main Heading */}
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4 tracking-wide uppercase">
                Premium Travel Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                The Best Way to Travel <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#1E88E5]">Across East Africa</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Welcome to <strong className="text-[#1E3A8A]">Trinity Express Bus</strong>, where your journey matters as much as your destination. Connecting <strong>Nairobi, Kampala, Kigali, Juba, and Dar es Salaam</strong> with unmatched comfort.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-10"></div>
                <img 
                  src="/assets/juba.jpg"
                  alt="Luxury Bus Interior" 
                  className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover transform transition-transform hover:scale-[1.02] duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-semibold uppercase">Customer Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.9/5.0</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Why Choose Trinity Express?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our <strong>online bus booking system</strong> revolutionizes how you travel. Skip the long queues and secure your ticket in just 3 simple steps from the comfort of your home.
                </p>
                
                <div className="grid gap-6">
                  {[
                    { title: "Modern Fleet", desc: "Air-conditioned buses with extra legroom & charging ports.", icon: "🚌", color: "bg-blue-100 text-blue-600" },
                    { title: "Affordable Rates", desc: "Competitive pricing for all international routes.", icon: "💰", color: "bg-green-100 text-green-600" },
                    { title: "Daily Departures", desc: "Flexible schedules to suit your travel plans.", icon: "🗓️", color: "bg-orange-100 text-orange-600" },
                    { title: "Professional Crew", desc: "Experienced drivers dedicated to your safety.", icon: "👨‍✈️", color: "bg-purple-100 text-purple-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-xl shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-[#1E3A8A] rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6">Ready to Experience the Difference?</h3>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of satisfied travelers who trust Trinity Express for their journey.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => {
                      const element = document.getElementById('booking-widget');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="px-8 py-4 bg-white text-[#1E3A8A] font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1"
                  >
                    Book Your Ticket Now
                  </button>
                  <a href="/routes" className="px-8 py-4 bg-[#1E88E5] text-white font-bold rounded-xl border border-blue-400 hover:bg-blue-600 transition-all">
                    View All Routes
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

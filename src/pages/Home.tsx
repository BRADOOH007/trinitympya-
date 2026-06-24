import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, MapPin, Users, Star, Calendar, Bus } from 'lucide-react';
import BookingModal from '../components/booking/BookingModal';
import { useAdmin } from '../context/AdminContext';

const Home = () => {
  const { routes } = useAdmin();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState<typeof routes[0] | null>(null);

  const features = [
    { icon: Shield, title: 'Safe Travel', desc: 'Your safety is our top priority with trained drivers and maintained vehicles' },
    { icon: Clock, title: 'On Time', desc: 'Punctual departures and arrivals you can always rely on' },
    { icon: Users, title: 'Friendly Crew', desc: 'Professional staff dedicated to making your journey comfortable' },
    { icon: MapPin, title: 'Wide Network', desc: 'Connecting major cities across East Africa' },
  ];

  const featuredRoutes = routes.slice(0, 6);

  const handleBookRoute = (route: typeof routes[0]) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100 to-transparent opacity-50"></div>

        <div className="container-wide py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold text-sm">
                <Star className="w-4 h-4 fill-primary-600" />
                East Africa's Trusted Bus Service
              </div>

              <h1 className="title-display">
                Travel with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Confidence</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Experience safe, comfortable, and affordable travel across East Africa.
                Daily departures, modern buses, and friendly service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/routes" className="btn-primary text-lg py-4 px-8">
                  Book Your Journey <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-outline text-lg py-4 px-8">
                  Learn More
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xs"></div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 font-medium">10,000+ Happy Travelers</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl blur-3xl opacity-50"></div>
              <img
                src="/assets/nairobi.jpg"
                alt="Trinity Express Bus"
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-elevation-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="section-header">
            <p className="section-subtitle">Why Choose Trinity</p>
            <h2 className="title-section text-slate-900 mb-4">Your Journey, Our Priority</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We are committed to providing a seamless and comfortable travel experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-modern p-8 text-center hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="title-card mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Routes Section - COMPLETELY REVAMPED */}
      <section className="section bg-slate-900 text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl"></div>

        <div className="container-wide relative z-10">
          <div className="section-header">
            <p className="text-primary-400 font-semibold uppercase tracking-widest text-sm mb-3">Featured Routes</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Top Destinations</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Daily departures to the most popular cities across East Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoutes.map((route, _index) => (
              <div 
                key={route.id} 
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                {/* Route header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-primary-400">
                      <Bus className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">Direct Route</p>
                      <p className="text-xs text-slate-500">{route.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">From</p>
                    <p className="text-3xl font-extrabold text-primary-400">{route.price}</p>
                  </div>
                </div>

                {/* From → To */}
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{route.origin}</h3>
                    <p className="text-sm text-slate-500">{route.country_origin}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 px-6">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-slate-500"></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{route.destination}</h3>
                    <p className="text-sm text-slate-500">{route.country_dest}</p>
                  </div>
                </div>

                {/* Book button */}
                <button
                  onClick={() => handleBookRoute(route)}
                  className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-elevation-3"
                >
                  <Calendar className="w-5 h-5" />
                  Book Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/routes" className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-bold rounded-2xl hover:bg-primary-600 transition-all duration-300 text-lg shadow-elevation-3">
              View All Routes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="card-elevated bg-gradient-to-br from-primary-500 to-secondary-600 text-white p-12 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">Ready to Book Your Journey?</h2>
                <p className="text-xl opacity-90 mb-8">
                  Get instant booking confirmation via WhatsApp
                </p>
                <Link to="/routes" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-300 text-lg shadow-elevation-3">
                  Explore All Routes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4 animate-bounce">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl"></div>
                    <div className="w-24 h-24 bg-white/20 rounded-2xl"></div>
                  </div>
                  <div className="flex flex-col gap-4 pt-8">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl"></div>
                    <div className="w-24 h-24 bg-white/20 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default Home;

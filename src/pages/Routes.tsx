import React, { useEffect } from 'react';
import { Clock, Search, Calendar, Bus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import BookingModal from '../components/booking/BookingModal';
import ReturnTripModal from '../components/booking/ReturnTripModal';
import { useAdmin } from '../context/AdminContext';

const RoutesPage = () => {
  const { routes } = useAdmin();
  const [selectedRoute, setSelectedRoute] = React.useState<typeof routes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const location = useLocation();
  const [filteredRoutes, setFilteredRoutes] = React.useState<typeof routes>([]);
  const [searchParams, setSearchParams] = React.useState<{origin?: string, destination?: string, date?: string} | null>(null);
  
  const [isReturnModalOpen, setIsReturnModalOpen] = React.useState(false);
  const [outboundBooking, setOutboundBooking] = React.useState<{
    origin: string;
    destination: string;
    date: string;
    price: string;
  } | null>(null);
  const [returnRoute, setReturnRoute] = React.useState<typeof routes[0] | null>(null);

  const capitalizeCityName = (city: string) => {
    if (!city) return '';
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    if (routes.length > 0) {
      setFilteredRoutes(routes);
    }
  }, [routes]);

  useEffect(() => {
    if (routes.length === 0) return;
    
    if (location.state && location.state.routeId) {
      const routeId = location.state.routeId;
      const routeToSelect = routes.find(r => r.id === routeId);
      if (routeToSelect) {
        setSelectedRoute(routeToSelect);
        setIsModalOpen(true);
      }
    }

    if (location.state && (location.state.origin || location.state.destination)) {
      const { origin, destination, date } = location.state;
      setSearchParams({ origin, destination, date });
      
      const filtered = routes.filter(route => {
        const originMatch = origin ? 
          route.origin.toLowerCase().includes(origin.toLowerCase()) ||
          origin.toLowerCase().includes(route.origin.toLowerCase()) : true;
        const destMatch = destination ? 
          route.destination.toLowerCase().includes(destination.toLowerCase()) ||
          destination.toLowerCase().includes(route.destination.toLowerCase()) : true;
        return originMatch && destMatch;
      });
      
      if (filtered.length === 0 && origin) {
        const originRoutes = routes.filter(route => 
          route.origin.toLowerCase().includes(origin.toLowerCase()) ||
          origin.toLowerCase().includes(route.origin.toLowerCase())
        );
        setFilteredRoutes(originRoutes.length > 0 ? originRoutes : routes);
      } else {
        setFilteredRoutes(filtered.length > 0 ? filtered : routes);
      }
    } else if (!searchParams) {
      setFilteredRoutes(routes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, routes]);

  const handleClearSearch = () => {
    setFilteredRoutes(routes);
    setSearchParams(null);
    window.history.replaceState({}, document.title);
  };

  const handleBookClick = (route: typeof routes[0]) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const selectedDate = searchParams?.date || new Date().toISOString().split('T')[0];

  const handleBookingComplete = (bookingDetails: { origin: string; destination: string; date: string; price: string }) => {
    setOutboundBooking(bookingDetails);
    
    const reverseRoute = routes.find(
      r => r.origin === bookingDetails.destination && r.destination === bookingDetails.origin
    );
    
    if (reverseRoute) {
      setReturnRoute(reverseRoute);
      setIsReturnModalOpen(true);
    }
  };

  const handleBookReturn = () => {
    setIsReturnModalOpen(false);
    if (returnRoute) {
      setSelectedRoute(returnRoute);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo
        title="Bus Routes & Fares - Kenya & East Africa | SimbaCoach"
        description="Explore SimbaCoach bus routes and fares across Kenya and East Africa. Daily departures from Nairobi, Mombasa, Eldoret, Kisumu to Kampala, Kigali & more. Book online with instant confirmation."
        path="/routes"
        keywords="SimbaCoach routes, bus fares Kenya, Kenya bus routes, Nairobi to Mombasa bus price, East Africa bus routes, book bus online"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="title-display mb-4">Our Routes</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connecting major cities across East Africa
          </p>
        </div>
      </section>

      {/* Filters banner */}
      {searchParams && (
        <div className="container-wide py-6">
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-elevation-1 p-6 border border-slate-100">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-slate-500" />
              <div className="text-sm">
                <span className="text-slate-500">Active filters:</span>
                <span className="font-bold text-primary-700 ml-2">
                  {searchParams.origin && `From ${capitalizeCityName(searchParams.origin)}`} 
                  {searchParams.origin && searchParams.destination && ' → '}
                  {searchParams.destination && `To ${capitalizeCityName(searchParams.destination)}`}
                </span>
              </div>
            </div>
            <button 
              onClick={handleClearSearch}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Routes List */}
      <div className="container-wide pb-20">
        <div className="grid gap-6">
          {filteredRoutes.length === 0 ? (
            <div className="card-modern text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">No routes found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We couldn't find any routes matching your criteria. Try clearing your filters.
              </p>
              <button 
                onClick={handleClearSearch}
                className="btn-primary"
              >
                View All Routes
              </button>
            </div>
          ) : (
            filteredRoutes.map((route) => (
              <div 
                key={route.id} 
                className="card-modern hover:shadow-elevation-3 transition-all duration-300"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center p-6 md:p-8">
                  {/* Route info */}
                  <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">{route.origin}</h3>
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">{route.country_origin}</p>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                          <Bus className="w-5 h-5" />
                        </div>
                        <div className="flex gap-1">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-primary-200"></div>
                          ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">{route.destination}</h3>
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">{route.country_dest}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-center md:text-right">
                      <p className="text-sm text-slate-500">Starting from</p>
                      <p className="text-3xl font-extrabold text-primary-600">{route.price}</p>
                      {route.executive_price && (
                        <p className="text-xs text-secondary-600 font-bold mt-1">
                          Executive: {route.executive_price}
                        </p>
                      )}
                      {route.vip_price && (
                        <p className="text-xs text-secondary-600 font-bold mt-1">
                          VIP: {route.vip_price}
                        </p>
                      )}
                      <div className="flex items-center justify-center md:justify-end text-sm text-slate-500 gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        <span>{route.duration}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBookClick(route)}
                      className="btn-primary w-full md:w-auto"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedRoute && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          route={selectedRoute}
          selectedDate={selectedDate}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {outboundBooking && returnRoute && (
        <ReturnTripModal
          isOpen={isReturnModalOpen}
          onClose={() => setIsReturnModalOpen(false)}
          onBookReturn={handleBookReturn}
          outboundRoute={outboundBooking}
          returnRoute={returnRoute}
        />
      )}
    </div>
  );
};

export default RoutesPage;

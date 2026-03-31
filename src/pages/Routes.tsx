import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
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
  
  // Return trip modal state
  const [isReturnModalOpen, setIsReturnModalOpen] = React.useState(false);
  const [outboundBooking, setOutboundBooking] = React.useState<{
    origin: string;
    destination: string;
    date: string;
    price: string;
  } | null>(null);
  const [returnRoute, setReturnRoute] = React.useState<typeof routes[0] | null>(null);

  // Helper function to capitalize city names properly
  const capitalizeCityName = (city: string) => {
    if (!city) return '';
    // Handle special cases like "dar-es-salaam"
    return city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Update filtered routes whenever routes change
  useEffect(() => {
    if (routes.length > 0) {
      setFilteredRoutes(routes);
    }
  }, [routes]);

  useEffect(() => {
    // Wait for routes to load
    if (routes.length === 0) return;
    
    // 1. Handle "Book This Trip" (Direct Booking)
    if (location.state && location.state.routeId) {
      const routeId = location.state.routeId;
      const routeToSelect = routes.find(r => r.id === routeId);
      if (routeToSelect) {
        setSelectedRoute(routeToSelect);
        setIsModalOpen(true);
      }
    }

    // 2. Handle Search Filters (From BookingWidget)
    if (location.state && (location.state.origin || location.state.destination)) {
      const { origin, destination, date } = location.state;
      setSearchParams({ origin, destination, date });
      
      const filtered = routes.filter(route => {
        const matchOrigin = origin ? route.origin.toLowerCase().includes(origin.toLowerCase()) : true;
        const matchDest = destination ? route.destination.toLowerCase().includes(destination.toLowerCase()) : true;
        return matchOrigin && matchDest;
      });
      setFilteredRoutes(filtered);
    } else if (!searchParams) {
      // Only reset to all routes if there are no active search params
      setFilteredRoutes(routes);
    }
  }, [location.state, routes]);

  const handleClearSearch = () => {
    setFilteredRoutes(routes);
    setSearchParams(null);
    // Optional: clear history state to prevent re-filtering on refresh
    window.history.replaceState({}, document.title);
  };

  const handleBookClick = (route: typeof routes[0]) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  // Get the selected date from search params or default to today
  const selectedDate = searchParams?.date || new Date().toISOString().split('T')[0];

  // Handle booking completion and show return trip offer
  const handleBookingComplete = (bookingDetails: { origin: string; destination: string; date: string; price: string }) => {
    setOutboundBooking(bookingDetails);
    
    // Find the return route (reversed origin and destination)
    const reverseRoute = routes.find(
      r => r.origin === bookingDetails.destination && r.destination === bookingDetails.origin
    );
    
    if (reverseRoute) {
      setReturnRoute(reverseRoute);
      setIsReturnModalOpen(true);
    }
  };

  // Handle return trip booking
  const handleBookReturn = () => {
    setIsReturnModalOpen(false);
    if (returnRoute) {
      setSelectedRoute(returnRoute);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>Bus Routes & Schedules | Nairobi to Kampala, Kigali, Juba - Trinity Express</title>
        <meta name="description" content="Check our daily bus schedules and ticket prices. We offer direct buses from Nairobi to Kampala, Kigali, Juba, and Dar es Salaam. Book your seat today." />
        <link rel="canonical" href="https://www.trinityexpressbusonlinebooking.com/routes" />
      </Helmet>
      {/* Header */}
      <div className="bg-[#1E3A8A] py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Our Routes</h1>
        <p className="text-xl text-blue-200">Connecting major cities across East Africa with comfort and reliability</p>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          
          {/* Section Title */}
          <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">International Routes</h2>
              <p className="text-gray-600">Travel across East Africa to Uganda, Rwanda, Tanzania, South Sudan, Burundi, and DR Congo</p>
            </div>
            {searchParams && (
              <div className="flex items-center gap-4 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <div className="text-sm">
                  <span className="text-gray-500">Filters: </span>
                  <span className="font-bold text-[#1E3A8A]">
                    {searchParams.origin && `From ${capitalizeCityName(searchParams.origin)}`} 
                    {searchParams.origin && searchParams.destination && ' → '}
                    {searchParams.destination && `To ${capitalizeCityName(searchParams.destination)}`}
                    {searchParams.date && ` on ${new Date(searchParams.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  </span>
                </div>
                <button 
                  onClick={handleClearSearch}
                  className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Routes List */}
          <div className="divide-y divide-gray-100">
            {filteredRoutes.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No routes found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any routes matching your search criteria.</p>
                <button 
                  onClick={handleClearSearch}
                  className="px-6 py-2 bg-[#1E3A8A] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  View All Routes
                </button>
              </div>
            ) : (
              filteredRoutes.map((route) => (
              <div key={route.id} className="p-6 hover:bg-white bg-white/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group border-b border-gray-100 last:border-0 hover:shadow-xl hover:z-10 relative transform hover:-translate-y-1 hover:scale-[1.01]">
                
                {/* Route Info */}
                <div className="flex-1 flex items-center gap-6">
                  {/* Origin */}
                  <div className="flex-1 min-w-[140px]">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">{route.origin}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{route.country_origin}</p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-300 group-hover:bg-[#1E88E5] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <ChevronRight className="w-6 h-6" />
                  </div>

                  {/* Destination */}
                  <div className="flex-1 min-w-[140px]">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">{route.destination}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{route.country_dest}</p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-[#1E3A8A] group-hover:text-[#1E88E5] transition-colors">{route.price}</p>
                    <div className="flex items-center justify-end text-xs text-gray-400 gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{route.duration}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBookClick(route)}
                    className="relative overflow-hidden px-8 py-3 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group/btn"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Book Now
                    </span>
                  </button>
                </div>

              </div>
            )))}
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {selectedRoute && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          route={selectedRoute}
          selectedDate={selectedDate}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Return Trip Modal */}
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

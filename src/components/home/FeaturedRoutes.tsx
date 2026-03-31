import React from 'react';
import { ArrowRight, Phone, Clock, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../ui/OptimizedImage';
import { useAdmin } from '../../context/AdminContext';

const FeaturedRoutes = () => {
  const { routes, contactInfo } = useAdmin();
  // Filter for featured routes (ids 1-4)
  const featuredRoutes = routes.filter(r => [1, 2, 3, 4].includes(r.id));

  const getNextDeparture = (routeId: number) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Create staggered schedules based on route ID to look realistic
    // Route 1: 06:00, 09:00, 12:00...
    // Route 2: 06:30, 09:30, 12:30...
    // Route 3: 07:00, 10:00, 13:00...
    // Route 4: 07:30, 10:30, 13:30...
    
    const intervalHours = 3;
    const offsetMinutes = (routeId % 4) * 30; // 0, 30, 60 (1h), 90 (1h30)
    
    // Start checking from 5 AM
    let checkHour = 5;
    let checkMinute = 0;
    
    // Add offset
    checkMinute += offsetMinutes;
    while (checkMinute >= 60) {
      checkMinute -= 60;
      checkHour += 1;
    }
    
    // Find next slot
    for (let i = 0; i < 24; i++) {
      if (checkHour > currentHour || (checkHour === currentHour && checkMinute > currentMinute)) {
        break;
      }
      checkHour += intervalHours;
    }
    
    // Format
    const d = new Date();
    d.setHours(checkHour);
    d.setMinutes(checkMinute);
    
    return d.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-1 bg-[#1E88E5] rounded-full"></div>
              <span className="text-[#1E88E5] font-bold uppercase tracking-wider text-sm">Discover East Africa</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Popular Destinations</h2>
            <p className="text-gray-600 text-lg font-light">Explore our most traveled routes with premium comfort</p>
          </div>
          <Link to="/routes" className="hidden md:flex items-center text-[#1E88E5] font-bold hover:text-blue-700 transition-colors group">
            View All Routes 
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center ml-3 group-hover:bg-blue-100 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredRoutes.map((route) => (
            <div key={route.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-gray-100">
              <div className="h-56 overflow-hidden relative">
                <OptimizedImage 
                  src={route.image || 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Bus%20travel%20East%20Africa&image_size=landscape_4_3'} 
                  alt={`${route.origin} to ${route.destination}`} 
                  className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-[#1E3A8A] shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  {route.rating}
                </div>
                
                <div className="absolute bottom-4 right-4 bg-[#F97316] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md animate-pulse">
                  Next Bus: {getNextDeparture(route.id)}
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-wider opacity-90 mb-1">One Way Ticket</p>
                  <p className="text-2xl font-bold">{route.price}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">From</p>
                    <h3 className="text-lg font-bold text-gray-900">{route.origin}</h3>
                  </div>
                  <ArrowRight className="text-gray-300 w-5 h-5" />
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">To</p>
                    <h3 className="text-lg font-bold text-gray-900">{route.destination}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 py-4 border-t border-gray-100 mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-[#1E88E5]" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-[#1E88E5]" />
                    <span>Direct</span>
                  </div>
                </div>
                
                <Link 
                  to="/routes" 
                  state={{ routeId: route.id }}
                  className="block w-full text-center py-3 border border-[#1E88E5] text-[#1E88E5] font-bold rounded-xl hover:bg-[#1E88E5] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Book This Trip
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/routes" className="inline-flex items-center text-[#1E88E5] font-bold hover:text-blue-700 transition-colors">
            View All Routes <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <a href={`tel:${contactInfo.phoneKE.replace(/\s+/g, '')}`} className="fixed left-6 bottom-6 z-50 p-4 bg-white text-green-600 rounded-full shadow-2xl hover:bg-green-50 transition-colors border border-green-100 group">
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </a>
      <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`} className="fixed right-6 bottom-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors hover:shadow-green-500/30 group">
        <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </section>
  );
};

export default FeaturedRoutes;

import React from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingWidget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/routes', { 
      state: { 
        origin: formData.origin, 
        destination: formData.destination,
        date: formData.date 
      } 
    });
  };

  return (
    <div id="booking-widget" className="relative z-20 -mt-24 md:-mt-32 container mx-auto px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden max-w-5xl mx-auto">
        
        {/* Booking Form Section */}
        <div className="p-8 pb-10 bg-gradient-to-r from-[#1E88E5]/90 to-[#1565C0]/90">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">Book Your Trip</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Origin */}
              <div className="relative group">
                <label className="flex items-center text-xs font-bold text-blue-100 uppercase tracking-wider mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <MapPin className="w-3 h-3 mr-1" />
                  From
                </label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all duration-300 hover:bg-white/15"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  >
                    <option value="" className="text-gray-700">Select departure city</option>
                    <option value="nairobi" className="text-gray-700">Nairobi</option>
                    <option value="kisumu" className="text-gray-700">Kisumu</option>
                    <option value="eldoret" className="text-gray-700">Eldoret</option>
                    <option value="kampala" className="text-gray-700">Kampala</option>
                    <option value="kigali" className="text-gray-700">Kigali</option>
                    <option value="mombasa" className="text-gray-700">Mombasa</option>
                    <option value="juba" className="text-gray-700">Juba</option>
                    <option value="dar-es-salaam" className="text-gray-700">Dar es Salaam</option>
                    <option value="bukavu" className="text-gray-700">Bukavu</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div className="relative group">
                <label className="flex items-center text-xs font-bold text-blue-100 uppercase tracking-wider mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <MapPin className="w-3 h-3 mr-1" />
                  To
                </label>
                <div className="relative">
                  <select 
                    className="w-full pl-4 pr-10 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all duration-300 hover:bg-white/15"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  >
                    <option value="" className="text-gray-700">Select destination city</option>
                    <option value="kampala" className="text-gray-700">Kampala</option>
                    <option value="nairobi" className="text-gray-700">Nairobi</option>
                    <option value="kigali" className="text-gray-700">Kigali</option>
                    <option value="mombasa" className="text-gray-700">Mombasa</option>
                    <option value="juba" className="text-gray-700">Juba</option>
                    <option value="dar-es-salaam" className="text-gray-700">Dar es Salaam</option>
                    <option value="bukavu" className="text-gray-700">Bukavu</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="relative group">
                <label className="flex items-center text-xs font-bold text-blue-100 uppercase tracking-wider mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Calendar className="w-3 h-3 mr-1" />
                  Travel Date
                </label>
                <div className="relative">
                  <input 
                    type="date"
                    className="w-full pl-4 pr-10 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-100 focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white/20 outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer transition-all duration-300 hover:bg-white/15"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                    onFocus={(e) => (e.target as HTMLInputElement).showPicker()}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-white w-5 h-5 pointer-events-none opacity-80" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="btn-sharp group w-full h-[58px] bg-white text-[#1565C0] font-bold hover:bg-orange-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Search Buses</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Popular Routes Section */}
        <div className="bg-white p-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Trending Routes:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { from: 'Nairobi', to: 'Kampala' },
                { from: 'Nairobi', to: 'Kigali' },
                { from: 'Nairobi', to: 'Juba' },
                { from: 'Nairobi', to: 'Bukavu' },
                { from: 'Nairobi', to: 'Dar es Salaam' },
                { from: 'Kisumu', to: 'Kampala' },
                { from: 'Kisumu', to: 'Kigali' },
                { from: 'Eldoret', to: 'Kigali' },
                { from: 'Eldoret', to: 'Kampala' },
              ].map((route, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    const origin = route.from.toLowerCase().replace(/\s+/g, '-');
                    const destination = route.to.toLowerCase().replace(/\s+/g, '-');
                    // Navigate immediately to routes page with the selected route
                    navigate('/routes', { 
                      state: { 
                        origin, 
                        destination,
                        date: new Date().toISOString().split('T')[0]
                      } 
                    });
                  }}
                  className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-[#1E88E5] hover:border-blue-200 transition-all duration-200 text-xs font-medium"
                >
                  {route.from} → {route.to}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingWidget;

import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { cityOptions } from '../../data/routeUtils';
import { Route } from '../../context/AdminContext';
import BookingModal from '../booking/BookingModal';

interface HomeBookingWidgetProps {
  defaultOrigin?: string;
  defaultDestination?: string;
}

const boardingPoints = [
  'Nairobi Terminal (CBD)',
  'River Road',
  'Tearoom',
  'Eastleigh',
  'South C',
  'Westlands Shell',
  'Kangemi Stage',
  'Kikuyu Stage',
  'Thika Road (TRM)',
  'Mlolongo',
  'Machakos Junction',
  'Other / Along the way',
];

const droppingPoints = [
  'Busia Border',
  'Kampala Terminal (Bakuli)',
  'Nakuru Town',
  'Kisumu CBD',
  'Eldoret CBD',
  'Mombasa CBD',
  'Kigali Terminal',
  'Other / Along the way',
];

const HomeBookingWidget = ({ defaultOrigin, defaultDestination }: HomeBookingWidgetProps) => {
  const cityList = cityOptions();
  const [origin, setOrigin] = useState(defaultOrigin || 'Nairobi');
  const [destination, setDestination] = useState(defaultDestination || 'Kampala');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [isRound, setIsRound] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoute, setModalRoute] = useState<Route | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError('Please select origin and destination');
      return;
    }
    setError('');
    setModalRoute({
      id: 0,
      origin,
      destination,
      price: 'KES 3,000',
      executive_price: 'KES 4,000',
      vip_price: 'KES 4,500',
      duration: 'Express Coach',
    } as Route);
    setModalOpen(true);
  };

  return (
    <div className="p-5 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 mx-2 my-3 border border-white/80 overflow-visible relative z-10">
      <div className="text-center mb-4 text-xs font-medium text-gray-600 flex flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center gap-1.5">
          Book your next ticket using
          <span className="font-black text-base text-[#36498c] tracking-tight">SimbaCoach</span>
        </div>
        <span className="text-[9px] text-gray-400 font-extrabold tracking-widest uppercase">Official SimbaCoach Online Booking</span>
      </div>

      <form onSubmit={handleSearch} className="space-y-3.5">
        {/* Trip Type */}
        <div className="flex items-center gap-6 mb-4 px-1">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-900 cursor-pointer select-none">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isRound ? 'border-[#1b36d1] bg-blue-50/50' : 'border-gray-300'}`}>
              {!isRound && <div className="w-2.5 h-2.5 rounded-full bg-[#1b36d1]" />}
            </div>
            <input type="radio" name="tripType" checked={!isRound} onChange={() => setIsRound(false)} className="hidden" />
            One Way
          </label>
          <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer select-none">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isRound ? 'border-[#1b36d1] bg-blue-50/50' : 'border-gray-300'}`}>
              {isRound && <div className="w-2.5 h-2.5 rounded-full bg-[#1b36d1]" />}
            </div>
            <input type="radio" name="tripType" checked={isRound} onChange={() => setIsRound(true)} className="hidden" />
            Round Trip
          </label>
        </div>

        {/* From */}
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">From</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full font-extrabold text-gray-900 text-base tracking-tight bg-transparent outline-none cursor-pointer appearance-none pr-6"
          >
            {cityList.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-3.5 pointer-events-none" />
        </div>

        {/* To */}
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">To</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full font-extrabold text-gray-900 text-base tracking-tight bg-transparent outline-none cursor-pointer appearance-none pr-6"
          >
            {cityList.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-3.5 pointer-events-none" />
        </div>

        {/* Travel Date */}
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Travel Date</label>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => (e.target as HTMLInputElement).showPicker()}
              className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base cursor-pointer"
            />
          </div>
        </div>

        {isRound && (
          <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
            <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Return Date</label>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="date"
                min={date}
                onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                className="w-full font-semibold text-gray-900 outline-none bg-transparent text-base cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Pick-up Point */}
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Pick-up / Boarding Point</label>
          <select
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full font-semibold text-gray-900 text-base bg-transparent outline-none cursor-pointer appearance-none"
          >
            <option value="">Select boarding point...</option>
            {boardingPoints.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Drop-off Point */}
        <div className="relative bg-white/40 hover:bg-white/80 border border-gray-200/90 rounded-2xl p-3 focus-within:border-[#1b36d1] focus-within:bg-white/95 focus-within:ring-2 focus-within:ring-blue-100/50 shadow-[0_2px_10px_rgba(31,41,55,0.01)] transition-all">
          <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">Drop-off / Alighting Point</label>
          <select
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full font-semibold text-gray-900 text-base bg-transparent outline-none cursor-pointer appearance-none"
          >
            <option value="">Select dropping point...</option>
            {droppingPoints.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-600 text-xs font-bold text-center">{error}</p>}

        <button type="submit" className="w-full bg-[#151515] hover:bg-black active:scale-[0.98] text-white font-bold py-4 rounded-full transition-all text-base tracking-wider uppercase shadow-md hover:shadow-lg">
          Search Bus
        </button>
      </form>

      {modalRoute && (
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          route={modalRoute}
          selectedDate={date}
        />
      )}
    </div>
  );
};

export default HomeBookingWidget;
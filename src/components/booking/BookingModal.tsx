import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Clock, CheckCircle, MessageCircle, Ticket } from 'lucide-react';
import { Route, useAdmin } from '../../context/AdminContext';
import { findRoute, ParsedRoute, depMinutes, formatPrice } from '../../data/routeUtils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: Route;
  selectedDate?: string;
  onBookingComplete?: (bookingDetails: { origin: string; destination: string; date: string; price: string }) => void;
}

// Full ordered seat list A1..K4 (44 seats)
const ALL_SEATS = (() => {
  const a: string[] = [];
  for (let r = 0; r < 11; r++) {
    const row = String.fromCharCode(65 + r);
    for (let s = 1; s <= 4; s++) a.push(row + s);
  }
  return a;
})();

const baseBusConfig: Record<string, string[]> = {
  '06:00 AM': ['A1', 'A2', 'B3', 'C1', 'C4', 'D2', 'E3', 'F1', 'G2', 'H4', 'I2', 'J1', 'K3'],
  '10:00 AM': ['A3', 'B1', 'B2', 'D4', 'E1', 'F3', 'G4', 'H2', 'I4', 'J3', 'K1'],
  '02:00 PM': ['A2', 'A4', 'B1', 'C3', 'D1', 'E4', 'F2', 'G1', 'H3', 'I1', 'J4', 'K2'],
  '04:00 PM': ['A1', 'A3', 'B2', 'C2', 'D3', 'E2', 'F4', 'G3', 'H1', 'I3', 'J2', 'K4'],
  '08:00 PM': ['A1', 'B2', 'B4', 'C2', 'D3', 'E2', 'F4', 'G3', 'H1', 'I3', 'J2', 'K4'],
};

function seededBag(seedN: number, pool: string[], count: number): string[] {
  let s = seedN || 1;
  const arr = pool.slice();
  const out: string[] = [];
  for (let i = arr.length - 1; i >= 0 && out.length < count; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    out.push(arr[j]);
    arr[j] = arr[i];
  }
  return out;
}

function currentBookedSeats(time: string, travelDate: string): string[] {
  const base = (baseBusConfig[time] || []).slice();
  const now = new Date();
  let dep = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (travelDate) {
    const parts = travelDate.split('-');
    dep = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  dep.setHours(0, 0, 0, 0);
  dep.setMinutes(depMinutes(time));
  const minsToDep = Math.round((dep.getTime() - now.getTime()) / 60000);
  let fillFrac: number;
  if (minsToDep <= 0) fillFrac = 1.0;
  else if (minsToDep <= 60) fillFrac = Math.min(0.92, Math.max(base.length / 44 + 0.25, 0.55));
  else if (minsToDep <= 180) fillFrac = Math.max(base.length / 44 + 0.1, 0.45);
  else if (minsToDep <= 360) fillFrac = Math.max(base.length / 44, 0.35);
  else if (minsToDep <= 720) fillFrac = Math.max(base.length / 44 - 0.05, 0.22);
  else fillFrac = Math.max(base.length / 44 - 0.1, 0.15);
  const available = ALL_SEATS.filter((s) => base.indexOf(s) === -1);
  const target = Math.round(ALL_SEATS.length * fillFrac);
  const extraNeeded = Math.max(0, target - base.length);
  const seed = depMinutes(time) + 7;
  const extra = seededBag(seed, available, extraNeeded);
  const seen: Record<string, boolean> = {};
  const out: string[] = [];
  base.concat(extra).forEach((s) => {
    if (!seen[s]) {
      seen[s] = true;
      out.push(s);
    }
  });
  return out;
}

const BookingModal = ({ isOpen, onClose, route, selectedDate, onBookingComplete }: BookingModalProps) => {
  const { addBooking, contactInfo } = useAdmin();
  const whatsapp = contactInfo?.whatsapp?.replace(/[^0-9]/g, '') || '254735893829';

  const parsed: ParsedRoute | null = findRoute(route.origin, route.destination);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [travelDate, setTravelDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSeatsByBus, setSelectedSeatsByBus] = useState<Record<string, string[]>>({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setSelectedDeparture(null);
    setSelectedSeats([]);
    setSelectedSeatsByBus({});
    setName('');
    setPhone('');
    setError('');
    setSuccess('');
    setBookingRef('');
    setTravelDate(selectedDate || new Date().toISOString().split('T')[0]);
    setIsRoundTrip(false);
    setReturnDate('');
  }, [isOpen, route.origin, route.destination, selectedDate]);

  if (!isOpen) return null;

  const info = parsed || {
    origin: route.origin,
    destination: route.destination,
    price: parseFloat(route.price.replace(/[^0-9.]/g, '')) || 3000,
    executivePrice: parseFloat((route.executive_price || '').replace(/[^0-9.]/g, '')) || 4000,
    vipPrice: parseFloat((route.vip_price || '').replace(/[^0-9.]/g, '')) || 4500,
    currency: 'KES',
    duration: route.duration,
    departures: route.departures || [],
  };

  const currency = info.currency;

  // Available departure times: filter past departures only if today
  const now = new Date();
  const isToday = new Date(travelDate).toDateString() === now.toDateString();
  const times = info.departures.length > 0 ? info.departures : ['06:00 AM', '10:00 AM', '02:00 PM', '08:00 PM'];
  const availableTimes = times.filter((t) => !isToday || depMinutes(t) > now.getHours() * 60 + now.getMinutes());
  const noDepartures = availableTimes.length === 0;

  const seatsLeft = (time: string) => Math.max(0, 44 - currentBookedSeats(time, travelDate).length);

  const autoNextDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setTravelDate(d.toISOString().split('T')[0]);
  };

  const showSeatGrid = (time: string) => {
    setSelectedDeparture(time);
    setSelectedSeats(selectedSeatsByBus[time] ? selectedSeatsByBus[time].slice() : []);
    setStep(2);
  };

  const toggleSeat = (seat: string, booked: string[]) => {
    if (booked.indexOf(seat) > -1) return;
    const idx = selectedSeats.indexOf(seat);
    let next: string[];
    if (idx > -1) {
      next = selectedSeats.slice();
      next.splice(idx, 1);
    } else {
      next = [...selectedSeats, seat];
    }
    setSelectedSeats(next);
    if (selectedDeparture) {
      setSelectedSeatsByBus((prev) => ({ ...prev, [selectedDeparture]: next }));
    }
  };

  const totalPrice = selectedSeats.reduce((sum, s) => {
    const row = s.charAt(0).charCodeAt(0) - 65;
    if (row < 3) return sum + info.vipPrice;
    if (row < 6) return sum + info.executivePrice;
    return sum + info.price;
  }, 0) * (isRoundTrip ? 2 : 1);

  const showBookingForm = () => {
    if (selectedSeats.length === 0) return;
    setStep(3);
  };

  const submitBooking = () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!travelDate) {
      setError('Please select a travel date');
      return;
    }
    const ref = 'SIM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
    const totalStr = formatPrice(currency, totalPrice);
    const tripType = isRoundTrip ? 'Round Trip' : 'One Way';

    selectedSeats.forEach((seat) => {
      const seatNumber = parseInt(seat.replace(/[^0-9]/g, ''), 10);
      addBooking({
        routeId: route.id,
        origin: info.origin || route.origin,
        destination: info.destination || route.destination,
        date: travelDate,
        time: `${selectedDeparture} | ${tripType}`,
        seat: seatNumber,
        passengers: 1,
        passengerName: name,
        phoneNumber: phone,
        totalPrice: totalStr,
        paymentMethod: ref,
        deviceType: 'Web',
        userLocation: `Seats: ${selectedSeats.join(', ')}`,
        status: 'pending',
        tripType: isRoundTrip ? 'return' : 'one-way',
      });
    });

    setBookingRef(ref);
    setSuccess(
      `Ref: ${ref}\n${info.origin} → ${info.destination}\nDeparture: ${selectedDeparture}\nSeats: ${selectedSeats.join(', ')}\nTotal: ${totalStr}`
    );
    setError('');
  };

  const waMsg = encodeURIComponent(
    `Hello SimbaCoach! I would like to complete payment for my booking.\n\n*Booking Ref:* ${bookingRef}\n*Route:* ${info.origin} → ${info.destination}\n*Date:* ${travelDate}\n*Departure:* ${selectedDeparture}\n*Trip:* ${isRoundTrip ? 'Round Trip' : 'One Way'}\n*Seats:* ${selectedSeats.join(', ')}\n*Total:* ${formatPrice(currency, totalPrice)}\n*Name:* ${name}\n*Phone:* ${phone}\n\nPlease share M-Pesa paybill or bank details for payment. Thank you!`
  );

  const reset = () => {
    setStep(1);
    setSelectedDeparture(null);
    setSelectedSeats([]);
    setError('');
    setSuccess('');
    setBookingRef('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={(e) => { if (e.target === e.currentTarget) reset(); }}>
      <div className="w-full max-w-md bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up pb-6">
        {/* Handle */}
        <div className="sticky top-0 bg-white pt-3 pb-2 px-6 border-b border-gray-100 z-20 flex items-center justify-between">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <h3 className="font-black text-gray-900 text-lg">Book This Route</h3>
          <button onClick={reset} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-[#36498c]/5 border border-[#36498c]/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-gray-900">{info.origin}</span>
                  <span className="font-extrabold text-gray-300 text-xs">➔</span>
                  <span className="font-extrabold text-gray-900">{info.destination}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{info.duration || 'Express Coach'} Trip • Express Coach</span>
                  <span className="text-[#cc0000] font-black text-base">{formatPrice(currency, info.price)}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Trip Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsRoundTrip(false)}
                    className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl p-3 cursor-pointer transition-all ${!isRoundTrip ? 'border-[#36498c] bg-[#36498c]/5' : 'border-gray-200'}`}
                  >
                    <span className="text-sm font-bold text-gray-700">One Way</span>
                  </button>
                  <button
                    onClick={() => setIsRoundTrip(true)}
                    className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl p-3 cursor-pointer transition-all ${isRoundTrip ? 'border-[#36498c] bg-[#36498c]/5' : 'border-gray-200'}`}
                  >
                    <span className="text-sm font-bold text-gray-700">Round Trip</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c]"
                />
              </div>
              {isRoundTrip && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    min={travelDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c]"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Available Departures</label>
                {noDepartures ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-gray-900 text-base mb-1">All buses have departed</h3>
                    <p className="text-xs text-gray-500 mb-4">There are no more departures for this date. Please select a future date to book your ticket.</p>
                    <button onClick={autoNextDate} className="bg-[#36498c] hover:bg-black text-white font-bold py-2.5 px-5 rounded-xl text-sm transition-all">
                      Book Tomorrow
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableTimes.map((t) => {
                      const left = seatsLeft(t);
                      return (
                        <div key={t} className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-black text-gray-900 text-lg">{t}</span>
                            <span className={`text-xs ${left <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} px-2.5 py-0.5 rounded-full font-bold`}>
                              {left} left
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="text-center p-2 rounded-xl bg-[#ffb000]/10">
                              <div className="text-[10px] font-bold text-gray-500 uppercase">Standard</div>
                              <div className="font-black text-sm text-gray-900">{formatPrice(currency, info.price)}</div>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-[#3b82f6]/10">
                              <div className="text-[10px] font-bold text-gray-500 uppercase">Executive</div>
                              <div className="font-black text-sm text-gray-900">{formatPrice(currency, info.executivePrice)}</div>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-[#36498c]/5">
                              <div className="text-[10px] font-bold text-gray-500 uppercase">VIP</div>
                              <div className="font-black text-sm text-gray-900">{formatPrice(currency, info.vipPrice)}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => showSeatGrid(t)}
                            disabled={left === 0}
                            className={`w-full bg-[#36498c] hover:bg-black text-white font-bold py-2.5 rounded-xl transition-all text-sm ${left === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            {left === 0 ? 'Fully Booked' : 'View Seats'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button onClick={reset} className="w-full text-center text-sm font-bold text-gray-500 hover:text-gray-700 py-2 transition-colors">
                Cancel
              </button>
            </div>
          )}

          {step === 2 && selectedDeparture && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-[#36498c] hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Change Departure
                  </button>
                  <p className="text-sm font-black text-gray-900 mt-1">Select Seats — {selectedDeparture}</p>
                </div>
              </div>

              <div className="bg-[#36498c]/10 border border-[#36498c]/20 rounded-xl px-4 py-2.5 text-sm font-bold text-[#36498c] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Selected Departure: {selectedDeparture}</span>
              </div>

              <div className="flex flex-wrap gap-3 text-[10px] font-bold">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#111827]" /> Standard ({formatPrice(currency, info.price)})</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#3b82f6]" /> Executive ({formatPrice(currency, info.executivePrice)})</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#ffb000]" /> VIP ({formatPrice(currency, info.vipPrice)})</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-600" /> Selected</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gray-300" /> Booked</span>
              </div>

              <div className="bg-gray-50 rounded-2xl pt-4 pb-3 px-3 shadow-inner">
                <div className="flex items-center gap-2 mb-2 text-[10px] text-gray-500 font-bold">
                  <span>Door</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="bus-layout">
                  {(() => {
                    const booked = currentBookedSeats(selectedDeparture, travelDate);
                    const rows = [];
                    for (let r = 0; r < 11; r++) rows.push(String.fromCharCode(65 + r));
                    return rows.map((row, ri) => {
                      const isVip = ri < 3;
                      const isExec = ri >= 3 && ri < 6;
                      const buildSeat = (s: number) => {
                        const seat = `${row}${s}`;
                        const isBooked = booked.indexOf(seat) > -1;
                        const isSelected = selectedSeats.indexOf(seat) > -1;
                        return (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat, booked)}
                            disabled={isBooked}
                            className={`seat-btn ${isVip ? 'vip' : isExec ? 'exec' : 'normal'} ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-md">
                              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                              <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
                              <path d="M5 18v2" />
                              <path d="M19 18v2" />
                            </svg>
                            <span className="seat-label">{seat}</span>
                          </button>
                        );
                      };
                      return (
                        <div key={row} className="seat-row">
                          {buildSeat(1)}
                          {buildSeat(2)}
                          <div className="seat-aisle" />
                          {buildSeat(3)}
                          {buildSeat(4)}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-500">Selected: </span>
                  <span className="font-bold text-gray-900">{selectedSeats.join(', ') || 'None'}</span>
                </div>
                <span className="font-black text-gray-900">{formatPrice(currency, totalPrice)}</span>
              </div>

              <button
                onClick={showBookingForm}
                disabled={selectedSeats.length === 0}
                className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all ${
                  selectedSeats.length > 0 ? 'bg-[#36498c] hover:bg-black text-white shadow-lg cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Ticket className="w-4 h-4 inline mr-2" />CONTINUE
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <button onClick={() => setStep(2)} className="text-xs font-bold text-[#36498c] hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Change Seats
                </button>
              </div>

              <div className="bg-[#151515] text-white rounded-2xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold opacity-70">Route</span>
                  <span className="font-black">{info.origin} → {info.destination}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1.5">
                  <span className="font-bold opacity-70">Departure</span>
                  <span className="font-black">{selectedDeparture}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1.5">
                  <span className="font-bold opacity-70">Seats</span>
                  <span className="font-black">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1.5">
                  <span className="font-bold opacity-70">Passengers</span>
                  <span className="font-black">{selectedSeats.length} seat(s)</span>
                </div>
                <hr className="border-neutral-700 my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-black">{formatPrice(currency, totalPrice)}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-xs text-yellow-800 space-y-1">
                <p className="font-bold">Payment Instructions</p>
                <p>After booking, tap the WhatsApp button to send your booking details and complete payment via M-Pesa or bank transfer.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 2547XXXXXXXX"
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-gray-900 outline-none focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c]"
                />
              </div>

              {error && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}
              {success && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-sm">
                  <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                    <CheckCircle className="w-4 h-4" /> Booking Confirmed!
                  </div>
                  <p className="text-xs text-green-600 whitespace-pre-line">{success}</p>
                </div>
              )}

              {!success && (
                <button onClick={submitBooking} className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg text-base tracking-wide">
                  <Ticket className="w-4 h-4 inline mr-2" />CONFIRM BOOKING
                </button>
              )}
              {success && (
                <>
                  <a
                    href={`https://wa.me/${whatsapp}?text=${waMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center inline-block bg-[#00a859] hover:bg-[#00904b] text-white font-black py-4 rounded-2xl transition-all shadow-lg text-base tracking-wide"
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />PAY ON WHATSAPP
                  </a>
                  <button
                    onClick={() => {
                      reset();
                      if (onBookingComplete) {
                        onBookingComplete({ origin: info.origin, destination: info.destination, date: travelDate, price: formatPrice(currency, totalPrice) });
                      }
                    }}
                    className="w-full text-center text-sm font-bold text-gray-500 hover:text-gray-700 py-2 transition-colors"
                  >
                    Done
                  </button>
                </>
              )}
              {!success && (
                <button onClick={reset} className="w-full text-center text-sm font-bold text-gray-500 hover:text-gray-700 py-2 transition-colors">
                  Continue Browsing
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
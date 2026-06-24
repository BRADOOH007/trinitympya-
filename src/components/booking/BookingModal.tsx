import React, { useState } from 'react';
import { X, Calendar, Clock, ArrowRight, Sun, Moon, Users, CheckCircle, Smartphone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.jpeg';
import { Route, useAdmin } from '../../context/AdminContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: Route;
  selectedDate?: string;
  onBookingComplete?: (bookingDetails: { origin: string; destination: string; date: string; price: string }) => void;
}

const BookingModal = ({ isOpen, onClose, route, selectedDate, onBookingComplete }: BookingModalProps) => {
  const { addBooking } = useAdmin();
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const [passengerName, setPassengerName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [busClass, setBusClass] = React.useState<'regular' | 'vip'>('regular'); // New state for bus class
  
  const [passengers, setPassengers] = React.useState(1);
  const [step, setStep] = useState(1); // 1: Select Details, 2: Payment

  // Use the selected date or default to today
  const [bookingDate, setBookingDate] = React.useState(selectedDate || new Date().toISOString().split('T')[0]);

  // Dummy seats data - VIP (V1-V19) and Regular (R20-R42)
  const generateSeats = () => {
    const allSeats = [];
    
    // VIP Seats: V1-V19
    for (let i = 1; i <= 19; i++) {
      allSeats.push({
        id: `V${i}`,
        number: i,
        status: Math.random() > 0.7 ? 'booked' : 'available',
        type: 'vip'
      });
    }
    
    // Regular Seats: R20-R42
    for (let i = 20; i <= 42; i++) {
      allSeats.push({
        id: `R${i}`,
        number: i,
        status: Math.random() > 0.7 ? 'booked' : 'available',
        type: 'regular'
      });
    }
    
    return allSeats;
  };

  const seats = generateSeats();

  if (!isOpen) return null;

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat) return;
    
    // Check if seat type matches selected bus class
    if (busClass === 'vip' && seat.type !== 'vip') {
      alert('Please select VIP seats (V1-V19) for VIP class');
      return;
    }
    if (busClass === 'regular' && seat.type !== 'regular') {
      alert('Please select Regular seats (R20-R42) for Regular class');
      return;
    }
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats(prev => [...prev, seatId]);
      } else {
        setSelectedSeats(prev => [...prev.slice(1), seatId]);
      }
    }
  };

  const handleProceed = () => {
    if (selectedTime && selectedSeats.length === passengers) {
      setStep(2);
    }
  };

  const finalizeBooking = (paymentMethodName: string, status: 'pending' | 'confirmed', totalPrice: string) => {
    // Capture Device Type
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
      }
      if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Mobile";
      }
      return "Desktop";
    };

    const deviceType = getDeviceType();
    const userLocation = 'Unknown';
    
    selectedSeats.forEach(seat => {
        // Extract numeric part from seat ID (e.g. "V3" -> 3, "R25" -> 25)
        const seatNumber = parseInt(seat.replace(/[^0-9]/g, ''), 10);
        const booking = {
          routeId: route.id,
          origin: route.origin,
          destination: route.destination,
          date: bookingDate,
          time: selectedTime!,
          seat: seatNumber,
          passengers: 1,
          passengerName,
          phoneNumber,
          totalPrice,
          paymentMethod: paymentMethodName,
          deviceType,
          userLocation,
          status
        };
        addBooking(booking); 
    });

    // Reset form state
    setStep(1);
    setSelectedTime(null);
    setSelectedSeats([]);
    setPassengerName('');
    setPhoneNumber('');
    setIdNumber('');
  };

  const getCurrency = () => {
    if (route.price.includes('UGX')) return 'UGX';
    if (route.price.includes('RWF')) return 'RWF';
    if (route.price.includes('USD')) return 'USD';
    return 'KSh';
  };

  const getBasePrice = () => {
    // Remove non-numeric characters except decimal point
    return parseFloat(route.price.replace(/[^0-9.]/g, ''));
  };

  const getVIPPrice = () => {
    const basePrice = getBasePrice();
    return basePrice + 1500; // VIP is 1500 more than regular
  };

  const getCurrentPrice = () => {
    return busClass === 'vip' ? getVIPPrice() : getBasePrice();
  };

  const calculateTotal = () => {
    const price = getCurrentPrice();
    const total = price * passengers;
    // Format back to currency string
    return `${getCurrency()} ${total.toLocaleString()}`;
  };

  // Ensure buttons are not submitting any forms implicitly

  const handleWhatsAppBooking = () => {
    if (!phoneNumber) {
        alert("Please enter a phone number");
        return;
    }

    // Calculate total with proper error handling
    const priceNum = getCurrentPrice();
    const totalAmount = priceNum * passengers;
    const currency = getCurrency();
    const formattedTotal = `${currency} ${totalAmount.toLocaleString()}`;

    console.log('WhatsApp Booking Debug:', {
      route,
      origin: route.origin,
      destination: route.destination,
      price: route.price,
      busClass,
      priceNum,
      totalAmount,
      formattedTotal
    });

    // Build message with proper formatting
    const message = `Hello, I would like to confirm my booking:

Route: ${route.origin} to ${route.destination}
Bus Class: ${busClass === 'vip' ? 'Executive VIP' : 'Regular'}
Date: ${new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
Time: ${selectedTime}
Seats: ${selectedSeats.join(', ')}
Passenger Name: ${passengerName || 'Not provided'}
ID/Passport: ${idNumber || 'Not provided'}
Phone Number: ${phoneNumber}
Total Passengers: ${passengers}
Total Amount: ${formattedTotal}

Please confirm availability and send payment details. Thank you!`;

    console.log('WhatsApp message:', message);

    const whatsappUrl = `https://wa.me/254755356109?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Save booking first
    finalizeBooking('Pending Payment (WhatsApp)', 'pending', formattedTotal);
    
    // Close this modal and trigger return trip offer after a short delay
    onClose();
    
    setTimeout(() => {
      if (onBookingComplete) {
        onBookingComplete({
          origin: route.origin,
          destination: route.destination,
          date: bookingDate,
          price: formattedTotal
        });
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-elevation-4 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-elevation-1 bg-white p-1">
                <img 
                  src={logo} 
                  alt="Trinity Express Logo" 
                  className="w-full h-full object-cover rounded-xl" 
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{step === 1 ? 'Book Your Seat' : 'Confirm & Pay'}</h2>
                <p className="text-slate-600">{step === 1 ? 'Select your departure time and preferred seat' : 'Choose payment method to complete booking'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-all hover:shadow-elevation-1">
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {step === 1 ? (
            <>
              {/* Step 1 Content: Seat Selection (Existing Code) */}
              
              {/* Trip Summary Card */}
              <div className="card-modern p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Departure</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{route.origin}</h3>
                    <p className="text-primary-600 font-bold mt-1 text-lg">{route.price}</p>
                    <div className="flex items-center justify-center text-slate-500 text-sm mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{route.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center shadow-elevation-2">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-secondary-600" />
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Destination</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-2xl font-bold text-slate-900">{route.destination}</h3>
                      <span className="text-slate-400 text-sm">({route.country})</span>
                    </div>
                    <div className="flex items-center justify-center text-slate-500 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Date & Passenger Count */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="card-modern p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Travel Date</h4>
                        <p className="text-sm text-slate-600">Select or change your travel date</p>
                      </div>
                    </div>
                    <input 
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-pointer transition-all"
                    />
                  </div>
                </div>

                <div className="card-modern p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center text-secondary-600">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Passengers</h4>
                        <p className="text-sm text-slate-600">How many people are travelling?</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setPassengers(num)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                            passengers === num 
                              ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-elevation-1' 
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bus Class Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Select Bus Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Regular Class */}
                  <button
                    onClick={() => setBusClass('regular')}
                    className={`card-modern p-8 transition-all text-left ${
                      busClass === 'regular'
                        ? 'border-primary-500 bg-primary-50'
                        : ''
                    }`}
                  >
                    {busClass === 'regular' && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-elevation-1">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="mb-4">
                      <h4 className="font-bold text-slate-900 text-xl">Regular</h4>
                      <p className="text-sm text-slate-500 mt-1">Seats R20-R42 (23 seats)</p>
                    </div>
                    <div className="mb-6">
                      <p className="text-3xl font-bold text-primary-600">{getCurrency()} {getBasePrice().toLocaleString()}</p>
                    </div>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Standard seating
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Air conditioning
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Safe & comfortable
                      </li>
                    </ul>
                  </button>

                  {/* VIP Class */}
                  <button
                    onClick={() => setBusClass('vip')}
                    className={`card-modern p-8 transition-all text-left relative ${
                      busClass === 'vip'
                        ? 'border-orange-500 bg-orange-50'
                        : ''
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      {busClass === 'vip' ? (
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-elevation-1">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">VIP</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <h4 className="font-bold text-slate-900 text-xl">Executive VIP</h4>
                      <p className="text-sm text-slate-500 mt-1">Seats V1-V19 (19 seats)</p>
                    </div>
                    <div className="mb-6">
                      <p className="text-3xl font-bold text-orange-600">{getCurrency()} {getVIPPrice().toLocaleString()}</p>
                    </div>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                        Reclining leather seats
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                        Extra legroom
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                        WiFi & USB charging
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                        Refreshments included
                      </li>
                    </ul>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Section 1: Departure Time */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center font-bold text-sm shadow-elevation-1">1</div>
                    <h3 className="text-xl font-bold text-slate-900">Select Departure Time</h3>
                  </div>

                  {/* Departure Times - Standard schedule for all routes */}
                  {(() => {
                    const schedule = [
                      { time: '06:00 AM', period: 'Morning', icon: Sun, color: 'text-orange-400' },
                      { time: '12:00 PM', period: 'Afternoon', icon: Sun, color: 'text-yellow-500' },
                      { time: '04:00 PM', period: 'Afternoon', icon: Sun, color: 'text-yellow-500' },
                      { time: '08:00 PM', period: 'Evening', icon: Moon, color: 'text-indigo-400' },
                    ];
                    
                    // Show all slots regardless of current time
                    const availableSlots = schedule;
                    
                    const periods = ['Morning', 'Afternoon', 'Evening'];
                    
                    return periods.map(period => {
                      const slots = availableSlots.filter(s => s.period === period);
                      if (slots.length === 0) return null;
                      const PeriodIcon = slots[0].icon;
                      
                      return (
                        <div key={period} className="mb-6">
                          <div className="flex items-center gap-2 text-slate-600 mb-3 text-sm font-semibold">
                            <PeriodIcon className={`w-4 h-4 ${slots[0].color}`} />
                            <span>{period}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {slots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-4 px-6 rounded-xl border text-sm font-semibold transition-all ${
                                  selectedTime === slot.time 
                                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-700 ring-2 ring-primary-200 shadow-elevation-1' 
                                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}

                  {/* Seat Legend */}
                  <div className="card-modern p-6">
                    <p className="font-bold text-slate-900 mb-4">Seat Legend:</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-orange-100 border-2 border-orange-300"></div>
                        <span className="text-slate-700">VIP Available (V1-V19)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-green-500"></div>
                        <span className="text-slate-700">Regular Available (R20-R42)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600"></div>
                        <span className="text-slate-700">Selected</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-lg bg-red-400"></div>
                        <span className="text-slate-700">Booked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Seat Selection */}
                <div className="border-l border-slate-100 pl-0 md:pl-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center font-bold text-sm shadow-elevation-1">2</div>
                    <h3 className="text-xl font-bold text-slate-900">Choose Your Seat</h3>
                  </div>

                  {!selectedTime ? (
                    <div className="h-80 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-600 font-medium max-w-xs">Please select a departure time first to view available seats</p>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto bg-slate-100 p-8 rounded-2xl relative">
                      {/* Driver */}
                      <div className="flex justify-end mb-8">
                         <div className="w-14 h-14 rounded-full bg-slate-300 flex items-center justify-center">
                           <svg className="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12,6.5A1.5,1.5 0 0,1 13.5,8A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 10.5,8A1.5,1.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,13.5V20H15V13.5L16.5,12.5C17.41,11.87 18,10.81 18,9.63C18,7.57 16.43,6 14.37,6H9.63C7.57,6 6,7.57 6,9.63C6,10.81 6.59,11.87 7.5,12.5L9,13.5Z" />
                           </svg>
                         </div>
                      </div>
                      
                      {/* Door Label */}
                      <div className="absolute left-3 top-24 text-xs text-slate-400 font-bold transform -rotate-90 origin-center">
                        DOOR
                      </div>
                      
                      {/* VIP Section Header */}
                      <div className="mb-4 text-center">
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-elevation-1">VIP SECTION</span>
                      </div>
                      
                      {/* VIP Seats: V1-V19 (2-2 layout) */}
                      <div className="space-y-3 mb-8">
                        {Array.from({ length: 5 }, (_, rowIndex) => {
                          const startSeat = rowIndex * 4 + 1;
                          const rowSeats = seats.filter(s => 
                            s.type === 'vip' && 
                            s.number >= startSeat && 
                            s.number < startSeat + 4
                          );
                          
                          if (rowSeats.length === 0) return null;
                          
                          return (
                            <div key={`vip-row-${rowIndex}`} className="grid grid-cols-5 gap-3">
                              {/* Left side - 2 seats */}
                              {rowSeats.slice(0, 2).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-elevation-1 transform scale-105'
                                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-sm border-2 border-orange-300'
                                    }
                                  `}
                                >
                                  {seat.id}
                                </button>
                              ))}
                              
                              {/* Aisle */}
                              <div className="aspect-square"></div>
                              
                              {/* Right side - 2 seats */}
                              {rowSeats.slice(2, 4).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-elevation-1 transform scale-105'
                                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-sm border-2 border-orange-300'
                                    }
                                  `}
                                >
                                  {seat.id}
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Regular Section Header */}
                      <div className="mb-4 text-center border-t-2 border-dashed border-slate-300 pt-6">
                        <span className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-elevation-1">REGULAR SECTION</span>
                      </div>
                      
                      {/* Regular Seats: R20-R42 (2-2 layout) */}
                      <div className="space-y-3">
                        {Array.from({ length: 6 }, (_, rowIndex) => {
                          const startSeat = 20 + (rowIndex * 4);
                          const rowSeats = seats.filter(s => 
                            s.type === 'regular' && 
                            s.number >= startSeat && 
                            s.number < startSeat + 4
                          );
                          
                          if (rowSeats.length === 0) return null;
                          
                          return (
                            <div key={`regular-row-${rowIndex}`} className="grid grid-cols-5 gap-3">
                              {/* Left side - 2 seats */}
                              {rowSeats.slice(0, 2).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-elevation-1 transform scale-105'
                                        : 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
                                    }
                                  `}
                                >
                                  {seat.id}
                                </button>
                              ))}
                              
                              {/* Aisle */}
                              <div className="aspect-square"></div>
                              
                              {/* Right side - 2 seats */}
                              {rowSeats.slice(2, 4).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-elevation-1 transform scale-105'
                                        : 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
                                    }
                                  `}
                                >
                                  {seat.id}
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Step 2: Payment
            <div className="max-w-2xl mx-auto space-y-10">
              <div className="card-modern p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Booking Summary</h3>
                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Route:</span>
                    <span className="font-semibold text-slate-900">{route.origin} → {route.destination}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Bus Class:</span>
                    <span className="font-semibold text-slate-900">
                      {busClass === 'vip' ? (
                        <span className="inline-flex items-center gap-2">
                          Executive VIP
                          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">VIP</span>
                        </span>
                      ) : (
                        'Regular'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Date/Time:</span>
                    <span className="font-semibold text-slate-900">{new Date(bookingDate).toLocaleDateString()} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Seat:</span>
                    <span className="font-semibold text-slate-900">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Passengers:</span>
                    <span className="font-semibold text-slate-900">{passengers}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center text-xl font-bold">
                    <span>Total Amount:</span>
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Passenger Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ID or Passport Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="e.g. 12345678 or AB1234567"
                      className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h3>
                <div className="card-modern border-2 border-green-500 p-6 flex flex-col gap-4 bg-green-50">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Get Payment Info / WhatsApp</h4>
                    <p className="text-slate-500 mt-1">Book via WhatsApp. Receive payment details.</p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800 mb-4 text-lg">Instructions:</p>
                  <div className="space-y-2 text-slate-700">
                    <p className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>1. Click "Confirm Booking" to open WhatsApp.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>2. Send the pre-filled message to our agent.</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>3. Wait for confirmation and payment details.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-700">
              {step === 1 ? (
                <>
                  Selected: <span className="font-bold text-slate-900 text-lg">{selectedTime || 'No time selected'}</span> | 
                  Seat: <span className="font-bold text-slate-900 text-lg">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </>
              ) : (
                <button onClick={() => setStep(1)} className="text-primary-600 hover:underline font-semibold text-lg flex items-center gap-2">
                  ← Back to Seat Selection
                </button>
              )}
            </div>
            
            {step === 1 ? (
              <button 
                onClick={handleProceed}
                disabled={!selectedTime || selectedSeats.length !== passengers}
                className={`
                  flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white transition-all
                  ${selectedTime && selectedSeats.length === passengers 
                    ? 'bg-gradient-to-br from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 shadow-elevation-2 hover:shadow-elevation-3 transform hover:-translate-y-0.5' 
                    : 'bg-slate-300 cursor-not-allowed'
                  }
                `}
              >
                Continue to Payment
                <ArrowRight className="w-6 h-6" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleWhatsAppBooking}
                disabled={!phoneNumber}
                className={`
                  flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white transition-all
                  ${!phoneNumber
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-elevation-2 hover:shadow-elevation-3 transform hover:-translate-y-0.5'
                  }
                `}
              >
                <CheckCircle className="w-6 h-6" />
                Confirm Booking
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;

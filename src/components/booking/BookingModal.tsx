import React, { useState } from 'react';
import { X, Calendar, Clock, ArrowRight, Sun, Moon, Users, CheckCircle, Smartphone } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
              <img 
                src={logo} 
                alt="Trinity Express Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{step === 1 ? 'Book Your Seat' : 'Confirm & Pay'}</h2>
              <p className="text-gray-500 text-sm">{step === 1 ? 'Select your departure time and preferred seat' : 'Choose payment method to complete booking'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {step === 1 ? (
            <>
              {/* Step 1 Content: Seat Selection (Existing Code) */}
              
              {/* Trip Summary Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Departure</p>
                    <h3 className="text-2xl font-bold text-gray-900">{route.origin}</h3>
                    <p className="text-[#1E88E5] font-bold mt-1">{route.price}</p>
                    <div className="flex items-center justify-center md:justify-start text-gray-500 text-sm mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{route.duration}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center text-[#1E88E5]">
                    <div className="h-[2px] w-24 bg-[#1E88E5]/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Destination</p>
                    <div className="flex items-center justify-center md:justify-end gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{route.destination}</h3>
                      <span className="text-gray-400 text-sm">({route.country})</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-end text-gray-500 text-sm mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Date Selection */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1E88E5]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Travel Date</h4>
                    <p className="text-sm text-gray-500">Select or change your travel date</p>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="px-4 py-2 border-2 border-blue-200 rounded-lg bg-white text-gray-900 font-medium focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Passenger Count Selection */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1E88E5]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Passengers</h4>
                    <p className="text-sm text-gray-500">How many people are travelling?</p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-lg border border-blue-200 p-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPassengers(num)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm transition-all ${
                        passengers === num 
                          ? 'bg-[#1E88E5] text-white shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bus Class Selection */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Select Bus Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Regular Class */}
                  <button
                    onClick={() => setBusClass('regular')}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      busClass === 'regular'
                        ? 'border-[#1E88E5] bg-blue-50 ring-2 ring-[#1E88E5]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {busClass === 'regular' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#1E88E5] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">Regular</h4>
                      <p className="text-xs text-gray-500 mt-1">Seats R20-R42 (23 seats)</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-[#1E88E5]">{getCurrency()} {getBasePrice().toLocaleString()}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Standard seating
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Air conditioning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Safe & comfortable
                      </li>
                    </ul>
                  </button>

                  {/* VIP Class */}
                  <button
                    onClick={() => setBusClass('vip')}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      busClass === 'vip'
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      {busClass === 'vip' ? (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">VIP</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">Executive VIP</h4>
                      <p className="text-xs text-gray-500 mt-1">Seats V1-V19 (19 seats)</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-orange-600">{getCurrency()} {getVIPPrice().toLocaleString()}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        Reclining leather seats
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        Extra legroom
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        WiFi & USB charging
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        Refreshments included
                      </li>
                    </ul>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Section 1: Departure Time */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E88E5] flex items-center justify-center font-bold text-sm">1</div>
                    <h3 className="font-bold text-gray-900">Select Departure Time</h3>
                  </div>

                  {/* Dynamic Departure Times */}
                  {(() => {
                    const schedule = [
                      { time: '06:00 AM', hour: 6, period: 'Morning', icon: Sun, color: 'text-orange-400' },
                      { time: '08:00 AM', hour: 8, period: 'Morning', icon: Sun, color: 'text-orange-400' },
                      { time: '10:00 AM', hour: 10, period: 'Morning', icon: Sun, color: 'text-orange-400' },
                      { time: '12:00 PM', hour: 12, period: 'Afternoon', icon: Sun, color: 'text-yellow-500' },
                      { time: '02:00 PM', hour: 14, period: 'Afternoon', icon: Sun, color: 'text-yellow-500' },
                      { time: '04:00 PM', hour: 16, period: 'Afternoon', icon: Sun, color: 'text-yellow-500' },
                      { time: '08:00 PM', hour: 20, period: 'Evening', icon: Moon, color: 'text-indigo-400' },
                      { time: '10:00 PM', hour: 22, period: 'Evening', icon: Moon, color: 'text-indigo-400' },
                    ];
                    
                    // Show all slots regardless of current time
                    const availableSlots = schedule;
                    
                    const periods = ['Morning', 'Afternoon', 'Evening'];
                    
                    return periods.map(period => {
                      const slots = availableSlots.filter(s => s.period === period);
                      if (slots.length === 0) return null;
                      const PeriodIcon = slots[0].icon;
                      
                      return (
                        <div key={period} className="mb-4">
                          <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm font-medium">
                            <PeriodIcon className={`w-4 h-4 ${slots[0].color}`} />
                            <span>{period}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {slots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                                  selectedTime === slot.time 
                                    ? 'border-[#1E88E5] bg-blue-50 text-[#1E88E5] ring-1 ring-[#1E88E5]' 
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
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
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-sm text-gray-900 mb-3">Seat Legend:</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-orange-100 border-2 border-orange-300"></div>
                        <span>VIP Available (V1-V19)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500"></div>
                        <span>Regular Available (R20-R42)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#1E88E5]"></div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-400"></div>
                        <span>Booked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Seat Selection */}
                <div className="border-l border-gray-100 pl-0 md:pl-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E88E5] flex items-center justify-center font-bold text-sm">2</div>
                    <h3 className="font-bold text-gray-900">Choose Your Seat</h3>
                  </div>

                  {!selectedTime ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">Please select a departure time first to view available seats</p>
                    </div>
                  ) : (
                    <div className="max-w-[400px] mx-auto bg-gray-100 p-6 rounded-xl relative">
                      {/* Driver */}
                      <div className="flex justify-end mb-6">
                         <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                           <svg className="w-7 h-7 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12,6.5A1.5,1.5 0 0,1 13.5,8A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 10.5,8A1.5,1.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,13.5V20H15V13.5L16.5,12.5C17.41,11.87 18,10.81 18,9.63C18,7.57 16.43,6 14.37,6H9.63C7.57,6 6,7.57 6,9.63C6,10.81 6.59,11.87 7.5,12.5L9,13.5Z" />
                           </svg>
                         </div>
                      </div>
                      
                      {/* Door Label */}
                      <div className="absolute left-2 top-20 text-xs text-gray-400 font-bold transform -rotate-90 origin-center">
                        DOOR
                      </div>
                      
                      {/* VIP Section Header */}
                      <div className="mb-3 text-center">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">VIP SECTION</span>
                      </div>
                      
                      {/* VIP Seats: V1-V19 (2-2 layout) */}
                      <div className="space-y-2 mb-6">
                        {Array.from({ length: 5 }, (_, rowIndex) => {
                          const startSeat = rowIndex * 4 + 1;
                          const rowSeats = seats.filter(s => 
                            s.type === 'vip' && 
                            s.number >= startSeat && 
                            s.number < startSeat + 4
                          );
                          
                          if (rowSeats.length === 0) return null;
                          
                          return (
                            <div key={`vip-row-${rowIndex}`} className="grid grid-cols-5 gap-2">
                              {/* Left side - 2 seats */}
                              {rowSeats.slice(0, 2).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-orange-500 text-white shadow-md transform scale-105'
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
                                    aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-orange-500 text-white shadow-md transform scale-105'
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
                      <div className="mb-3 text-center border-t-2 border-dashed border-gray-300 pt-4">
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">REGULAR SECTION</span>
                      </div>
                      
                      {/* Regular Seats: R20-R42 (2-2 layout) */}
                      <div className="space-y-2">
                        {Array.from({ length: 6 }, (_, rowIndex) => {
                          const startSeat = 20 + (rowIndex * 4);
                          const rowSeats = seats.filter(s => 
                            s.type === 'regular' && 
                            s.number >= startSeat && 
                            s.number < startSeat + 4
                          );
                          
                          if (rowSeats.length === 0) return null;
                          
                          return (
                            <div key={`regular-row-${rowIndex}`} className="grid grid-cols-5 gap-2">
                              {/* Left side - 2 seats */}
                              {rowSeats.slice(0, 2).map((seat) => (
                                <button
                                  key={seat.id}
                                  disabled={seat.status === 'booked'}
                                  onClick={() => handleSeatClick(seat.id)}
                                  className={`
                                    aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-[#1E88E5] text-white shadow-md transform scale-105'
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
                                    aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all
                                    ${seat.status === 'booked' 
                                      ? 'bg-red-400 text-white cursor-not-allowed opacity-50' 
                                      : selectedSeats.includes(seat.id)
                                        ? 'bg-[#1E88E5] text-white shadow-md transform scale-105'
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
            <div className="max-w-xl mx-auto space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Route:</span>
                    <span className="font-medium text-gray-900">{route.origin} → {route.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bus Class:</span>
                    <span className="font-medium text-gray-900">
                      {busClass === 'vip' ? (
                        <span className="inline-flex items-center gap-1">
                          Executive VIP
                          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">VIP</span>
                        </span>
                      ) : (
                        'Regular'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date/Time:</span>
                    <span className="font-medium text-gray-900">{new Date(bookingDate).toLocaleDateString()} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Seat:</span>
                    <span className="font-medium text-gray-900">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Passengers:</span>
                    <span className="font-medium text-gray-900">{passengers}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-base font-bold">
                    <span>Total Amount:</span>
                    <span className="text-[#1E88E5]">{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Passenger Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1E88E5] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1E88E5] outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">ID or Passport Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="e.g. 12345678 or AB1234567"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1E88E5] outline-none transition-all"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="border-2 rounded-xl p-4 flex flex-col gap-3 transition-all border-[#25D366] bg-green-50 ring-1 ring-[#25D366]">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[#25D366]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Get Payment Info / WhatsApp</h4>
                      <p className="text-xs text-gray-500 mt-1">Book via WhatsApp. Receive payment details.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  <p className="font-bold text-gray-800 mb-2">Instructions:</p>
                  <p className="text-gray-600 mb-2">1. Click "Confirm Booking" to open WhatsApp.</p>
                  <p className="text-gray-600">2. Send the pre-filled message to our agent.</p>
                  <p className="text-gray-600">3. Wait for confirmation and payment details.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              {step === 1 ? (
                <>
                  Selected: <span className="font-bold text-gray-900">{selectedTime || 'No time selected'}</span> | 
                  Seat: <span className="font-bold text-gray-900">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
                </>
              ) : (
                <button onClick={() => setStep(1)} className="text-[#1E88E5] hover:underline font-medium">
                  ← Back to Seat Selection
                </button>
              )}
            </div>
            
            {step === 1 ? (
              <button 
                onClick={handleProceed}
                disabled={!selectedTime || selectedSeats.length !== passengers}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all
                  ${selectedTime && selectedSeats.length === passengers 
                    ? 'bg-[#1E88E5] hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleWhatsAppBooking}
                disabled={!phoneNumber}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all
                  ${!phoneNumber
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#25D366] hover:bg-[#20bd5a] shadow-lg'
                  }
                `}
              >
                <CheckCircle className="w-5 h-5" />
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

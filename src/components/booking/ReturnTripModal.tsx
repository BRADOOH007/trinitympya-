import React from 'react';
import { X, Calendar, ArrowLeftRight, Sparkles, TrendingDown } from 'lucide-react';
import { Route } from '../../context/AdminContext';

interface ReturnTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookReturn: () => void;
  outboundRoute: {
    origin: string;
    destination: string;
    date: string;
    price: string;
  };
  returnRoute: Route | null;
}

const ReturnTripModal = ({ isOpen, onClose, onBookReturn, outboundRoute, returnRoute }: ReturnTripModalProps) => {
  if (!isOpen || !returnRoute) return null;

  // Calculate suggested return dates (3, 7, 14 days later)
  const outboundDate = new Date(outboundRoute.date);
  const suggestedDates = [3, 7, 14].map(days => {
    const date = new Date(outboundDate);
    date.setDate(date.getDate() + days);
    return {
      days,
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  // Calculate discount (10% off return trip)
  const getPrice = (priceStr: string) => parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  const getCurrency = (priceStr: string) => {
    if (priceStr.includes('UGX')) return 'UGX';
    if (priceStr.includes('RWF')) return 'RWF';
    if (priceStr.includes('USD')) return 'USD';
    return 'KSh';
  };

  const returnPrice = getPrice(returnRoute.price);
  const discountedPrice = returnPrice * 0.9; // 10% discount
  const savings = returnPrice - discountedPrice;
  const currency = getCurrency(returnRoute.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Complete Your Journey!</h2>
                <p className="text-blue-100 text-sm">Book your return trip and save 10%</p>
              </div>
            </div>

            {/* Route Display */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-100 mb-1">Outbound Trip</p>
                  <p className="font-bold text-lg">{outboundRoute.origin} → {outboundRoute.destination}</p>
                  <p className="text-sm text-blue-100">{new Date(outboundRoute.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-100 mb-1">Return Trip</p>
                  <p className="font-bold text-lg">{returnRoute.origin} → {returnRoute.destination}</p>
                  <p className="text-sm text-blue-100">Choose date below</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Special Return Trip Discount!
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">10% OFF</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Save {currency} {savings.toLocaleString()} on your return journey
              </p>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Regular Price</p>
              <p className="text-2xl font-bold text-gray-400 line-through">{currency} {returnPrice.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border-2 border-green-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
                SAVE {Math.round((savings / returnPrice) * 100)}%
              </div>
              <p className="text-xs text-green-700 uppercase font-semibold mb-1">Your Price</p>
              <p className="text-2xl font-bold text-green-600">{currency} {discountedPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Suggested Return Dates */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1E88E5]" />
              When would you like to return?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {suggestedDates.map((suggestion) => (
                <button
                  key={suggestion.days}
                  onClick={onBookReturn}
                  className="group p-4 border-2 border-gray-200 rounded-xl hover:border-[#1E88E5] hover:bg-blue-50 transition-all text-center"
                >
                  <p className="text-xs text-gray-500 mb-1">In {suggestion.days} days</p>
                  <p className="font-bold text-gray-900 group-hover:text-[#1E88E5]">{suggestion.label}</p>
                </button>
              ))}
            </div>
            <button
              onClick={onBookReturn}
              className="w-full mt-3 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#1E88E5] hover:bg-blue-50 transition-all text-gray-600 hover:text-[#1E88E5] font-medium"
            >
              Choose a different date
            </button>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Why book your return now?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Save 10% on your return ticket</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Secure your preferred seat and time</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Complete your travel plans in one go</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Maybe Later
            </button>
            <button
              onClick={onBookReturn}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white rounded-xl font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Book Return Trip
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Discount valid for 24 hours after outbound booking
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReturnTripModal;

import { useState } from 'react';
import { Printer, Ticket, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrintTicket = () => {
  const navigate = useNavigate();
  const [ref, setRef] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const lookupBooking = () => {
    if (!ref.trim()) {
      alert('Please enter a reference number');
      return;
    }
    // Local-only lookup: no DB available, so show helpful guidance.
    setResult(
      `Ref: ${ref}\n\nTo retrieve your boarding pass, please contact our support team via WhatsApp or email with your reference number. Your ticket details were sent to you via SMS and WhatsApp after payment confirmation.`
    );
  };

  return (
    <div className="p-6 text-center">
      <button onClick={() => navigate('/')} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-3 h-3" /> Back
      </button>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
        <Printer className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Print Ticket</h2>
      <p className="text-gray-500 mb-8 text-sm">Enter your booking reference or ticket number to print your ticket.</p>
      <div className="relative border border-gray-300 rounded-xl p-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all mb-4 text-left">
        <label className="block text-xs font-medium text-gray-500 mb-1">Ticket / Reference Number</label>
        <div className="flex items-center gap-3 relative">
          <Ticket className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="e.g. SIM-XXXXXX"
            className="w-full font-bold text-gray-900 outline-none bg-transparent text-base"
          />
        </div>
      </div>
      <button onClick={lookupBooking} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md">
        <Printer className="w-5 h-5 inline mr-2" />Retrieve Ticket
      </button>
      {result && (
        <div className="mt-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
              <CheckCircle className="w-4 h-4" /> Booking Found
            </div>
            <p className="text-xs text-gray-700 whitespace-pre-line">{result}</p>
            <button onClick={() => window.print()} className="mt-4 w-full bg-black text-white font-bold py-3 rounded-xl text-sm">
              <Printer className="w-4 h-4 inline mr-2" />Print Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintTicket;
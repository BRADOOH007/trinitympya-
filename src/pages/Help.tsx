import { useState } from 'react';
import { ChevronDown, LifeBuoy, Phone, Mail, MessageCircle } from 'lucide-react';
import Seo from '../components/seo/Seo';

const faqs = [
  {
    q: 'How do I book a ticket?',
    a: 'Open the app, search your route, choose a departure time and seat, fill in your name and phone number, then confirm. You will be redirected to WhatsApp to complete M-Pesa payment.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept M-Pesa and bank transfers. After booking, you will receive a payment link on WhatsApp. Once payment is confirmed, your ticket is sent instantly via SMS and WhatsApp.',
  },
  {
    q: 'Where do I board?',
    a: 'Your boarding point is shown on your ticket. Please arrive at least 30 minutes before departure with your ticket (digital or printed) and a valid ID.',
  },
  {
    q: 'Can I change my travel date?',
    a: 'Yes. Contact our support team at least 24 hours before departure to reschedule your trip. Changes are subject to availability.',
  },
  {
    q: 'What is the luggage allowance?',
    a: 'Each passenger is allowed one bag up to 20kg and one small hand bag. Extra luggage can be arranged at the terminal for a small fee.',
  },
  {
    q: 'How do I get a refund?',
    a: 'Refunds are processed when a trip is cancelled. Contact support with your reference number and we will assist. Refund timelines are usually 3 to 7 working days.',
  },
];

const Help = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="p-6">
      <Seo
        title="SimbaCoach Help Center - Bus Booking FAQ & Support"
        description="Get help with SimbaCoach bus bookings: how to book, payment via M-Pesa, boarding points, rescheduling, luggage limits and refunds. 24/7 customer support by phone, email and WhatsApp."
        path="/help"
        keywords="SimbaCoach help, bus booking help, SimbaCoach FAQ, how to book bus ticket, M-Pesa bus payment, SimbaCoach refund"
        jsonLd={[{
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        }]}
      />
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
          <LifeBuoy className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Help Center</h2>
          <p className="text-gray-500 text-sm">We are here to help you around the clock.</p>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 mt-2 mb-3">Frequently Asked Questions</h3>
      <div className="grid gap-2">
        {faqs.map((f, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors`}
            >
              {f.q}
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="px-4 pb-4 text-sm text-gray-600">{f.a}</p>}
          </div>
        ))}
      </div>

      <h3 className="font-bold text-gray-900 mt-8 mb-3">Still need help?</h3>
      <div className="grid gap-3">
        <a href="tel:+254781346337" className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 hover:bg-gray-50 transition-colors">
          <Phone className="w-5 h-5 text-black" />
          <div className="text-sm">
            <div className="font-bold text-gray-900">Call Us</div>
            <div className="text-gray-500">+254 781 346 337</div>
          </div>
        </a>
        <a href="mailto:info@simbacoach.com" className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 hover:bg-gray-50 transition-colors">
          <Mail className="w-5 h-5 text-black" />
          <div className="text-sm">
            <div className="font-bold text-gray-900">Email Us</div>
            <div className="text-gray-500">info@simbacoach.com</div>
          </div>
        </a>
        <a href="https://wa.me/254735893829" target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3.5 hover:bg-green-100 transition-colors">
          <MessageCircle className="w-5 h-5 text-[#00a859]" />
          <div className="text-sm">
            <div className="font-bold text-gray-900">WhatsApp Us</div>
            <div className="text-gray-500">+254 735 893 829</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Help;
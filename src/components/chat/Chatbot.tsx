import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const faqTopics = [
  { id: 'routes', question: 'What routes do you operate?' },
  { id: 'fares', question: 'What are the ticket fares and classes?' },
  { id: 'book', question: 'How do I book a ticket online?' },
  { id: 'print', question: 'How do I print or track my ticket?' },
  { id: 'schedule', question: 'What are the departure times?' },
  { id: 'payment', question: 'What payment methods are accepted?' },
  { id: 'baggage', question: 'Baggage limits and cargo shipping' },
  { id: 'refunds', question: 'Cancellations, refunds and rescheduling' },
  { id: 'care', question: 'Connect with Live Customer Support' },
];

const topicAnswers: Record<string, string> = {
  routes:
    'We operate daily express routes across East Africa including Nairobi to Kampala, Kigali, Goma, Juba, Bujumbura, Mbarara and dozens of Kenya domestic routes (Kisumu, Eldoret, Nakuru, Mombasa and more).',
  fares:
    'Fares vary by destination and seat class. VIP seats are premium reclining seats with extra legroom. Normal seats are standard express coach seating with onboard WiFi and power outlets. Prices are shown in KSh on each route page.',
  book:
    'Booking is simple:\n\n1. Select your From, To, and travel date on the booking widget.\n2. Click "Search Bus" to see departures and seat layouts. Choose your seats.\n3. Enter your name and phone, then tap "Pay on WhatsApp" to complete payment via M-Pesa or bank transfer.\n\nYou\'ll receive instant confirmation via SMS and WhatsApp!',
  print:
    'To print or track your ticket:\n\n1. Tap "Print" in the bottom navigation bar.\n2. Enter your Reference Number (received after booking).\n3. Tap "Retrieve Ticket" to preview your boarding pass.\n\nLost your reference? We can resend it — just tap Chat Now below!',
  schedule:
    'We offer multiple daily departures on every route. Departure times are shown per route. IMPORTANT: Buses that have already departed will not be shown. If all today\'s buses have left, select tomorrow\'s date.',
  payment:
    'We accept M-Pesa, Airtel Money, debit/credit cards, and bank transfers. After booking online, tap "Pay on WhatsApp" and our agent will guide you through payment. Your ticket is sent instantly via SMS and WhatsApp after payment confirmation.',
  baggage:
    'Each passenger is entitled to 1 piece of free hand luggage up to 15kg. Extra weight or large items are transported at affordable rates in our undercarriage hold. Parcel delivery and cargo shipping services are also available.',
  refunds:
    'Cancellations made 24+ hours before departure are eligible for a partial refund OR free reschedule. Same-day rescheduling has a 10% re-booking fee. No-shows are non-refundable.',
  care:
    'Our 24/7 customer support team is always ready to help. Call or WhatsApp us, or email info@simbacoach.com. We assist with bookings, seat changes, delays, lost items, cargo, and any travel questions.',
};

interface ChatMsg {
  from: 'bot' | 'user';
  text: string;
}

const Chatbot = () => {
  const { contactInfo } = useAdmin();
  const whatsapp = contactInfo?.whatsapp?.replace(/[^0-9]/g, '') || '254735893829';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [showTopics, setShowTopics] = useState(true);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            from: 'bot',
            text: 'Hello! Welcome to SimbaCoach support. I am your virtual assistant.\nHow can I help you today? Select one of our common questions below, or type your query.',
          },
        ]);
        setShowTopics(true);
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, showTopics, open]);

  const timeNow = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleTopic = (id: string) => {
    const topic = faqTopics.find((t) => t.id === id);
    if (!topic) return;
    setMessages((prev) => [...prev, { from: 'user', text: topic.question }]);
    setShowTopics(false);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: topicAnswers[id] }]);
      setShowTopics(true);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    setShowTopics(false);
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const lower = text.toLowerCase();
      let reply = '';
      if (/route|where|go to|destination/.test(lower))
        reply = topicAnswers.routes;
      else if (/fare|price|cost|how much|vip/.test(lower))
        reply = topicAnswers.fares;
      else if (/book|booking|reserve|buy/.test(lower))
        reply = topicAnswers.book;
      else if (/print|track|reference|boarding/.test(lower))
        reply = topicAnswers.print;
      else if (/schedule|time|departure|when/.test(lower))
        reply = topicAnswers.schedule;
      else if (/pay|mpesa|airtel|card|bank|money/.test(lower))
        reply = topicAnswers.payment;
      else if (/bag|luggage|cargo|parcel|shipping/.test(lower))
        reply = topicAnswers.baggage;
      else if (/cancel|refund|reschedule/.test(lower))
        reply = topicAnswers.refunds;
      else if (/support|help|agent|phone|email/.test(lower))
        reply = topicAnswers.care;
      else if (/hello|hi|hey/.test(lower))
        reply = 'Hello! Welcome to SimbaCoach. I can help you with routes, fares, booking, schedules, baggage, cancellations, payment, and onboard amenities. What would you like to know?';
      else if (/thank|thanks/.test(lower))
        reply = 'You\'re welcome! Is there anything else I can help you with? You can also reach our live support team on WhatsApp anytime.';
      else
        reply = 'I\'m not sure I fully understand your query, but I\'ve logged it for our support team. You can also try asking about: routes, fares, booking, schedules, baggage, cancellations, payment, or amenities.';
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
      setShowTopics(true);
    }, 1400);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-16 right-5 bg-[#151515] hover:bg-neutral-900 text-white p-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-[60] transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white/85 group"
        aria-label="Chat with us"
      >
        <div className="relative">
          {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#151515]" />}
        </div>
      </button>

      {/* Chatbot Panel */}
      <div
        className={`fixed top-16 bottom-28 right-4 left-4 sm:left-auto sm:w-96 max-w-sm bg-white rounded-2xl border border-slate-100 shadow-[0_16px_48px_rgba(15,23,42,0.15)] z-50 overflow-hidden flex flex-col transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-[#151515] text-white px-4 py-3.5 flex items-center justify-between border-b border-neutral-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-red-600 border border-white/20 flex items-center justify-center text-white font-black text-xs shadow-inner">S</div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#151515]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs tracking-tight uppercase text-white">SimbaCoach Virtual Agent</h4>
              <p className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">Online • 24/7 Dispatch</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
          {messages.map((msg, i) => {
            const isBot = msg.from === 'bot';
            return (
              <div key={i} className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2`}>
                {isBot && (
                  <div className="w-7 h-7 rounded-full bg-[#36498c]/10 text-[#36498c] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 border border-[#36498c]/5">
                    S
                  </div>
                )}
                <div className="max-w-[85%] space-y-1">
                  <div
                    className={`p-3 text-xs leading-relaxed shadow-xs border ${
                      isBot
                        ? 'bg-white text-slate-800 border-slate-100 rounded-2xl rounded-tl-sm'
                        : 'bg-[#36498c] text-white border-transparent rounded-2xl rounded-tr-sm font-semibold'
                    }`}
                  >
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                    {isBot && (
                      <a
                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello SimbaCoach! I need assistance with a bus booking.')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-center gap-1.5 bg-[#00a859] hover:bg-[#00904b] text-white font-extrabold text-[11px] rounded-xl py-2 px-3 transition-all shadow-sm active:scale-95"
                      >
                        <MessageCircle className="w-3 h-3" /> Chat Now
                      </a>
                    )}
                  </div>
                  <span className="block text-[9px] text-gray-400 px-1 text-right">{timeNow()}</span>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className="flex justify-start items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#36498c]/10 text-[#36498c] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">S</div>
              <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-sm shadow-xs flex items-center justify-center">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full pulse-dot" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full pulse-dot" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full pulse-dot" />
                </div>
              </div>
            </div>
          )}
          {showTopics && messages.length > 0 && !typing && (
            <div className="pt-3">
              <span className="block text-[10px] text-gray-400 font-extrabold tracking-widest uppercase mb-3 px-1">Select a Topic</span>
              <div className="flex flex-col gap-2.5">
                {faqTopics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTopic(t.id)}
                    className="w-full text-left bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-[#36498c] border border-slate-200/60 p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group active:scale-[0.98]"
                  >
                    <span className="truncate pr-3 font-bold">{t.question}</span>
                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#36498c] transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SimbaCoach anything..."
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c] outline-none text-xs rounded-xl py-2.5 px-3.5 font-semibold placeholder-gray-400 text-slate-800 transition-colors"
          />
          <button type="submit" className="p-2.5 rounded-xl bg-[#36498c] text-white hover:bg-black transition-all shadow-sm">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Wifi, Plug, Armchair, Crown, Tags, Network, Coins, Star, Ticket, Phone, MessageCircle, Bus } from 'lucide-react';
import HomeBookingWidget from '../components/home/HomeBookingWidget';
import Seo from '../components/seo/Seo';
import { popularRoutes, findRoute, ParsedRoute, formatPrice, cityOptions } from '../data/routeUtils';
import { Route } from '../context/AdminContext';
import BookingModal from '../components/booking/BookingModal';

/* ---------- Amenities ---------- */
const amenities = [
  { icon: Wifi, label: 'Free Wi-Fi', cls: 'bg-[#36498c]/10 text-[#36498c]' },
  { icon: Plug, label: 'Power Outlets', cls: 'bg-emerald-500/10 text-emerald-600' },
  { icon: Armchair, label: 'Extra Legroom', cls: 'bg-amber-500/10 text-amber-600' },
  { icon: Crown, label: 'VIP Seating', cls: 'bg-red-500/10 text-red-500' },
];

/* ---------- Why Choose ---------- */
const whyChoose = [
  { icon: Tags, cls: 'bg-emerald-500/10 text-emerald-600', title: 'Massive Promo Savings', desc: 'Pay less when booking directly. Save up to 25% instantly on select morning and evening coach schedules.' },
  { icon: Network, cls: 'bg-[#36498c]/10 text-[#36498c]', title: 'Widest Network Connectivity', desc: 'We offer extensive daily scheduled departures linking major cities across Kenya and East Africa.' },
  { icon: Coins, cls: 'bg-amber-600/15 text-amber-700', title: 'Loyalty Credit Rewards', desc: 'Earn credit points on every trip. Redeem accumulated travel credits to book free future tickets.' },
  { icon: Star, cls: 'bg-red-500/10 text-red-600', title: 'First-Class Comfort Cabin', desc: 'All VIP and regular express buses include high-speed Wi-Fi, individual power ports, and deep-reclining seats.' },
];

/* ---------- Promo Carousel ---------- */
const promoSlides = [
  { img: '/assets/simba-bus-1.webp', label: 'TRAVEL TO KAMPALA', tint: 'bg-[#e8b917]', text: 'Buy your travel tickets hassle free' },
  { img: '/assets/simba-hero.webp', label: 'TRAVEL TO KISUMU', tint: 'bg-[#4da934]', text: 'Buy your travel tickets hassle free' },
  { img: '/assets/simba-bus-2.webp', label: 'TRAVEL TO NAIROBI', tint: 'bg-[#2563eb]', text: 'Buy your travel tickets hassle free' },
];

const PromoCarousel = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % promoSlides.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="px-1.5 py-4">
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-56">
        {promoSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${i === slide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="bg-black/60 backdrop-blur-sm absolute top-0 left-0 right-0 py-2 px-4 flex justify-between items-center z-20">
              <span className="text-white text-xs font-bold">{s.text}</span>
            </div>
            <div className="relative flex-1">
              <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${s.tint}`} />
              <img src={s.img} alt={s.label} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent z-20 flex justify-between items-end pb-8">
              <h3 className="text-white font-black text-2xl w-[60%] leading-tight uppercase drop-shadow-lg">{s.label}</h3>
              <a
                href="https://wa.me/254735893829"
                target="_blank"
                rel="noreferrer"
                className="bg-[#e62933] hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-full whitespace-nowrap shadow-lg transition-transform active:scale-95"
              >
                BOOK YOUR TICKET
              </a>
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
          {promoSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Route Cards ---------- */
interface RouteCardsProps {
  onBook: (r: ParsedRoute) => void;
}

const RouteCards = ({ onBook }: RouteCardsProps) => {
  const routes = popularRoutes(121);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="px-1.5 py-4">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-[#36498c]/10 text-[#36498c] px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <Bus className="w-3.5 h-3.5" /> Routes & Fares
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">Top SimbaCoach Routes & Fares</h2>
        <p className="text-xs text-[#757575]">Popular routes with affordable fares</p>
      </div>
      <div className="space-y-3">
        {routes.map((r, idx) => (
          <div key={`${r.origin}→${r.destination}`} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div
              className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-gray-50/50 transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <div className="w-11 h-11 rounded-xl bg-[#36498c]/10 flex items-center justify-center shrink-0">
                <Bus className="w-4 h-4 text-[#36498c]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-gray-900 text-sm">{r.origin} ➔ {r.destination}</span>
                  <span className="text-[#cc0000] font-black text-sm">{formatPrice(r.currency, r.price)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{r.duration} Trip • Express Coach</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            {openIdx === idx && (
              <div className="border-t border-gray-100 px-4 py-3 space-y-3 bg-gray-50/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">ESTIMATED TIME</span>
                  <span className="font-bold text-gray-800">{r.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">TICKET FARES</span>
                  <span className="font-bold text-gray-800">Std {formatPrice(r.currency, r.price)} • Exec {formatPrice(r.currency, r.executivePrice)} • VIP {formatPrice(r.currency, r.vipPrice)}</span>
                </div>
                <button
                  onClick={() => onBook(r)}
                  className="w-full bg-[#36498c] hover:bg-black text-white font-bold py-2.5 rounded-xl transition-all text-sm"
                >
                  <Ticket className="w-3.5 h-3.5 inline mr-2" />Book Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Route Explorer (Live SVG Map) ---------- */
const CITY_COORDS: Record<string, { x: number; y: number }> = {
  Nairobi: { x: 190, y: 180 },
  Mombasa: { x: 305, y: 235 },
  Ukunda: { x: 314, y: 252 },
  Diani: { x: 306, y: 258 },
  Malindi: { x: 292, y: 210 },
  Kilifi: { x: 300, y: 222 },
  Watamu: { x: 295, y: 214 },
  Mpeketoni: { x: 288, y: 200 },
  Lamu: { x: 282, y: 190 },
  Voi: { x: 262, y: 232 },
  Taveta: { x: 250, y: 250 },
  Naivasha: { x: 168, y: 176 },
  Nakuru: { x: 150, y: 164 },
  Narok: { x: 158, y: 208 },
  Kericho: { x: 125, y: 168 },
  Bomet: { x: 118, y: 186 },
  Kisumu: { x: 96, y: 150 },
  Kisii: { x: 102, y: 184 },
  Migori: { x: 92, y: 206 },
  'Homa Bay': { x: 90, y: 170 },
  Siaya: { x: 84, y: 144 },
  Kakamega: { x: 104, y: 130 },
  Mumias: { x: 88, y: 128 },
  Webuye: { x: 112, y: 120 },
  Bungoma: { x: 96, y: 108 },
  Busia: { x: 78, y: 116 },
  Malaba: { x: 64, y: 104 },
  Eldoret: { x: 132, y: 124 },
  'Nandi Hills': { x: 140, y: 140 },
  Kitale: { x: 118, y: 92 },
  Kapenguria: { x: 134, y: 82 },
  Lodwar: { x: 150, y: 52 },
  Marsabit: { x: 190, y: 52 },
  Moyale: { x: 208, y: 28 },
  Isiolo: { x: 208, y: 122 },
  Meru: { x: 220, y: 132 },
  Nanyuki: { x: 208, y: 140 },
  Embu: { x: 230, y: 152 },
  Nyeri: { x: 218, y: 148 },
  Thika: { x: 212, y: 172 },
  Machakos: { x: 214, y: 192 },
  Garissa: { x: 246, y: 178 },
  Kampala: { x: 38, y: 100 },
  Kigali: { x: 18, y: 170 },
  Bujumbura: { x: 15, y: 208 },
  Juba: { x: 108, y: 22 },
  Arusha: { x: 228, y: 260 },
  'Dar es Salaam': { x: 288, y: 288 },
};

const RouteExplorer = ({ onBook }: RouteCardsProps) => {
  const cities = cityOptions();
  const [origin, setOrigin] = useState('Nairobi');
  const [destination, setDestination] = useState('Mombasa');
  const exchange = (o: string, d: string) => {
    setOrigin(d);
    setDestination(o);
  };
  const live = findRoute(origin, destination);
  const oPt = CITY_COORDS[origin];
  const dPt = CITY_COORDS[destination];
  return (
    <div className="px-1.5 py-4">
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Bus className="w-8 h-8 text-gray-300" />
          <div>
            <h3 className="font-extrabold text-xs text-gray-900 tracking-tight">SimbaCoach Live Route Explorer</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">East Africa Map & Transit Grid</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 items-center bg-slate-50/50 p-2.5 rounded-2xl border border-gray-100/60 mb-4">
          <div className="col-span-3">
            <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-0.5">Origin</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-white border border-gray-100 text-[11px] font-extrabold text-gray-800 rounded-xl px-2.5 py-2 appearance-none cursor-pointer outline-none"
            >
              {cities.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 flex justify-center pt-3">
            <button
              onClick={() => exchange(origin, destination)}
              className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 border border-gray-100 text-gray-500 shadow-sm flex items-center justify-center active:scale-90 transition-all cursor-pointer"
              title="Swap Origin and Destination"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </button>
          </div>
          <div className="col-span-3">
            <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-0.5">Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white border border-gray-100 text-[11px] font-extrabold text-gray-800 rounded-xl px-2.5 py-2 appearance-none cursor-pointer outline-none"
            >
              {cities.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden aspect-[380/300] shadow-inner select-none">
          <svg viewBox="0 0 380 300" className="w-full h-full">
            <defs>
              <linearGradient id="oceanGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="lakeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.6">
              {[50, 100, 150, 200, 250, 300, 350].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="300" strokeDasharray="3 3" />
              ))}
              {[50, 100, 150, 200, 250].map((y) => (
                <line key={y} x1="0" y1={y} x2="380" y2={y} strokeDasharray="3 3" />
              ))}
            </g>
            <g transform="translate(330, 50)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="-22" x2="0" y2="22" stroke="#94a3b8" strokeWidth="0.5" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#94a3b8" strokeWidth="0.5" />
              <text x="0" y="-26" fontSize="6" fontWeight="bold" fill="#64748b" textAnchor="middle">N</text>
            </g>
            <path d="M 335,180 L 320,210 L 305,230 L 290,250 L 270,270 L 255,290 L 245,320 L 380,320 L 380,180 Z" fill="url(#oceanGrad2)" />
            <text x="340" y="295" fontSize="7" fontWeight="bold" fill="#0284c7" opacity="0.4" letterSpacing="1" transform="rotate(-15 340 295)">INDIAN OCEAN</text>
            <path d="M 30,125 C 25,145 45,175 75,170 C 85,155 75,130 65,120 Z" fill="url(#lakeGrad2)" stroke="#93c5fd" strokeWidth="0.5" />
            <text x="48" y="148" fontSize="6" fontWeight="bold" fill="#2563eb" opacity="0.4">LAKE VICTORIA</text>
            <g transform="translate(205, 120)">
              <polygon points="0,-6 -7,6 7,6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
              <polygon points="0,-6 -3,6 0,6" fill="#e2e8f0" />
              <text x="0" y="11" fontSize="5" fontWeight="bold" fill="#94a3b8" textAnchor="middle">MT. KENYA</text>
            </g>

            {/* Live route line between selected origin and destination */}
            {oPt && dPt && origin !== destination && (
              <g>
                <line x1={oPt.x} y1={oPt.y} x2={dPt.x} y2={dPt.y} stroke="#36498c" strokeWidth="6" strokeLinecap="round" opacity="0.15" />
                <line x1={oPt.x} y1={oPt.y} x2={dPt.x} y2={dPt.y} stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" className="animate-route-flow" />
              </g>
            )}

            {/* All city markers */}
            {cities.map((c) => {
              const pt = CITY_COORDS[c.name];
              if (!pt) return null;
              const isOrigin = c.name === origin;
              const isDest = c.name === destination;
              return (
                <g key={c.name}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isOrigin || isDest ? 5 : 2.5}
                    fill={isOrigin ? '#10b981' : isDest ? '#ef4444' : '#475569'}
                    stroke="white"
                    strokeWidth={isOrigin || isDest ? 1.2 : 0.5}
                  />
                  {isOrigin && <circle cx={pt.x} cy={pt.y} r="9" fill="#10b981" opacity="0.3" className="map-ripple" />}
                  <text
                    x={pt.x}
                    y={pt.y}
                    dy={isOrigin || isDest ? -10 : -8}
                    textAnchor="middle"
                    fontSize={isOrigin || isDest ? 7 : 5}
                    fontWeight={isOrigin || isDest ? 'bold' : 600}
                    fill={isOrigin ? '#059669' : isDest ? '#dc2626' : '#64748b'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-3 mb-4 flex items-center justify-between bg-[#36498c]/5 border border-[#36498c]/15 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
            <span className="font-extrabold text-xs text-gray-800 truncate">{origin} ➔ {destination}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {live ? (
              <>
                <span className="text-xs text-gray-500 font-semibold hidden sm:inline">{live.duration} Trip</span>
                <span className="text-[#cc0000] font-black text-sm">{formatPrice(live.currency, live.price)}</span>
              </>
            ) : (
              <span className="text-[10px] text-gray-500 font-semibold text-right">Route available on request</span>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            const exact = findRoute(origin, destination);
            if (exact) {
              onBook(exact);
              return;
            }
            onBook({
              origin,
              destination,
              price: 3000,
              executivePrice: 4000,
              vipPrice: 4500,
              currency: 'KES',
              duration: 'Express Coach',
              departures: ['06:00 AM', '10:00 AM', '02:00 PM', '08:00 PM'],
            });
          }}
          className="block w-full text-center bg-[#36498c] hover:bg-black text-white font-bold py-3 rounded-2xl transition-all shadow-md text-sm mt-4 cursor-pointer"
        >
          <Ticket className="w-4 h-4 inline mr-2" />BOOK THIS ROUTE
        </button>
      </div>
    </div>
  );
};

/* ---------- Fleet Carousel ---------- */
const fleetSlides = [
  { img: '/assets/simba-bus-1.webp', title: 'VIP Express Cabin', desc: 'Experience ultimate luxury on our primary routes with spacious reclining seats, personal entertainment screens, and complimentary refreshments.' },
  { img: '/assets/simba-bus-2.webp', title: 'First-Class Night Cruiser', desc: 'Unwind at night under calming ambient lighting with lie-flat seats, temperature-controlled cabin, and dedicated attendant service.' },
  { img: '/assets/simba-bus-3.webp', title: 'Executive Express Coach', desc: 'Our standard premium service featuring high-speed Wi-Fi, onboard entertainment, power outlets, and ergonomic seats with ample legroom.' },
];

const FleetCarousel = () => {
  const [slide, setSlide] = useState(0);
  return (
    <div className="px-1.5 py-4">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-green-600/10 text-green-700 px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <Bus className="w-3.5 h-3.5" /> Our Fleet
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">Our Elite Bus Fleet & Cabin</h2>
        <p className="text-xs text-[#757575]">Experience luxury and comfort on every journey</p>
      </div>
      <div className="relative rounded-3xl overflow-hidden shadow-lg h-60">
        {fleetSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'z-10' : 'opacity-0 z-0'}`}>
            <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-black text-xl leading-tight mb-1">{s.title}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
          {fleetSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- FAQ ---------- */
const faqs = [
  { q: 'How do I perform an online booking?', a: 'Select your route and travel date on our booking widget, choose your boarding and dropping points, then press "Search Bus". Follow the prompts to choose your seat and complete payment via M-Pesa or card for instant confirmation.' },
  { q: 'What are the booking prices to different destinations?', a: 'Fares are shown in KSh on each route and depend on your origin and destination. VIP class is available on all routes. Prices may vary based on season and availability.' },
  { q: 'What payment methods are accepted?', a: 'We accept M-Pesa, Airtel Money, debit/credit cards, and bank transfers. Your ticket is sent immediately via SMS and WhatsApp after payment confirmation.' },
  { q: 'Can I cancel or reschedule my booking?', a: 'Yes, cancellations made at least 24 hours before departure are eligible for a partial refund or free rescheduling. Same-day rescheduling is subject to a 10% re-booking fee.' },
  { q: 'Do you have direct bus routes to Kampala, Kigali, and Goma?', a: 'We operate both Kenya domestic routes and cross-border East Africa routes depending on the origin. Cross-border travel includes stops at designated border points for customs clearance.' },
  { q: 'What are the benefits of booking online?', a: 'Booking online gives you instant seat selection, mobile ticketing, M-Pesa payment integration, and 24/7 customer support. You also earn loyalty points on every booking.' },
];

const FAQ = () => {
  return (
    <div className="px-1.5 py-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#36498c]/10 text-[#36498c] px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <Phone className="w-3.5 h-3.5" /> FAQ
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">SimbaCoach Booking FAQ</h2>
        <p className="text-xs text-[#757575] max-w-xs mx-auto">Frequently asked questions and their answers</p>
      </div>
      <div className="space-y-2">
        {faqs.map((f) => (
          <details key={f.q} className="group bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <summary className="font-bold text-gray-900 flex justify-between items-center text-sm">
              {f.q}
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-open:rotate-180 transition-transform text-xs font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="pt-3 mt-3 border-t border-gray-100">
              <p className="text-gray-600 text-xs leading-relaxed">{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

/* ---------- Home Page ---------- */
const Home = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const state = (location.state as { origin?: string; destination?: string } | null) || {};

  const handleBook = (r: ParsedRoute) => {
    setSelectedRoute({
      id: 0,
      origin: r.origin,
      destination: r.destination,
      price: formatPrice(r.currency, r.price),
      executive_price: formatPrice(r.currency, r.executivePrice),
      vip_price: formatPrice(r.currency, r.vipPrice),
      duration: r.duration,
      departures: r.departures,
    } as Route);
    setIsModalOpen(true);
  };

  return (
    <div id="page-home" className="w-full">
      <Seo
        title="SimbaCoach | Book Bus Tickets Online - Kenya & East Africa"
        description="Book SimbaCoach bus tickets online for Kenya & East Africa. VIP, Executive & Standard fares across 150+ routes. Pay via M-Pesa with instant confirmation."
        path="/"
        keywords="bus tickets Kenya, book bus online, SimbaCoach, Nairobi to Kampala bus, East Africa bus tickets, bus booking online M-Pesa, VIP bus Kenya"
        jsonLd={[{
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        }]}
      />
      <HomeBookingWidget
        defaultOrigin={state.origin}
        defaultDestination={state.destination}
      />

      {/* Onboard Amenities */}
      <div className="px-2 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1 px-1.5 tracking-tight">Onboard Amenities</h2>
        <p className="text-gray-500 text-xs mb-4 px-1.5 font-medium">Travel in high comfort with our top-tier cabin facilities</p>
        <div className="grid grid-cols-2 gap-3 px-0.5">
          {amenities.map((a) => (
            <div key={a.label} className="bg-white/50 border border-white/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:scale-[1.02] transition-transform">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${a.cls}`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-gray-800 text-xs uppercase tracking-wider">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose */}
      <div className="px-2 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1 px-1.5 tracking-tight">Why Choose SimbaCoach</h2>
        <p className="text-gray-500 text-xs mb-4 px-1.5 font-medium">Experience first-class road travel with East Africa's premium express operator</p>
        <div className="flex flex-col gap-3 px-0.5">
          {whyChoose.map((w) => (
            <div key={w.title} className="flex items-center gap-4 p-4 rounded-2xl border border-white/80 bg-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.015)] hover:scale-[1.01] transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${w.cls}`}>
                <w.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-gray-900 text-sm tracking-tight mb-0.5">{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PromoCarousel />
      <RouteCards onBook={handleBook} />
      <RouteExplorer onBook={handleBook} />
      <FleetCarousel />

      {/* Looking for Online Booking CTA */}
      <div className="px-1.5 py-4">
        <div className="bg-gradient-to-br from-[#36498c] to-[#1a2a5e] rounded-3xl p-6 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white text-xl font-black mb-2">Looking for Online Booking?</h3>
          <p className="text-white/70 text-xs mb-5 max-w-xs mx-auto">Book directly from our website and enjoy up to 25% discount on select routes. Instant confirmation via WhatsApp and SMS.</p>
          <a
            href="https://wa.me/254735893829"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#ffb000] hover:bg-amber-500 text-[#1A1A1A] font-extrabold py-3.5 px-8 rounded-full transition-all shadow-lg text-sm"
          >
            <Ticket className="w-4 h-4" /> START BOOKING NOW
          </a>
        </div>
      </div>

      <FAQ />

      {/* Official Booking CTA */}
      <div className="px-1.5 py-4">
        <div className="bg-[#cc0000] rounded-3xl overflow-hidden flex items-center relative h-56 shadow-lg">
          <div className="p-6 w-1/2 z-10">
            <h2 className="text-white text-2xl font-bold leading-tight mb-4">
              <span className="text-[#ffcc00]">Book</span> directly on our website
            </h2>
          </div>
          <div className="absolute right-[-20px] top-6 w-56 h-[400px] bg-white rounded-3xl border-4 border-gray-200 shadow-2xl transform -rotate-6">
            <div className="w-16 h-4 bg-gray-200 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl" />
            <div className="pt-12 px-4 flex flex-col items-center text-center">
              <span className="text-xs text-gray-800 font-bold mb-1">Welcome to</span>
              <div className="w-24 h-24 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md mb-3">
                <Bus className="w-10 h-10" />
              </div>
              <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider">SimbaCoach Bus</span>
            </div>
          </div>
        </div>
      </div>

      {selectedRoute && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          route={selectedRoute}
        />
      )}
    </div>
  );
};

export default Home;
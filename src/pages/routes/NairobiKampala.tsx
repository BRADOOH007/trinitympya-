import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Star } from 'lucide-react';

const NairobiKampala = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/routes', { state: { origin: 'Nairobi', destination: 'Kampala' } });
  };

  const faqs = [
    {
      q: 'How long is the Nairobi to Kampala bus journey?',
      a: 'The Nairobi to Kampala bus journey takes approximately 10–12 hours depending on border crossing times at Busia or Malaba.',
    },
    {
      q: 'What is the price of a Nairobi to Kampala bus ticket?',
      a: 'Trinity Express bus tickets from Nairobi to Kampala start from KSh 3,500 for standard class and KSh 5,000 for VIP.',
    },
    {
      q: 'What time does the Nairobi to Kampala bus depart?',
      a: 'Trinity Express operates daily departures from Nairobi to Kampala. The main departure is at 7:00 AM from our Duruma Road terminal.',
    },
    {
      q: 'Where does the bus drop off in Kampala?',
      a: 'Our buses arrive at the Trinity Express Kampala terminal on Namirembe Road, Bakuli — centrally located and easily accessible.',
    },
    {
      q: 'Can I book a Nairobi to Kampala bus ticket online?',
      a: 'Yes. You can book your seat directly on this website. Select your date, choose your seat, and pay via M-Pesa or card. Instant confirmation.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Nairobi to Kampala Bus | Daily Departures | Book Online - Trinity Express</title>
        <meta name="description" content="Book Nairobi to Kampala bus tickets online with Trinity Express. Daily departures, comfortable seats, affordable prices from KSh 3,500. Instant confirmation." />
        <meta name="keywords" content="Nairobi to Kampala bus, Nairobi Kampala bus ticket, Nairobi to Kampala bus price, Trinity Express Nairobi Kampala, bus from Nairobi to Kampala, Kampala bus booking" />
        <link rel="canonical" href="https://traveltrinityexpress.online/routes/nairobi-kampala" />
        <meta property="og:title" content="Nairobi to Kampala Bus | Daily Departures | Trinity Express" />
        <meta property="og:description" content="Book Nairobi to Kampala bus tickets online. Daily departures from KSh 3,500. Safe, comfortable, and reliable." />
        <meta property="og:url" content="https://traveltrinityexpress.online/routes/nairobi-kampala" />
        <meta property="og:image" content="https://traveltrinityexpress.online/assets/kampala.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BusTrip",
          "name": "Nairobi to Kampala Bus",
          "provider": { "@type": "Organization", "name": "Trinity Express Bus", "url": "https://traveltrinityexpress.online" },
          "departureBusStop": { "@type": "BusStop", "name": "Nairobi Terminal, Duruma Road", "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "KE" } },
          "arrivalBusStop": { "@type": "BusStop", "name": "Kampala Terminal, Namirembe Road", "address": { "@type": "PostalAddress", "addressLocality": "Kampala", "addressCountry": "UG" } },
          "departureTime": "07:00",
          "offers": { "@type": "Offer", "price": "3500", "priceCurrency": "KES", "availability": "https://schema.org/InStock" }
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/routes" className="hover:text-white">Routes</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Nairobi → Kampala</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nairobi to Kampala Bus</h1>
          <p className="text-xl text-blue-200 max-w-2xl">Daily direct bus service from Nairobi, Kenya to Kampala, Uganda. Comfortable seats, affordable prices, and on-time departures.</p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-400" /><span>~10–12 hours</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400" /><span>Duruma Rd, Nairobi → Namirembe Rd, Kampala</span></div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-orange-400 fill-orange-400" /><span>4.8/5 rated route</span></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Booking CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gray-500 text-sm uppercase font-semibold mb-1">Starting from</p>
            <p className="text-4xl font-extrabold text-[#1E3A8A]">KSh 3,500</p>
            <p className="text-orange-600 font-semibold text-sm mt-1">VIP: KSh 5,000</p>
          </div>
          <button onClick={handleBookNow} className="px-10 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-400/40 transition-all text-lg">
            Book Your Seat Now
          </button>
        </div>

        {/* Route Details */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Route</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>Nairobi to Kampala bus</strong> is one of Trinity Express's most popular international routes. Departing daily from our Duruma Road terminal in Nairobi, our buses travel through the scenic Rift Valley, crossing into Uganda at the Busia or Malaba border before arriving in Kampala's city centre.
          </p>
          <p className="text-gray-600 leading-relaxed">
            All buses on this route are air-conditioned with reclining seats, USB charging ports, and onboard entertainment. Our professional drivers ensure a safe and punctual journey every time.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Departure', value: '7:00 AM Daily' },
              { label: 'Duration', value: '10–12 Hours' },
              { label: 'Standard', value: 'KSh 3,500' },
              { label: 'VIP', value: 'KSh 5,000' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{item.label}</p>
                <p className="font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Routes */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Nairobi → Kigali', to: '/routes/nairobi-kigali' },
              { label: 'Nairobi → Juba', to: '/routes/nairobi-juba' },
              { label: 'Nairobi → Dar es Salaam', to: '/routes/nairobi-dar-es-salaam' },
            ].map((r) => (
              <Link key={r.to} to={r.to} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#1E3A8A] hover:bg-blue-50 transition-all group">
                <span className="font-semibold text-gray-700 group-hover:text-[#1E3A8A]">{r.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1E3A8A]" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NairobiKampala;


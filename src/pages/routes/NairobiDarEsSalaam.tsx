
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Star } from 'lucide-react';

const NairobiDarEsSalaam = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/routes', { state: { origin: 'Nairobi', destination: 'Dar es Salaam' } });
  };

  const faqs = [
    {
      q: 'How long is the Nairobi to Dar es Salaam bus journey?',
      a: 'The Nairobi to Dar es Salaam bus journey takes approximately 14–16 hours, crossing into Tanzania at the Namanga border.',
    },
    {
      q: 'What is the price of a Nairobi to Dar es Salaam bus ticket?',
      a: 'SimbaCoach bus tickets from Nairobi to Dar es Salaam start from KSh 4,500 for standard class and KSh 6,500 for VIP.',
    },
    {
      q: 'Which border does the Nairobi to Dar es Salaam bus cross?',
      a: 'Our buses cross at the Namanga border between Kenya and Tanzania, which is one of the busiest and most efficient border crossings in East Africa.',
    },
    {
      q: 'Where does the bus drop off in Dar es Salaam?',
      a: 'Our buses arrive at the main bus terminal in Dar es Salaam city centre, conveniently located near major hotels and transport links.',
    },
    {
      q: 'Can I book a Nairobi to Dar es Salaam bus ticket online?',
      a: 'Yes. Book your seat on this website, select your travel date, choose your seat, and pay via M-Pesa or card for instant confirmation.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Nairobi to Dar es Salaam Bus | Book Online - SimbaCoach Bus</title>
        <meta name="description" content="Book Nairobi to Dar es Salaam bus tickets online with SimbaCoach. Daily departures from KSh 4,500. Safe, comfortable, and reliable." />
        <meta name="keywords" content="Nairobi to Dar es Salaam bus, Nairobi Dar es Salaam bus ticket, bus from Nairobi to Tanzania, SimbaCoach Dar es Salaam, Nairobi Tanzania bus" />
        <link rel="canonical" href="https://simba-coach-bus.online/routes/nairobi-dar-es-salaam" />
        <meta property="og:title" content="Nairobi to Dar es Salaam Bus | Book Online - SimbaCoach" />
        <meta property="og:description" content="Book Nairobi to Dar es Salaam bus tickets online. Daily departures from KSh 4,500. Safe and comfortable." />
        <meta property="og:url" content="https://simba-coach-bus.online/routes/nairobi-dar-es-salaam" />
        <meta property="og:image" content="https://simba-coach-bus.online/assets/simba-hero.webp" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="SimbaCoach" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://simba-coach-bus.online/assets/simba-hero.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
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
            <span className="text-white">Nairobi → Dar es Salaam</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nairobi to Dar es Salaam Bus</h1>
          <p className="text-xl text-blue-200 max-w-2xl">Daily bus service from Nairobi, Kenya to Dar es Salaam, Tanzania. Comfortable, affordable, and on time.</p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-400" /><span>~14–16 hours</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400" /><span>Duruma Rd, Nairobi → Dar es Salaam City Centre</span></div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-orange-400 fill-orange-400" /><span>4.8/5 rated route</span></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Booking CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gray-500 text-sm uppercase font-semibold mb-1">Starting from</p>
            <p className="text-4xl font-extrabold text-[#1E3A8A]">KSh 4,500</p>
            <p className="text-orange-600 font-semibold text-sm mt-1">VIP: KSh 6,500</p>
          </div>
          <button onClick={handleBookNow} className="px-10 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-400/40 transition-all text-lg">
            Book Your Seat Now
          </button>
        </div>

        {/* Route Details */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Route</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The <strong>Nairobi to Dar es Salaam bus</strong> is a popular route operated daily by SimbaCoach. The journey crosses into Tanzania at the Namanga border and continues south to Dar es Salaam, Tanzania's largest city and commercial hub.
          </p>
          <p className="text-gray-600 leading-relaxed">
            All buses are air-conditioned with reclining seats, USB charging ports, and onboard entertainment. Our professional drivers ensure a safe and comfortable journey.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Departure', value: '7:00 AM Daily' },
              { label: 'Duration', value: '14–16 Hours' },
              { label: 'Standard', value: 'KSh 4,500' },
              { label: 'VIP', value: 'KSh 6,500' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{item.label}</p>
                <p className="font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
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
              { label: 'Nairobi → Kampala', to: '/routes/nairobi-kampala' },
              { label: 'Nairobi → Kigali', to: '/routes/nairobi-kigali' },
              { label: 'Nairobi → Juba', to: '/routes/nairobi-juba' },
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

export default NairobiDarEsSalaam;


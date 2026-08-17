import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

const NairobiJubaTravelGuide = () => {
  const publishDate = '2025-05-17';

  const faqs = [
    { q: 'How long is the Nairobi to Juba bus journey?', a: 'The journey takes approximately 24â€“30 hours, crossing through Uganda and into South Sudan.' },
    { q: 'What is the price of a Nairobi to Juba bus ticket?', a: 'SimbaCoach tickets start from USD 45 for standard class and USD 60 for VIP.' },
    { q: 'Is the Nairobi to Juba bus route safe?', a: 'Yes. SimbaCoach operates this route with experienced drivers and well-maintained buses, monitoring road and border conditions.' },
    { q: 'What documents do I need to travel from Kenya to South Sudan?', a: 'A valid passport is required. A South Sudan visa may be required depending on your nationality â€” check requirements before travel.' },
    { q: 'Can I book a Nairobi to Juba bus ticket online?', a: 'Yes. Book on the SimbaCoach website, choose your date and seat, and pay via M-Pesa or card for instant confirmation.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Nairobi to Juba Bus: Complete 2025 Travel Guide | SimbaCoach</title>
        <meta name="description" content="Everything you need to know about the Nairobi to Juba bus in 2025. Prices from USD 45, schedules, border tips, and how to book online with SimbaCoach." />
        <meta name="keywords" content="Nairobi to Juba bus 2025, Nairobi Juba bus price, how to travel Nairobi to Juba, SimbaCoach Nairobi Juba, Kenya South Sudan bus, Juba bus from Nairobi" />
        <link rel="canonical" href="https://simbacoachbus.online/blog/nairobi-to-juba-bus-travel-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Nairobi to Juba Bus: Complete 2025 Travel Guide" />
        <meta property="og:description" content="Prices, schedules, border tips, and how to book your Nairobi to Juba bus ticket online in 2025." />
        <meta property="og:url" content="https://simbacoachbus.online/blog/nairobi-to-juba-bus-travel-guide" />
        <meta property="og:image" content="https://simbacoachbus.online/assets/simba-bus-hero-80XU48vz.webp" />
        <meta property="article:published_time" content={publishDate} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Nairobi to Juba Bus: Complete 2025 Travel Guide", "datePublished": publishDate, "dateModified": publishDate, "author": { "@type": "Organization", "name": "SimbaCoach Bus" }, "publisher": { "@type": "Organization", "name": "SimbaCoach Bus", "logo": { "@type": "ImageObject", "url": "https://simbacoachbus.online/assets/logo.webp" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://simbacoachbus.online/blog/nairobi-to-juba-bus-travel-guide" } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) })}</script>
      </Helmet>

      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Nairobi to Juba Travel Guide</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 24, 2025</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> SimbaCoach Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Nairobi to Juba Bus: Complete 2025 Travel Guide</h1>
          <p className="text-xl text-blue-200">Prices, schedules, border requirements, and tips for travelling from Kenya to South Sudan by bus.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">

          <p className="text-gray-600 text-lg leading-relaxed">
            Travelling by bus from <strong>Nairobi to Juba</strong> is the most affordable way to reach South Sudan's capital. SimbaCoach operates this route daily with experienced drivers and modern, air-conditioned buses.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How Long Does the Journey Take?</h2>
            <p className="text-gray-600 leading-relaxed">The Nairobi to Juba bus takes approximately <strong>24â€“30 hours</strong>. The route crosses through Uganda before entering South Sudan. Departure is at <strong>7:00 AM daily</strong> from Duruma Road, Nairobi.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ticket Prices in 2025</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#1E3A8A] text-white"><th className="p-3 text-left rounded-tl-lg">Class</th><th className="p-3 text-left">Price</th><th className="p-3 text-left rounded-tr-lg">Features</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="p-3 font-semibold text-gray-800">Standard</td><td className="p-3 text-gray-700">USD 45</td><td className="p-3 text-gray-600">AC, reclining seats, USB charging</td></tr>
                  <tr className="bg-orange-50"><td className="p-3 font-semibold text-gray-800">VIP</td><td className="p-3 text-gray-700">USD 60</td><td className="p-3 text-gray-600">Extra legroom, wider seats, priority boarding</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Documents & Border Requirements</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Passport:</strong> A valid passport is required for all travellers.</li>
              <li><strong>South Sudan visa:</strong> Check visa requirements for your nationality before travel. Some nationalities require a visa on arrival.</li>
              <li><strong>Yellow fever certificate:</strong> Required for entry into Uganda and South Sudan.</li>
              <li><strong>Currency:</strong> South Sudanese Pound (SSP) is used in Juba. USD is also widely accepted.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tips for the Journey</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Arrive at the terminal <strong>30 minutes before departure</strong></li>
              <li>Pack enough food and water for a 24â€“30 hour journey</li>
              <li>Carry all travel documents in an easily accessible bag</li>
              <li>Dress comfortably â€” long journeys require comfortable clothing</li>
              <li>Book in advance to secure your preferred seat class</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3A8A] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Book Your Nairobi â†’ Juba Seat</h3>
            <p className="text-blue-200 mb-6">Daily departures. Instant confirmation.</p>
            <Link to="/routes/nairobi-juba" className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg transition-all">
              Book Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NairobiJubaTravelGuide;


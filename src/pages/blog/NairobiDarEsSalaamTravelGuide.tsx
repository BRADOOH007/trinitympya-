import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

const NairobiDarEsSalaamTravelGuide = () => {
  const publishDate = '2026-04-24';
  const faqs = [
    { q: 'How long is the Nairobi to Dar es Salaam bus journey?', a: 'Approximately 14–16 hours, crossing into Tanzania at the Namanga border.' },
    { q: 'What is the price of a Nairobi to Dar es Salaam bus ticket?', a: 'Trinity Express tickets start from KSh 4,500 standard and KSh 6,500 VIP.' },
    { q: 'Which border does the bus cross?', a: 'The Namanga border between Kenya and Tanzania.' },
    { q: 'What documents do I need?', a: 'A valid passport or EAC travel document.' },
    { q: 'Can I book online?', a: 'Yes — select your date, choose your seat, and pay via M-Pesa or card for instant confirmation.' },
  ];
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Nairobi to Dar es Salaam Bus: Complete 2026 Travel Guide | Trinity Express</title>
        <meta name="description" content="Everything you need to know about the Nairobi to Dar es Salaam bus in 2026. Prices from KSh 4,500, schedules, Namanga border tips, and how to book online." />
        <meta name="keywords" content="Nairobi to Dar es Salaam bus 2026, Nairobi Dar es Salaam bus price, Trinity Express Nairobi Dar es Salaam, Kenya Tanzania bus" />
        <link rel="canonical" href="https://www.trinityexpressbusonlinebooking.com/blog/nairobi-to-dar-es-salaam-bus-travel-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Nairobi to Dar es Salaam Bus: Complete 2026 Travel Guide" />
        <meta property="og:url" content="https://www.trinityexpressbusonlinebooking.com/blog/nairobi-to-dar-es-salaam-bus-travel-guide" />
        <meta property="og:description" content="Prices, schedules, Namanga border tips, and how to book your Nairobi to Dar es Salaam bus ticket online in 2026." />
        <meta property="og:image" content="https://www.trinityexpressbusonlinebooking.com/assets/nairobi.jpg" />
        <meta property="article:published_time" content={publishDate} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Nairobi to Dar es Salaam Bus: Complete 2026 Travel Guide", "datePublished": publishDate, "dateModified": publishDate, "author": { "@type": "Organization", "name": "Trinity Express Bus" }, "publisher": { "@type": "Organization", "name": "Trinity Express Bus", "logo": { "@type": "ImageObject", "url": "https://www.trinityexpressbusonlinebooking.com/assets/logo.jpeg" } } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) })}</script>
      </Helmet>
      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Nairobi to Dar es Salaam Travel Guide</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 24, 2026</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Trinity Express Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Nairobi to Dar es Salaam Bus: Complete 2026 Travel Guide</h1>
          <p className="text-xl text-blue-200">Prices, schedules, Namanga border tips, and everything you need for a smooth journey.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
          <p className="text-gray-600 text-lg leading-relaxed">The <strong>Nairobi to Dar es Salaam bus</strong> connects Kenya's capital with Tanzania's largest city. Trinity Express operates this route daily with modern, air-conditioned buses.</p>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How Long Does the Journey Take?</h2>
            <p className="text-gray-600 leading-relaxed">Approximately <strong>14–16 hours</strong>, crossing at Namanga. Departure at <strong>7:00 AM daily</strong> from Duruma Road, Nairobi.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ticket Prices in 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#1E3A8A] text-white"><th className="p-3 text-left rounded-tl-lg">Class</th><th className="p-3 text-left">Price</th><th className="p-3 text-left rounded-tr-lg">Features</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="p-3 font-semibold">Standard</td><td className="p-3">KSh 4,500</td><td className="p-3 text-gray-600">AC, reclining seats, USB charging</td></tr>
                  <tr className="bg-orange-50"><td className="p-3 font-semibold">VIP</td><td className="p-3">KSh 6,500</td><td className="p-3 text-gray-600">Extra legroom, wider seats, priority boarding</td></tr>
                </tbody>
              </table>
            </div>
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
            <h3 className="text-2xl font-bold mb-3">Book Your Nairobi → Dar es Salaam Seat</h3>
            <p className="text-blue-200 mb-6">Daily departures. Instant confirmation.</p>
            <Link to="/routes/nairobi-dar-es-salaam" className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg transition-all">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NairobiDarEsSalaamTravelGuide;

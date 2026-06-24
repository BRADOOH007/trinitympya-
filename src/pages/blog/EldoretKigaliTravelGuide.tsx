import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

const EldoretKigaliTravelGuide = () => {
  const publishDate = '2025-05-17';

  const faqs = [
    { q: 'How long is the Eldoret to Kigali bus journey?', a: 'The Eldoret to Kigali bus journey takes approximately 15–18 hours, crossing through Uganda and into Rwanda at the Gatuna/Katuna border.' },
    { q: 'What is the price of an Eldoret to Kigali bus ticket?', a: 'Trinity Express bus tickets from Eldoret to Kigali start from KSh 4,000 for standard class and KSh 6,000 for VIP.' },
    { q: 'Does the Eldoret to Kigali bus go through Kampala?', a: 'Yes, the route passes through Kampala, Uganda before continuing to Kigali, Rwanda.' },
    { q: 'What documents do I need to travel from Eldoret to Kigali?', a: 'A valid passport is required. EAC citizens may use national IDs. A yellow fever certificate is required for both Uganda and Rwanda.' },
    { q: 'Can I book an Eldoret to Kigali bus ticket online?', a: 'Yes. Book on the Trinity Express website, choose your date and seat, and pay via M-Pesa or card for instant confirmation.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Eldoret to Kigali Bus: Complete 2025 Travel Guide | Trinity Express</title>
        <meta name="description" content="Everything you need to know about the Eldoret to Kigali bus in 2025. Prices from KSh 4,000, schedules, border tips via Kampala, and how to book online." />
        <meta name="keywords" content="Eldoret to Kigali bus, Eldoret Kigali bus ticket, bus from Eldoret to Kigali, Trinity Express Eldoret Kigali, Eldoret Rwanda bus, Eldoret to Kigali 2025" />
        <link rel="canonical" href="https://eattrinityexpress.site/blog/eldoret-to-kigali-bus-travel-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Eldoret to Kigali Bus: Complete 2025 Travel Guide" />
        <meta property="og:description" content="Prices, schedules, border tips, and how to book your Eldoret to Kigali bus ticket online in 2025." />
        <meta property="og:url" content="https://eattrinityexpress.site/blog/eldoret-to-kigali-bus-travel-guide" />
        <meta property="og:image" content="https://eattrinityexpress.site/assets/kampala.jpg" />
        <meta property="article:published_time" content={publishDate} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Eldoret to Kigali Bus: Complete 2025 Travel Guide", "datePublished": publishDate, "dateModified": publishDate, "author": { "@type": "Organization", "name": "Trinity Express Bus" }, "publisher": { "@type": "Organization", "name": "Trinity Express Bus", "logo": { "@type": "ImageObject", "url": "https://eattrinityexpress.site/assets/logo.jpeg" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://eattrinityexpress.site/blog/eldoret-to-kigali-bus-travel-guide" } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) })}</script>
      </Helmet>

      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Eldoret to Kigali Travel Guide</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 24, 2025</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Trinity Express Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Eldoret to Kigali Bus: Complete 2025 Travel Guide</h1>
          <p className="text-xl text-blue-200">Prices, schedules, border tips, and everything you need for a smooth Eldoret–Kigali journey via Kampala.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">

          <p className="text-gray-600 text-lg leading-relaxed">
            The <strong>Eldoret to Kigali bus</strong> is a convenient option for travellers in the Rift Valley heading to Rwanda. The route passes through Kampala, Uganda before crossing into Rwanda — connecting three East African nations in one journey.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How Long Does the Journey Take?</h2>
            <p className="text-gray-600 leading-relaxed">The Eldoret to Kigali bus takes approximately <strong>15–18 hours</strong>, crossing at Malaba (Kenya/Uganda) and Gatuna/Katuna (Uganda/Rwanda). Trinity Express operates daily departures from Eldoret.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ticket Prices in 2025</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#1E3A8A] text-white"><th className="p-3 text-left rounded-tl-lg">Class</th><th className="p-3 text-left">Price</th><th className="p-3 text-left rounded-tr-lg">Features</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="p-3 font-semibold text-gray-800">Standard</td><td className="p-3 text-gray-700">KSh 4,000</td><td className="p-3 text-gray-600">AC, reclining seats, USB charging</td></tr>
                  <tr className="bg-orange-50"><td className="p-3 font-semibold text-gray-800">VIP</td><td className="p-3 text-gray-700">KSh 6,000</td><td className="p-3 text-gray-600">Extra legroom, wider seats, priority boarding</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Border Crossings: What to Expect</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Documents:</strong> Valid passport required. EAC citizens may use national IDs.</li>
              <li><strong>Yellow fever certificate:</strong> Required for entry into Uganda and Rwanda.</li>
              <li><strong>Two border crossings:</strong> Malaba (Kenya/Uganda) and Gatuna/Katuna (Uganda/Rwanda).</li>
              <li><strong>Currency:</strong> Rwandan Francs (RWF) used in Kigali.</li>
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
            <h3 className="text-2xl font-bold mb-3">Book Your Eldoret → Kigali Seat</h3>
            <p className="text-blue-200 mb-6">Daily departures. Instant confirmation.</p>
            <Link to="/routes" state={{ origin: 'Eldoret', destination: 'Kigali' }} className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg transition-all">
              Book Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EldoretKigaliTravelGuide;


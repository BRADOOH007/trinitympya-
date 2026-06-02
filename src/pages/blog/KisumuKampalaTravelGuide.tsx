import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

const KisumuKampalaTravelGuide = () => {
  const publishDate = '2025-05-17';

  const faqs = [
    { q: 'How long is the Kisumu to Kampala bus journey?', a: 'The Kisumu to Kampala bus journey takes approximately 8–10 hours. Kisumu is close to the Uganda border, making this one of the shorter cross-border routes.' },
    { q: 'What is the price of a Kisumu to Kampala bus ticket?', a: 'Trinity Express bus tickets from Kisumu to Kampala start from KSh 2,500 for standard class and KSh 4,000 for VIP.' },
    { q: 'Where does the Kisumu to Kampala bus depart from?', a: 'Buses depart from the Trinity Express terminal in Kisumu. We recommend arriving 30 minutes before departure.' },
    { q: 'Which border does the Kisumu to Kampala bus cross?', a: 'The bus crosses at the Busia border between Kenya and Uganda, which is the closest border crossing to Kisumu.' },
    { q: 'Can I book a Kisumu to Kampala bus ticket online?', a: 'Yes. Book your seat on the Trinity Express website, select your date, choose your seat class, and pay via M-Pesa or card for instant confirmation.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Kisumu to Kampala Bus: Complete 2025 Travel Guide | Trinity Express</title>
        <meta name="description" content="Everything you need to know about the Kisumu to Kampala bus in 2025. Prices from KSh 2,500, schedules, Busia border tips, and how to book online." />
        <meta name="keywords" content="Kisumu to Kampala bus, Kisumu Kampala bus ticket, bus from Kisumu to Kampala, Trinity Express Kisumu Kampala, Kisumu Uganda bus, Kisumu to Kampala 2025" />
        <link rel="canonical" href="https://traveltrinityexpress.online/blog/kisumu-to-kampala-bus-travel-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Kisumu to Kampala Bus: Complete 2025 Travel Guide" />
        <meta property="og:description" content="Prices, schedules, Busia border tips, and how to book your Kisumu to Kampala bus ticket online in 2025." />
        <meta property="og:url" content="https://traveltrinityexpress.online/blog/kisumu-to-kampala-bus-travel-guide" />
        <meta property="og:image" content="https://traveltrinityexpress.online/assets/kampala.jpg" />
        <meta property="article:published_time" content={publishDate} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Article", "headline": "Kisumu to Kampala Bus: Complete 2025 Travel Guide", "datePublished": publishDate, "dateModified": publishDate, "author": { "@type": "Organization", "name": "Trinity Express Bus" }, "publisher": { "@type": "Organization", "name": "Trinity Express Bus", "logo": { "@type": "ImageObject", "url": "https://traveltrinityexpress.online/assets/logo.jpeg" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://traveltrinityexpress.online/blog/kisumu-to-kampala-bus-travel-guide" } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) })}</script>
      </Helmet>

      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Kisumu to Kampala Travel Guide</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 24, 2025</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Trinity Express Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Kisumu to Kampala Bus: Complete 2025 Travel Guide</h1>
          <p className="text-xl text-blue-200">Prices, schedules, Busia border tips, and everything you need for a smooth Kisumu–Kampala journey.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-8">

          <p className="text-gray-600 text-lg leading-relaxed">
            Travelling by bus from <strong>Kisumu to Kampala</strong> is one of the most convenient cross-border routes in East Africa. Kisumu's proximity to the Uganda border means this is a shorter journey than the Nairobi–Kampala route, making it ideal for travellers in western Kenya.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How Long Does the Journey Take?</h2>
            <p className="text-gray-600 leading-relaxed">The Kisumu to Kampala bus takes approximately <strong>8–10 hours</strong>. The route crosses into Uganda at the Busia border. Trinity Express operates daily departures from Kisumu.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ticket Prices in 2025</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#1E3A8A] text-white"><th className="p-3 text-left rounded-tl-lg">Class</th><th className="p-3 text-left">Price</th><th className="p-3 text-left rounded-tr-lg">Features</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="p-3 font-semibold text-gray-800">Standard</td><td className="p-3 text-gray-700">KSh 2,500</td><td className="p-3 text-gray-600">AC, reclining seats, USB charging</td></tr>
                  <tr className="bg-orange-50"><td className="p-3 font-semibold text-gray-800">VIP</td><td className="p-3 text-gray-700">KSh 4,000</td><td className="p-3 text-gray-600">Extra legroom, wider seats, priority boarding</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Busia Border: What to Expect</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Documents:</strong> Valid passport or EAC travel document. Kenyan and Ugandan nationals can use national IDs.</li>
              <li><strong>Yellow fever certificate:</strong> Required for entry into Uganda.</li>
              <li><strong>Border wait time:</strong> Usually 30–60 minutes at Busia.</li>
              <li><strong>Currency:</strong> Ugandan Shillings (UGX) are used in Kampala.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tips for the Journey</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Arrive at the terminal <strong>30 minutes before departure</strong></li>
              <li>Keep travel documents easily accessible for the border crossing</li>
              <li>Carry some Ugandan Shillings or USD for expenses in Kampala</li>
              <li>Book in advance to secure your preferred seat</li>
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
            <h3 className="text-2xl font-bold mb-3">Book Your Kisumu → Kampala Seat</h3>
            <p className="text-blue-200 mb-6">Daily departures. Instant confirmation.</p>
            <Link to="/routes" state={{ origin: 'Kisumu', destination: 'Kampala' }} className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg transition-all">
              Book Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KisumuKampalaTravelGuide;


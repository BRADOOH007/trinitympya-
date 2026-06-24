import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User } from 'lucide-react';

const NairobiKampalaTravelGuide = () => {
  const publishDate = '2025-05-17';
  const modifiedDate = '2025-05-17';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Nairobi to Kampala Bus: Complete 2025 Travel Guide",
    "description": "Everything you need to know about travelling by bus from Nairobi to Kampala in 2025. Prices, schedules, border crossing tips, and how to book online.",
    "image": "https://eattrinityexpress.site/assets/kampala.jpg",
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": { "@type": "Organization", "name": "Trinity Express Bus" },
    "publisher": {
      "@type": "Organization",
      "name": "Trinity Express Bus",
      "logo": { "@type": "ImageObject", "url": "https://eattrinityexpress.site/assets/logo.jpeg" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://eattrinityexpress.site/blog/nairobi-to-kampala-bus-travel-guide" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much does a Nairobi to Kampala bus ticket cost in 2025?", "acceptedAnswer": { "@type": "Answer", "text": "In 2025, Trinity Express bus tickets from Nairobi to Kampala start from KSh 3,500 for standard class and KSh 5,000 for VIP seats." } },
      { "@type": "Question", "name": "How long does the Nairobi to Kampala bus journey take?", "acceptedAnswer": { "@type": "Answer", "text": "The journey takes approximately 10–12 hours depending on traffic and border crossing times at Busia or Malaba." } },
      { "@type": "Question", "name": "What documents do I need to cross from Kenya to Uganda by bus?", "acceptedAnswer": { "@type": "Answer", "text": "You need a valid passport or East African Community travel document. Kenyan and Ugandan citizens can use their national IDs. Ensure your documents are valid before travel." } },
      { "@type": "Question", "name": "Is the Nairobi to Kampala bus journey safe?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trinity Express operates modern, well-maintained buses with professional drivers. The Nairobi–Kampala highway is one of the most travelled routes in East Africa." } },
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Nairobi to Kampala Bus: Complete 2025 Travel Guide | Trinity Express</title>
        <meta name="description" content="Everything you need to know about the Nairobi to Kampala bus in 2025. Prices from KSh 3,500, schedules, border tips, and how to book online with Trinity Express." />
        <meta name="keywords" content="Nairobi to Kampala bus 2025, Nairobi Kampala bus price, how to travel Nairobi to Kampala, Nairobi Kampala bus guide, Trinity Express Nairobi Kampala, Kenya Uganda bus" />
        <link rel="canonical" href="https://eattrinityexpress.site/blog/nairobi-to-kampala-bus-travel-guide" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Nairobi to Kampala Bus: Complete 2025 Travel Guide" />
        <meta property="og:description" content="Prices, schedules, border crossing tips, and how to book your Nairobi to Kampala bus ticket online in 2025." />
        <meta property="og:url" content="https://eattrinityexpress.site/blog/nairobi-to-kampala-bus-travel-guide" />
        <meta property="og:image" content="https://eattrinityexpress.site/assets/kampala.jpg" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Nairobi to Kampala Travel Guide</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 17, 2025</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Trinity Express Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Nairobi to Kampala Bus: Complete 2025 Travel Guide</h1>
          <p className="text-xl text-blue-200">Everything you need to know — prices, schedules, border crossings, and tips for a smooth journey.</p>
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none">

          <p className="text-gray-600 text-lg leading-relaxed">
            Travelling by bus from <strong>Nairobi to Kampala</strong> is one of the most popular cross-border journeys in East Africa. Whether you're heading to Uganda for business, tourism, or to visit family, this guide covers everything you need for a smooth trip in 2025.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How Long Does the Nairobi to Kampala Bus Take?</h2>
          <p className="text-gray-600 leading-relaxed">
            The journey from Nairobi to Kampala takes approximately <strong>10 to 12 hours</strong>. The exact duration depends on traffic conditions in Nairobi and Kampala, and the time spent at the Kenya-Uganda border crossing at either <strong>Busia</strong> or <strong>Malaba</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Trinity Express buses depart at <strong>7:00 AM daily</strong> from our Duruma Road terminal in Nairobi, typically arriving in Kampala by early evening.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Nairobi to Kampala Bus Ticket Prices in 2025</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1E3A8A] text-white">
                  <th className="p-3 text-left rounded-tl-lg">Class</th>
                  <th className="p-3 text-left">Price (KSh)</th>
                  <th className="p-3 text-left rounded-tr-lg">Features</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-3 font-semibold text-gray-800">Standard</td>
                  <td className="p-3 text-gray-700">KSh 3,500</td>
                  <td className="p-3 text-gray-600">AC, reclining seats, USB charging</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="p-3 font-semibold text-gray-800">VIP</td>
                  <td className="p-3 text-gray-700">KSh 5,000</td>
                  <td className="p-3 text-gray-600">Extra legroom, wider seats, priority boarding</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Prices are subject to change during peak travel periods such as public holidays and school holidays. We recommend booking in advance to secure the best price.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What to Expect at the Kenya-Uganda Border</h2>
          <p className="text-gray-600 leading-relaxed">
            The border crossing is usually the longest part of the journey. Here's what to expect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
            <li><strong>Documents required:</strong> Valid passport or EAC travel document. Kenyan and Ugandan nationals can use national IDs.</li>
            <li><strong>Yellow fever certificate:</strong> Required for entry into Uganda. Carry your vaccination card.</li>
            <li><strong>Border wait time:</strong> Usually 30–90 minutes depending on the day and time.</li>
            <li><strong>Currency:</strong> You can exchange Kenyan Shillings to Ugandan Shillings at the border or in Kampala.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What's Included on the Bus?</h2>
          <p className="text-gray-600 leading-relaxed">
            All Trinity Express buses on the Nairobi–Kampala route are equipped with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
            <li>Air conditioning throughout the journey</li>
            <li>Reclining seats with adequate legroom</li>
            <li>USB charging ports at every seat</li>
            <li>Onboard entertainment system</li>
            <li>Luggage storage in the hold</li>
            <li>Scheduled rest stops for meals and restrooms</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Book Your Nairobi to Kampala Bus Ticket Online</h2>
          <p className="text-gray-600 leading-relaxed">
            Booking online with Trinity Express takes less than 3 minutes:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-600 mt-4">
            <li>Go to the <Link to="/" className="text-[#1E88E5] hover:underline">Trinity Express homepage</Link></li>
            <li>Select <strong>Nairobi</strong> as your origin and <strong>Kampala</strong> as your destination</li>
            <li>Choose your travel date and click Search</li>
            <li>Select your preferred seat class (Standard or VIP)</li>
            <li>Pay via M-Pesa or card — you'll receive instant confirmation</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Tips for a Comfortable Journey</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
            <li>Arrive at the terminal at least <strong>30 minutes before departure</strong></li>
            <li>Carry snacks and water for the journey — stops are scheduled but limited</li>
            <li>Dress in layers — the bus AC can get cold on long journeys</li>
            <li>Keep your travel documents easily accessible for the border crossing</li>
            <li>Download offline maps of Kampala before you travel</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 mt-4">
            {[
              { q: 'How much does a Nairobi to Kampala bus ticket cost in 2025?', a: 'Trinity Express tickets start from KSh 3,500 for standard class and KSh 5,000 for VIP.' },
              { q: 'How long does the Nairobi to Kampala bus journey take?', a: 'Approximately 10–12 hours depending on traffic and border crossing times.' },
              { q: 'What documents do I need to cross from Kenya to Uganda by bus?', a: 'A valid passport or EAC travel document. Kenyan and Ugandan citizens can use national IDs. A yellow fever certificate is also required.' },
              { q: 'Is the Nairobi to Kampala bus journey safe?', a: 'Yes. Trinity Express operates modern buses with professional drivers on this well-travelled route.' },
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#1E3A8A] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to Book Your Seat?</h3>
            <p className="text-blue-200 mb-6">Daily departures from Nairobi to Kampala. Instant confirmation.</p>
            <Link to="/routes/nairobi-kampala" className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-400/40 transition-all">
              Book Nairobi → Kampala
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NairobiKampalaTravelGuide;


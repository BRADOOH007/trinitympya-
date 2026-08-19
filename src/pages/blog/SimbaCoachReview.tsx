
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Calendar, User, Star } from 'lucide-react';

const SimbaCoachReview = () => {
  const publishDate = '2025-05-17';
  const modifiedDate = '2025-05-17';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SimbaCoach Bus Review 2025: Is It the Best Bus from Nairobi?",
    "description": "An honest review of SimbaCoach Bus in 2025. Comfort, prices, punctuality, and how it compares to other bus companies on East African routes.",
    "image": "https://simba-coach-bus.online/assets/simba-hero.webp",
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": { "@type": "Organization", "name": "SimbaCoach Bus" },
    "publisher": {
      "@type": "Organization",
      "name": "SimbaCoach Bus",
      "logo": { "@type": "ImageObject", "url": "https://simba-coach-bus.online/assets/logo.webp" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://simba-coach-bus.online/blog/simba-bus-review" }
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "SimbaCoach Bus",
      "url": "https://simba-coach-bus.online"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "author": { "@type": "Organization", "name": "SimbaCoach Bus Editorial Team" },
    "reviewBody": "SimbaCoach Bus offers reliable, comfortable, and affordable bus travel across East Africa. With daily departures, modern buses, and easy online booking, it stands out as a top choice for international bus travel from Nairobi."
  };

  const ratings = [
    { label: 'Comfort', score: 4.8 },
    { label: 'Punctuality', score: 4.7 },
    { label: 'Value for Money', score: 4.9 },
    { label: 'Online Booking', score: 5.0 },
    { label: 'Customer Service', score: 4.6 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>SimbaCoach Bus Review 2025: Best Bus from Nairobi? | SimbaCoach</title>
        <meta name="description" content="Honest SimbaCoach Bus review for 2025. Comfort, prices, punctuality, online booking, and how it compares to other East Africa bus companies." />
        <meta name="keywords" content="SimbaCoach Bus review, SimbaCoach review 2025, best bus Nairobi to Kampala, SimbaCoach vs other buses, East Africa bus company review, SimbaCoach online booking review" />
        <link rel="canonical" href="https://simba-coach-bus.online/blog/simba-bus-review" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="SimbaCoach Bus Review 2025: Is It the Best Bus from Nairobi?" />
        <meta property="og:description" content="Comfort, prices, punctuality, and online booking — a full review of SimbaCoach Bus in 2025." />
        <meta property="og:url" content="https://simba-coach-bus.online/blog/simba-bus-review" />
        <meta property="og:image" content="https://simba-coach-bus.online/assets/simba-hero.webp" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="SimbaCoach" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://simba-coach-bus.online/assets/simba-hero.webp" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-[#1E3A8A] py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-blue-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">SimbaCoach Bus Review 2025</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-blue-300 mb-4 flex-wrap">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> April 24, 2025</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> SimbaCoach Team</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">SimbaCoach Bus Review 2025: Is It the Best Bus from Nairobi?</h1>
          <p className="text-xl text-blue-200">Comfort, prices, punctuality, and online booking — everything you need to know before you travel.</p>
        </div>
      </div>

      {/* Article Body */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          {/* Overall Rating Card */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E88E5] rounded-2xl p-8 text-white mb-10 flex flex-col md:flex-row items-center gap-8">
            <div className="text-center">
              <p className="text-6xl font-extrabold">4.8</p>
              <div className="flex justify-center gap-1 mt-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
              </div>
              <p className="text-blue-200 text-sm mt-1">Overall Rating</p>
            </div>
            <div className="flex-1 w-full space-y-3">
              {ratings.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-sm text-blue-100 w-36 shrink-0">{r.label}</span>
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${(r.score / 5) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{r.score}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            If you've searched for a bus from Nairobi to Kampala, Kigali, or Juba, you've likely come across <strong>SimbaCoach Bus</strong>. In this review, we break down exactly what to expect — from the booking experience to the quality of the buses and the reliability of departures.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Online Booking Experience</h2>
          <p className="text-gray-600 leading-relaxed">
            SimbaCoach offers one of the most straightforward online booking systems for East African bus travel. You can book directly on the website in under 3 minutes — select your route, choose your date, pick your seat class, and pay via <strong>M-Pesa or card</strong>. Confirmation is instant.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            This is a significant advantage over bus companies that still require you to visit a physical office or call an agent to reserve a seat.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Bus Comfort and Amenities</h2>
          <p className="text-gray-600 leading-relaxed">
            SimbaCoach operates a modern fleet of air-conditioned coaches. All buses on international routes include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
            <li>Reclining seats with adequate legroom</li>
            <li>USB charging ports at every seat</li>
            <li>Onboard entertainment system</li>
            <li>Luggage storage in the hold</li>
            <li>Scheduled rest stops for meals and restrooms</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            VIP seats offer extra legroom and wider seats — worth the upgrade on longer routes like Nairobi to Kigali or Nairobi to Juba.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Punctuality</h2>
          <p className="text-gray-600 leading-relaxed">
            Buses depart daily at <strong>7:00 AM</strong> from the Duruma Road terminal in Nairobi. SimbaCoach has a strong track record for on-time departures. Arrival times can vary slightly depending on border crossing wait times, which are outside the company's control.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Prices and Value for Money</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1E3A8A] text-white">
                  <th className="p-3 text-left rounded-tl-lg">Route</th>
                  <th className="p-3 text-left">Standard</th>
                  <th className="p-3 text-left rounded-tr-lg">VIP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { route: 'Nairobi → Kampala', std: 'KSh 3,500', vip: 'KSh 5,000' },
                  { route: 'Nairobi → Kigali', std: 'KSh 5,000', vip: 'KSh 7,000' },
                  { route: 'Nairobi → Juba', std: 'USD 45', vip: 'USD 60' },
                  { route: 'Nairobi → Dar es Salaam', std: 'KSh 4,500', vip: 'KSh 6,500' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="p-3 font-semibold text-gray-800">{row.route}</td>
                    <td className="p-3 text-gray-700">{row.std}</td>
                    <td className="p-3 text-gray-700">{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Compared to flying, SimbaCoach offers exceptional value — especially for routes like Nairobi to Kampala where the bus journey is only 10–12 hours and the price difference is significant.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Routes Covered</h2>
          <p className="text-gray-600 leading-relaxed">
            SimbaCoach covers major international routes across East Africa including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              { label: 'Nairobi → Kampala', to: '/routes/nairobi-kampala' },
              { label: 'Nairobi → Kigali', to: '/routes/nairobi-kigali' },
              { label: 'Nairobi → Juba', to: '/routes/nairobi-juba' },
              { label: 'Nairobi → Dar es Salaam', to: '/routes/nairobi-dar-es-salaam' },
            ].map((r) => (
              <Link key={r.to} to={r.to} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-[#1E3A8A] hover:bg-blue-50 transition-all group text-sm">
                <span className="font-semibold text-gray-700 group-hover:text-[#1E3A8A]">{r.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1E3A8A]" />
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Verdict</h2>
          <p className="text-gray-600 leading-relaxed">
            SimbaCoach Bus is a reliable, comfortable, and affordable choice for international bus travel from Nairobi. The online booking system is the best in class for East African bus companies, and the modern fleet makes long journeys genuinely comfortable. If you're travelling from Nairobi to Kampala, Kigali, Juba, or Dar es Salaam, SimbaCoach is our top recommendation.
          </p>

          {/* CTA */}
          <div className="mt-12 bg-[#1E3A8A] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Book Your Seat Today</h3>
            <p className="text-blue-200 mb-6">Daily departures across East Africa. Instant confirmation.</p>
            <Link to="/routes" className="inline-block px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-400/40 transition-all">
              View All Routes & Book
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimbaCoachReview;


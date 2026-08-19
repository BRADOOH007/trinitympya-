import { Wifi, Battery, Coffee, Snowflake, CheckCircle } from 'lucide-react';
import Seo from '../components/seo/Seo';

const buses = [
  {
    id: 1,
    name: 'Luxury Coach',
    image: '/assets/simba-bus-1.webp',
    description: 'Our standard luxury coaches offer a comfortable journey with ample legroom and air conditioning.',
    features: ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'Ample Luggage Space']
  },
  {
    id: 2,
    name: 'Executive Class',
    image: '/assets/simba-bus-2.webp',
    description: 'Upgrade your travel experience with wider seats, extra legroom, and complimentary refreshments.',
    features: ['Extra Legroom', 'Free WiFi', 'Refreshments', 'Entertainment System', 'AC']
  },
  {
    id: 3,
    name: 'VIP Sleeper',
    image: '/assets/simba-bus-3.webp',
    description: 'Travel overnight in ultimate comfort with our sleeper buses featuring lie-flat beds and privacy curtains.',
    features: ['Lie-flat Beds', 'Privacy Curtains', 'Blankets & Pillows', 'Premium WiFi', 'Meals Included']
  }
];

const amenities = [
  { icon: Snowflake, label: 'Air Conditioning' },
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Battery, label: 'Charging Ports' },
  { icon: Coffee, label: 'Onboard Service' }
];

const Fleet = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Seo
        title="SimbaCoach Fleet - Luxury, Executive & VIP Buses"
        description="Discover the SimbaCoach modern fleet: luxury coaches, executive class and VIP sleeper buses with free Wi-Fi, reclining seats, USB charging and onboard service across Kenya & East Africa."
        path="/fleet"
        keywords="SimbaCoach fleet, luxury bus Kenya, VIP sleeper bus, executive buses East Africa, bus amenities Kenya"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="title-display mb-4">Our Modern Fleet</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Experience the difference with our state-of-the-art buses designed for your comfort and safety
          </p>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-700">
                <amenity.icon className="w-7 h-7 text-primary-600" />
                <span className="font-semibold text-lg">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="section">
        <div className="container-wide">
          <div className="grid gap-16">
            {buses.map((bus, index) => (
              <div key={bus.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <div className="w-full lg:w-1/2">
                  <img 
                    src={bus.image} 
                    alt={bus.name} 
                    className="card-modern w-full hover:scale-[1.02] transition-all duration-300 object-cover h-80"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="title-section text-slate-900 mb-4">{bus.name}</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {bus.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {bus.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;

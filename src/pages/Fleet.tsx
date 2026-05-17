import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Battery, Coffee, Snowflake } from 'lucide-react';

const buses = [
  {
    id: 1,
    name: 'Luxury Coach',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20luxury%20white%20coach%20bus%20exterior%20studio%20lighting&image_size=landscape_4_3',
    description: 'Our standard luxury coaches offer a comfortable journey with ample legroom and air conditioning.',
    features: ['Air Conditioning', 'Reclining Seats', 'USB Charging', 'Ample Luggage Space']
  },
  {
    id: 2,
    name: 'Executive Class',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20executive%20bus%20interior%20wide%20seats%20leather%20luxury&image_size=landscape_4_3',
    description: 'Upgrade your travel experience with wider seats, extra legroom, and complimentary refreshments.',
    features: ['Extra Legroom', 'Free WiFi', 'Refreshments', 'Entertainment System', 'AC']
  },
  {
    id: 3,
    name: 'VIP Sleeper',
    image: 'https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=Luxury%20sleeper%20bus%20interior%20beds%20night%20lighting%20premium&image_size=landscape_4_3',
    description: 'Travel overnight in ultimate comfort with our sleeper buses featuring lie-flat beds and privacy curtains.',
    features: ['Lie-flat Beds', 'Privacy Curtains', 'Blankets & Pillows', 'Premium WiFi', 'Meals Included']
  }
];

const Fleet = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Our Fleet - Trinity Express Bus | Luxury & VIP Coaches</title>
        <meta name="description" content="Explore our modern fleet of luxury buses. Air-conditioned, reclining seats, free WiFi, and charging ports. Experience VIP travel across East Africa." />
        <link rel="canonical" href="https://www.trinitybusexpress.com/fleet" />
      </Helmet>
      {/* Hero */}
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Modern Fleet</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Experience the difference with our state-of-the-art buses designed for your comfort and safety.
          </p>
        </div>
      </div>

      {/* Amenities */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-3 text-gray-700">
              <Snowflake className="w-6 h-6 text-secondary" />
              <span className="font-medium">Air Conditioning</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Wifi className="w-6 h-6 text-secondary" />
              <span className="font-medium">Free WiFi</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Battery className="w-6 h-6 text-secondary" />
              <span className="font-medium">Charging Ports</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Coffee className="w-6 h-6 text-secondary" />
              <span className="font-medium">Onboard Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bus Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {buses.map((bus, index) => (
              <div key={bus.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <div className="w-full lg:w-1/2">
                  <img 
                    src={bus.image} 
                    alt={bus.name} 
                    className="rounded-2xl shadow-xl w-full hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{bus.name}</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {bus.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {bus.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
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


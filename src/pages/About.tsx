import { Shield, Clock, Users, Award, Zap, Heart, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '50+', label: 'Destinations' },
    { number: '1M+', label: 'Happy Travelers' },
    { number: '7', label: 'Countries' },
    { number: '14', label: 'Years of Service' }
  ];

  const values = [
    { icon: Shield, title: 'Uncompromised Safety', desc: 'Your safety is our top priority with rigorous maintenance and trained drivers.' },
    { icon: Heart, title: 'Customer First', desc: 'Every aspect of our service is designed with your comfort and convenience in mind.' },
    { icon: Clock, title: 'Reliable Punctuality', desc: 'We work around the clock to ensure you reach your destination on time.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-40"></div>
        <div className="container-wide text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold text-sm mb-6">
            <Zap className="w-4 h-4" />
            Established 2010
          </span>
          <h1 className="title-display text-slate-900 mb-6">
            Bridging Borders, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Connecting Hearts
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            More than just a bus service — we are the pulse of East African travel, bringing people, cultures, and communities together.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl font-extrabold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="title-section text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Trinity Express began with a simple yet ambitious vision: to transform how people move across East Africa. What started as a single route connecting Nairobi to Kampala has blossomed into a comprehensive network.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We understand that every ticket represents a story — a student returning home, a business deal in a new city, a family reunion. That's why we treat every mile with the care it deserves.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/assets/kampala.jpg" alt="Travel" className="rounded-2xl shadow-elevation-3 h-64 w-full object-cover" />
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6 rounded-2xl shadow-elevation-3">
                  <Globe className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg">7 Countries</h4>
                  <p className="text-sm opacity-90">Seamless cross-border travel</p>
                </div>
                <img src="/assets/nairobi.jpg" alt="Bus" className="rounded-2xl shadow-elevation-3 h-64 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="section-header">
            <p className="section-subtitle">Our Core Beliefs</p>
            <h2 className="title-section text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-modern hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="title-card mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="title-section mb-4">The Trinity Difference</h2>
            <p className="text-xl opacity-90">What sets us apart from the rest</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Modern Fleet', desc: 'State-of-the-art buses designed for comfort' },
              { icon: MapPin, title: 'Wide Network', desc: 'Connecting 50+ cities across East Africa' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in transport' },
              { icon: Users, title: 'Expert Crew', desc: 'Friendly staff ready to assist you' }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <item.icon className="w-10 h-10 text-primary-200 mb-4" />
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-wide text-center">
          <h2 className="title-section text-slate-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Book your ticket today and experience the Trinity Express difference
          </p>
          <Link to="/routes" className="btn-primary text-lg">
            View Our Routes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

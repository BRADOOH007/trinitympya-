import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Contact Us - Trinity Express Bus | Customer Support & Booking Offices</title>
        <meta name="description" content="Contact Trinity Express Bus support. Phone numbers for Nairobi, Kampala, and Kigali offices. Visit us at Duruma Road, Nairobi or email us for assistance." />
        <link rel="canonical" href="https://www.trinityexpressbusonlinebooking.com/contact" />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center bg-[#1E3A8A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1920&auto=format&fit=crop"
            alt="Customer Support"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#1E3A8A]/80 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100">
            We're here to help you 24/7. Reach out to us for bookings, inquiries, or support.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-500 mb-4">Available 24/7 for booking support</p>
            <div className="space-y-1">
              <p className="text-gray-900 font-medium">+254 751 494564 (Nairobi)</p>
              <p className="text-gray-900 font-medium">+256 747 180552 (Kampala)</p>
              <p className="text-gray-900 font-medium">+250 735 589845 (Kigali)</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-16 h-16 bg-orange-50 text-[#F97316] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-500 mb-4">We usually reply within 2 hours</p>
            <div className="space-y-1">
              <a href="mailto:info@trinityexpress.com" className="block text-[#1E88E5] font-medium hover:underline">info@trinityexpress.com</a>
              <a href="mailto:support@trinityexpress.com" className="block text-[#1E88E5] font-medium hover:underline">support@trinityexpress.com</a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center group">
            <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Main Offices</h3>
            <p className="text-gray-500 mb-4">Visit us for in-person booking</p>
            <div className="space-y-1 text-gray-900 font-medium">
              <p>Duruma Road, Nairobi</p>
              <p>Namirembe Road, Bakuli, Kampala</p>
              <p>Nyabugogo Bus Park, Kigali</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Contact Form */}
          <div className="p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you shortly.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Booking Issue</option>
                  <option>Feedback</option>
                  <option>Partnership</option>
                  <option>Lost & Found</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none resize-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-gray-100 h-[500px] lg:h-auto relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819917806043!2d36.82194631475403!3d-1.2816049990652614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x2b8e3848f9361656!2sRiver%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1629789123456!5m2!1sen!2ske" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-[#1E3A8A]">
              <h4 className="font-bold text-gray-900 mb-2">Headquarters</h4>
              <p className="text-gray-600 text-sm mb-3">Trinity Express House, River Road, Nairobi</p>
              <div className="flex items-center text-sm text-[#1E88E5] font-medium">
                <Clock className="w-4 h-4 mr-2" />
                <span>Open Mon-Sat: 6:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

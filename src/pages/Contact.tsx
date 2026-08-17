import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="title-display mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We're here to help you with all your travel needs. Reach out to us anytime!
          </p>
        </div>
      </section>

      <div className="container-wide -mt-10 pb-20">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card-modern text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="title-card mb-4">Call Us</h3>
            <div className="space-y-2 text-slate-600">
              <p className="font-medium">+254 781 346337 (Nairobi)</p>
              <p className="font-medium">+254 735 893829 (Nairobi)</p>
            </div>
          </div>

          <div className="card-modern text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="title-card mb-4">WhatsApp Us</h3>
            <div className="space-y-2">
              <a href="https://wa.me/254735893829" className="text-slate-600 hover:text-green-600 font-medium">+254 735 893829</a>
            </div>
          </div>

          <div className="card-modern text-center">
            <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="title-card mb-4">Email Us</h3>
            <div className="space-y-2">
              <a href="mailto:info@simbacoach.com" className="text-slate-600 hover:text-primary-600 font-medium">info@simbacoach.com</a>
              <a href="mailto:info@simbacoach.co.ke" className="text-slate-600 hover:text-primary-600 font-medium">info@simbacoach.co.ke</a>
            </div>
          </div>

          <div className="card-modern text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="title-card mb-4">Visit Us</h3>
            <div className="space-y-2 text-slate-600">
              <p className="font-medium">Nairobi, Kenya</p>
              <p className="font-medium">Kampala, Uganda</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-elevated p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-slate-600 mb-8">Have questions? We're here to help!</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="booking">Booking Help</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-slate-200 rounded-2xl overflow-hidden h-full min-h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819917806043!2d36.82194631475403!3d-1.2816049990652614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x2b8e3848f9361656!2sRiver%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1629789123456!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-elevation-3 border-l-4 border-primary-600">
              <h4 className="font-bold text-slate-900 mb-2">Our Office</h4>
              <p className="text-slate-600 text-sm mb-3">SimbaCoach Office, Nairobi</p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Open daily from 6:00 AM to 10:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

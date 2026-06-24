import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white p-1">
                <img
                  src={logo}
                  alt="Trinity Express"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Trinity</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em]">Express</span>
              </div>
            </div>

            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Connecting East Africa with safe, comfortable, and reliable bus travel.
              Your journey starts with us.
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 bg-slate-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-slate-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/routes" className="text-slate-400 hover:text-primary-400 transition-colors">Our Routes</Link></li>
              <li><Link to="/fleet" className="text-slate-400 hover:text-primary-400 transition-colors">Our Fleet</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Nairobi, Kenya<br />
                  Kampala, Uganda
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  +256 747 180552<br />
                  +254 755 356109<br />
                  +254 751 115139
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-slate-400">info@trinityexpress.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Trinity Express. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Printer, LifeBuoy } from 'lucide-react';
import logo from '../../assets/logo.webp';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const { contactInfo } = useAdmin();
  const whatsapp = contactInfo?.whatsapp?.replace(/[^0-9]/g, '') || '254735893829';
  const phone = contactInfo?.phoneKE || '+254 781 346 337';
  const email = contactInfo?.email || 'info@simbacoach.com';

  return (
    <footer className="w-full bg-[#1a1a1a] text-white text-center pt-12 pb-28 px-5 border-t border-white/5">
      <div className="flex flex-col items-center mb-6 gap-4">
        <div className="flex items-center justify-center">
          <img src={logo} alt="SimbaCoach" className="h-auto w-32 max-w-full object-contain rounded-sm" />
        </div>
        <div className="text-2xl font-black tracking-tight text-white mt-1">SimbaCoach</div>
      </div>
      <div className="mb-10 w-full max-w-sm mx-auto">
        <h4 className="mb-5 text-sm font-medium">Contact Us</h4>
        <div className="flex flex-col items-center gap-2 text-sm text-gray-300">
          <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4" /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4" /> {email}
          </a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="max-w-xs mx-auto h-px bg-gray-700/50 mb-8" />
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-300 mb-10 font-medium">
        <Link to="/about" className="hover:text-white transition-colors">About</Link>
        <Link to="/print-ticket" className="hover:text-white transition-colors">Print Ticket</Link>
        <Link to="/help" className="hover:text-white transition-colors">Get In Touch</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
      </div>
      <div className="flex justify-center gap-8">
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-gray-400 transition-colors">
          <MessageCircle className="w-6 h-6 text-[#00a859]" />
        </a>
        <a href={`mailto:${email}`} className="hover:text-gray-400 transition-colors">
          <Mail className="w-6 h-6" />
        </a>
        <Link to="/help" className="hover:text-gray-400 transition-colors">
          <LifeBuoy className="w-6 h-6" />
        </Link>
      </div>
      <div className="pt-8 px-3.5 text-[10px] text-gray-500 leading-relaxed border-t border-gray-800/40 max-w-xs mx-auto mt-8">
        <p>© {new Date().getFullYear()} SimbaCoach Online Ticket Booking. All rights reserved.</p>
        <p className="mt-1">Connect with {<Printer className="inline w-3 h-3" />} via the Print Ticket page to retrieve boarding passes.</p>
      </div>
    </footer>
  );
};

export default Footer;

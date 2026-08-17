import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="card-modern">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-slate-700">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h3>
                <p>SimbaCoach Bus ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Data We Collect</h3>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                  <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Data</h3>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>To process your booking request.</li>
                  <li>To manage our relationship with you.</li>
                  <li>To improve our website, products/services, marketing or customer relationships.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">4. Data Security</h3>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">5. Contact Us</h3>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@simbacoach.com" className="text-primary-600 hover:underline font-medium">info@simbacoach.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

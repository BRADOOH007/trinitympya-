import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors font-medium mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="card-modern">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Terms and Conditions</h1>
            <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-slate-700">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h3>
                <p>By accessing our website and booking a ticket, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Booking & Payments</h3>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>All bookings are subject to availability.</li>
                  <li>Prices are subject to change without prior notice.</li>
                  <li>Payment must be made in full to confirm a reservation.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Cancellations & Refunds</h3>
                <p>Cancellations made 24 hours prior to departure may be eligible for a partial refund or rescheduling, subject to our discretion and administrative fees.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">4. Luggage Policy</h3>
                <p>Each passenger is allowed one main bag (up to 20kg) and one small carry-on bag. Excess luggage will be charged separately.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">5. Passenger Conduct</h3>
                <p>We reserve the right to refuse carriage to any person who conducts themselves in a disorderly, threatening, or abusive manner.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h3>
                <p>SimbaCoach Bus shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-3">7. Contact Us</h3>
                <p>For any questions about these Terms and Conditions, please contact us at: <a href="mailto:info@simbacoach.com" className="text-primary-600 hover:underline font-medium">info@simbacoach.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

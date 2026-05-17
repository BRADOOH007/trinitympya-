import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Helmet>
        <title>Terms & Conditions - Trinity Express Bus</title>
        <meta name="description" content="Terms and Conditions for booking with Trinity Express Bus." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Agreement to Terms</h3>
            <p>By accessing our website and booking a ticket, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.</p>
            
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Booking & Payments</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>All bookings are subject to availability.</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>Payment must be made in full to confirm a reservation.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Cancellations & Refunds</h3>
            <p>Cancellations made 24 hours prior to departure may be eligible for a partial refund or rescheduling, subject to our discretion and administrative fees.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Luggage Policy</h3>
            <p>Each passenger is allowed one main bag (up to 20kg) and one small carry-on bag. Excess luggage will be charged separately.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. Passenger Conduct</h3>
            <p>We reserve the right to refuse carriage to any person who conducts themselves in a disorderly, threatening, or abusive manner.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">6. Limitation of Liability</h3>
            <p>Trinity Express Bus shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;


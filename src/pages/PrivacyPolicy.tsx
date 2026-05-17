import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Helmet>
        <title>Privacy Policy - Trinity Express Bus</title>
        <meta name="description" content="Privacy Policy for Trinity Express Bus online booking platform." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Introduction</h3>
            <p>Trinity Express Bus ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Data We Collect</h3>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. How We Use Your Data</h3>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>To process your booking request.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing or customer relationships.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Data Security</h3>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. Contact Us</h3>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@trinitybusexpress.com" className="text-blue-600 hover:underline">info@trinitybusexpress.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


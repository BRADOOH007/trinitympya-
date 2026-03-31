import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './layouts/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import RoutesPage from './pages/Routes';
import About from './pages/About';
import Contact from './pages/Contact';
import Fleet from './pages/Fleet';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="fleet" element={<Fleet />} />
              <Route path="login" element={<Login />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </HelmetProvider>
  );
}

export default App;

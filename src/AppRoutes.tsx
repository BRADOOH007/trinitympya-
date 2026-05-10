import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import NairobiKampala from './pages/routes/NairobiKampala';
import NairobiKigali from './pages/routes/NairobiKigali';
import NairobiJuba from './pages/routes/NairobiJuba';
import NairobiDarEsSalaam from './pages/routes/NairobiDarEsSalaam';
import NairobiKampalaTravelGuide from './pages/blog/NairobiKampalaTravelGuide';
import NairobiKigaliTravelGuide from './pages/blog/NairobiKigaliTravelGuide';
import NairobiJubaTravelGuide from './pages/blog/NairobiJubaTravelGuide';
import NairobiDarEsSalaamTravelGuide from './pages/blog/NairobiDarEsSalaamTravelGuide';
import KisumuKampalaTravelGuide from './pages/blog/KisumuKampalaTravelGuide';
import KisumuKigaliTravelGuide from './pages/blog/KisumuKigaliTravelGuide';
import EldoretKampalaTravelGuide from './pages/blog/EldoretKampalaTravelGuide';
import EldoretKigaliTravelGuide from './pages/blog/EldoretKigaliTravelGuide';
import NakuruKampalaTravelGuide from './pages/blog/NakuruKampalaTravelGuide';
import TrinityExpressReview from './pages/blog/TrinityExpressReview';

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="routes/nairobi-kampala" element={<NairobiKampala />} />
          <Route path="routes/nairobi-kigali" element={<NairobiKigali />} />
          <Route path="routes/nairobi-juba" element={<NairobiJuba />} />
          <Route path="routes/nairobi-dar-es-salaam" element={<NairobiDarEsSalaam />} />
          <Route path="blog/nairobi-to-kampala-bus-travel-guide" element={<NairobiKampalaTravelGuide />} />
          <Route path="blog/nairobi-to-kigali-bus-travel-guide" element={<NairobiKigaliTravelGuide />} />
          <Route path="blog/nairobi-to-juba-bus-travel-guide" element={<NairobiJubaTravelGuide />} />
          <Route path="blog/nairobi-to-dar-es-salaam-bus-travel-guide" element={<NairobiDarEsSalaamTravelGuide />} />
          <Route path="blog/kisumu-to-kampala-bus-travel-guide" element={<KisumuKampalaTravelGuide />} />
          <Route path="blog/kisumu-to-kigali-bus-travel-guide" element={<KisumuKigaliTravelGuide />} />
          <Route path="blog/eldoret-to-kampala-bus-travel-guide" element={<EldoretKampalaTravelGuide />} />
          <Route path="blog/eldoret-to-kigali-bus-travel-guide" element={<EldoretKigaliTravelGuide />} />
          <Route path="blog/nakuru-to-kampala-bus-travel-guide" element={<NakuruKampalaTravelGuide />} />
          <Route path="blog/trinity-express-bus-review" element={<TrinityExpressReview />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="login" element={<Login />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;

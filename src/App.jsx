import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import Collection from './pages/public/Collection';
import ProductDetail from './pages/public/ProductDetail';
import Gallery from './pages/public/Gallery';
import Visit from './pages/public/Visit';
import FAQ from './pages/public/FAQ';
import {
  Contact,
  Testimonials,
  Aftercare,
  Events,
  Policies,
  NotFound,
} from './pages/public/SimplePages';

// Studio pages
import StudioSales from './pages/studio/StudioSales';
import Receipt from './pages/studio/Receipt';
import StudioHistory from './pages/studio/StudioHistory';

// Admin pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminInventory from './pages/admin/AdminInventory';
import AdminSales from './pages/admin/AdminSales';
import AdminSettings from './pages/admin/AdminSettings';

import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:slug" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/aftercare" element={<Aftercare />} />
        <Route path="/events" element={<Events />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/studio" element={<StudioSales />} />
        <Route path="/studio/receipt" element={<Receipt />} />
        <Route path="/studio/history" element={<StudioHistory />} />
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

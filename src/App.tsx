import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const Services = lazy(() => import('./pages/Services/Services'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));
const Work = lazy(() => import('./pages/Work/Work'));
const CaseStudyDetail = lazy(() => import('./pages/Work/CaseStudyDetail'));
const Process = lazy(() => import('./pages/Process/Process'));
const About = lazy(() => import('./pages/About/About'));
const Products = lazy(() => import('./pages/Products/Products'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

import { ToastProvider } from './lib/ToastContext';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <ReactLenis root options={{ lerp: 0.07, syncTouch: true }}>
        <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-bg text-text-primary selection:bg-accent-cyan/30 selection:text-white flex flex-col font-body">
          <Navbar />
          
          <main className="flex-1 relative z-10 w-full flex flex-col">
            <Suspense fallback={<div className="h-screen w-full bg-bg flex items-center justify-center text-accent-amber font-code">INITIALIZING...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<CaseStudyDetail />} />
                <Route path="/process" element={<Process />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
        </BrowserRouter>
      </ToastProvider>
    </ReactLenis>
  </HelmetProvider>
  );
}

export default App;

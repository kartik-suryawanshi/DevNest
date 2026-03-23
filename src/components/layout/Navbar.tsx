import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useState(() => {
    setIsOpen(false);
  });

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-8 py-4 bg-bg/80 backdrop-blur-md border-b border-border">
        <Link to="/" className="text-3xl md:text-4xl font-display font-extrabold flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="text-accent-cyan">{'{ }'}</span> DevNest
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 md:gap-8 font-subheading text-xl md:text-2xl tracking-wide">
          <Link to="/services" className="hover:text-accent-cyan transition-colors">Services</Link>
          <Link to="/work" className="hover:text-accent-cyan transition-colors">Work</Link>
          <Link to="/process" className="hover:text-accent-cyan transition-colors">Process</Link>
          <Link to="/products" className="hover:text-accent-cyan transition-colors">Products</Link>
          <Link to="/about" className="hover:text-accent-cyan transition-colors">About</Link>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link to="/contact" className="px-6 py-2 bg-accent-amber text-bg font-subheading tracking-wider text-lg md:text-xl rounded-sm hover:scale-105 transition-transform flex items-center gap-2">
            Start Your Project &rarr;
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 bg-surface border border-border rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-screen bg-bg/95 backdrop-blur-3xl z-[90] flex flex-col items-center justify-center gap-8 font-display text-4xl"
          >
            <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-accent-cyan transition-colors">Services</Link>
            <Link to="/work" onClick={() => setIsOpen(false)} className="hover:text-accent-cyan transition-colors">Work</Link>
            <Link to="/process" onClick={() => setIsOpen(false)} className="hover:text-accent-cyan transition-colors">Process</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-accent-cyan transition-colors">Products</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-accent-cyan transition-colors">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-8 px-8 py-4 bg-accent-amber text-bg font-subheading tracking-wider rounded-sm text-3xl flex items-center gap-2">
              Start Your Project &rarr;
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

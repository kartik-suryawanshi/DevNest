import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SERVICES = [
  { id: 'app-dev', num: '01', name: 'App Development', desc: 'Cross-platform native experiences built for retention.' },
  { id: 'web-dev', num: '02', name: 'Web Development', desc: 'High-performance React/Next.js architectures.' },
  { id: 'automation', num: '03', name: 'Business Automation', desc: 'Replace manual effort with intelligent systems.' },
  { id: 'marketing', num: '04', name: 'Digital Marketing', desc: 'Campaigns that reach your people, every time.' },
  { id: 'branding', num: '05', name: 'Identity & Branding', desc: 'A brand presence that commands authority.' },
  { id: 'portfolio', num: '06', name: 'Professional Portfolios', desc: 'Showcase your work with WebGL brilliance.' },
];

export default function ServicesGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full bg-bg py-32 relative z-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Monospace Section Label */}
        <div className="font-code text-accent-amber text-sm mb-16 tracking-widest flex items-center gap-4">
          <span>// 01</span>
          <span>SERVICES</span>
        </div>

        <div className="border-t border-border flex flex-col">
          {SERVICES.map((svc, i) => (
            <motion.div 
              key={svc.id}
              className="group border-b border-border relative overflow-hidden"
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
            >
              {/* Hover Glow Behind */}
              <div 
                className={`absolute inset-0 bg-accent-cyan/5 transition-opacity duration-500 ${hoveredIdx === i ? 'opacity-100' : 'opacity-0'}`} 
              />

              <div className="relative px-8 py-12 flex flex-col justify-center transition-all duration-500 min-h-[140px]">
                
                {/* Default State Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 w-full">
                  <div className="font-display text-6xl md:text-8xl text-accent-cyan/10 group-hover:text-accent-cyan/30 transition-colors font-bold z-10 w-24">
                    {svc.num}
                  </div>
                  
                  <div className="flex-1 flex items-center gap-6">
                    {/* Live indicator dot appears on hover */}
                    <div className="w-4 h-4 rounded-full bg-transparent flex items-center justify-center relative transition-all z-10">
                       <span className={`absolute w-3 h-3 rounded-full bg-accent-amber transition-all duration-300 ${hoveredIdx === i ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                       <span className={`absolute w-3 h-3 rounded-full bg-accent-amber animate-ping transition-all duration-300 ${hoveredIdx === i ? 'opacity-50' : 'opacity-0'}`} />
                    </div>
                    
                    <h2 className="font-display text-5xl md:text-7xl text-white group-hover:text-accent-cyan transition-colors z-10">
                      {svc.name}
                    </h2>
                  </div>
                </div>

                {/* Expanding Content */}
                <AnimatePresence>
                  {hoveredIdx === i && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="origin-top flex flex-col md:flex-row md:items-center justify-between gap-8 md:ml-40 pr-8"
                    >
                      <p className="font-body text-xl text-text-muted">
                        {svc.desc}
                      </p>
                      
                      <Link 
                        to={`/services/${svc.id}`}
                        className="font-code text-bg bg-accent-amber px-6 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors flex items-center gap-3 shrink-0"
                      >
                        Initiate Protocol <span>&rarr;</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

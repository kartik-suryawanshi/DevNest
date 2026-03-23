import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    id: 'nest-ui',
    name: 'NestUI',
    desc: 'Component library for DevNest ecosystem',
    tags: ['React', 'Tailwind', 'Storybook'],
    status: 'LIVE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    )
  },
  {
    id: 'nest-auth',
    name: 'NestAuth',
    desc: 'Drop-in authentication for modern apps',
    tags: ['Next.js', 'JWT', 'OAuth'],
    status: 'LIVE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    id: 'nest-deploy',
    name: 'NestDeploy',
    desc: 'One-command cloud deployment pipeline',
    tags: ['Docker', 'CI/CD', 'AWS'],
    status: 'LIVE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2L21 5c0 0-3-3-3-3L4.5 16.5z" />
        <path d="M12 15l-3-3" />
        <path d="M15 12l2.5-2.5" />
      </svg>
    )
  },
  {
    id: 'nest-db',
    name: 'NestDB',
    desc: 'Managed database layer with instant APIs',
    tags: ['Postgres', 'REST', 'GraphQL'],
    status: 'COMING SOON',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  },
  {
    id: 'nest-analytics',
    name: 'NestAnalytics',
    desc: 'Privacy-first product analytics dashboard',
    tags: ['React', 'ClickHouse', 'SDK'],
    status: 'COMING SOON',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    )
  },
];

export default function ProductsEcosystem() {
  return (
    <section className="w-full bg-bg py-24 relative overflow-hidden flex flex-col items-center border-y border-border">
      
      {/* Background tracking glow */}
      <div className="absolute inset-0 mix-blend-screen opacity-10 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-start">
        
        {/* Section Label */}
        <div className="w-full font-code text-accent-amber text-sm tracking-widest flex items-center gap-4 mb-16">
          <span>// 05</span>
          <span>ECOSYSTEM_REGISTRY</span>
        </div>

        {/* Section Headers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 w-full border-b border-border pb-8 gap-8"
        >
          <div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none drop-shadow-2xl">
              BUILT UNDER<br/>
              <span className="text-accent-cyan">ONE ORBIT.</span>
            </h2>
          </div>
          <p className="font-body text-text-muted text-sm md:text-base tracking-wide max-w-xs md:text-right">
            Independent products. One organization. All connected to the core grid.
          </p>
        </motion.div>

        {/* Registry Table List */}
        <div className="w-full flex flex-col">
           {/* Table Header (Hidden on mobile) */}
           <div className="hidden md:grid grid-cols-12 gap-8 py-4 border-b border-border/50 font-code text-[10px] tracking-widest text-text-muted uppercase">
              <div className="col-span-3 lg:col-span-3">System Node</div>
              <div className="col-span-4 lg:col-span-4">Operational Parameters</div>
              <div className="col-span-4 lg:col-span-4">Stack Configuration</div>
              <div className="col-span-1 lg:col-span-1 text-right">Access</div>
           </div>

           {/* Table Rows */}
           {PRODUCTS.map((p, i) => (
             <motion.a 
               href="#" 
               key={p.id}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: '-50px' }}
               transition={{ delay: i * 0.1, duration: 0.5 }}
               className="group flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center p-6 md:p-0 md:py-8 border border-border/30 md:border-x-transparent md:border-t-transparent hover:bg-surface/30 md:bg-transparent bg-surface/20 transition-all duration-300 rounded-xl md:rounded-lg cursor-pointer mb-4 md:mb-0"
             >
                {/* Col 1: Status & Icon (Mobile Top Row with Arrow) */}
                <div className="w-full md:w-auto md:col-span-3 flex justify-between items-start md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-accent-cyan/10 group-hover:border-accent-cyan/50 group-hover:bg-accent-cyan/10 transition-all text-accent-cyan shrink-0">
                      {p.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-xl md:text-2xl text-white uppercase tracking-wider leading-none">{p.name}</h3>
                      <div className="flex items-center gap-2">
                         <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'LIVE' ? 'bg-[#28C840] animate-pulse' : 'bg-accent-amber opacity-50'}`} />
                         <span className={`font-code text-[10px] tracking-widest uppercase ${p.status === 'LIVE' ? 'text-[#28C840]' : 'text-accent-amber/50'}`}>
                           {p.status}
                         </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Action Arrow (Hidden on Desktop) */}
                  <div className="md:hidden flex items-center justify-center text-accent-cyan opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-2">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <line x1="5" y1="12" x2="19" y2="12"></line>
                       <polyline points="12 5 19 12 12 19"></polyline>
                     </svg>
                  </div>
                </div>

                {/* Col 2: Desc */}
                <div className="w-full md:col-span-4 pl-16 md:pl-0 mt-2 md:mt-0">
                   <p className="font-body text-sm text-text-muted group-hover:text-white/80 transition-colors">
                     {p.desc}
                   </p>
                </div>

                {/* Col 3: Tech */}
                <div className="w-full md:col-span-4 flex flex-wrap gap-2 pl-16 md:pl-0 mt-2 md:mt-0">
                   {p.tags.map(t => (
                     <span key={t} className="font-code text-[10px] text-accent-cyan/70 border border-accent-cyan/10 bg-accent-cyan/5 px-2 py-1 rounded-sm group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors">
                       {t}
                     </span>
                   ))}
                </div>

                {/* Col 4: Action (Desktop Only) */}
                <div className="hidden md:flex col-span-1 justify-end text-accent-cyan opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                     <polyline points="12 5 19 12 12 19"></polyline>
                   </svg>
                </div>
             </motion.a>
           ))}
        </div>

        {/* Closing Footer Text */}
        <div className="w-full text-center mt-20">
          <p className="font-code text-sm text-text-muted">
            {'>'} More products in development — join the ecosystem at <span className="text-white hover:text-accent-cyan transition-colors border-b border-accent-cyan/30 hover:border-accent-cyan pb-0.5 cursor-pointer">devnest.app/products</span>
            <motion.span 
              className="inline-block w-2.5 h-4 bg-accent-amber align-middle ml-2"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
          </p>
        </div>

      </div>
    </section>
  );
}

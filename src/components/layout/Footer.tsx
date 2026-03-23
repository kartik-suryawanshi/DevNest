import { Link } from 'react-router-dom';

export default function Footer() {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-bg pt-24 pb-8 px-4 md:px-12 border-t border-border overflow-hidden z-20">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-accent-cyan opacity-10 blur-[150px] pointer-events-none rounded-t-full z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-24 md:gap-32">
        
        {/* Top Section / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          
          {/* Brand & Status */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
             <div className="flex items-center gap-4">
                <span className="text-accent-cyan font-bold text-2xl md:text-3xl">{'{ }'}</span>
                <span className="font-display text-4xl md:text-5xl text-white tracking-widest">DEVNEST</span>
             </div>
             <p className="font-code text-text-muted text-sm max-w-sm leading-relaxed">
               Architecting digital realities. We don't just build software, we engineer distinct technological advantages for forward-thinking brands.
             </p>
             <div className="flex items-center gap-3 mt-4">
               <div className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28C840] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#28C840]"></span>
               </div>
               <span className="font-code text-xs tracking-widest text-[#28C840] uppercase">Systems Operational</span>
             </div>
          </div>

          {/* Navigation Matrix */}
          <div className="flex flex-col gap-4 font-code text-sm">
             <span className="text-text-muted mb-4 tracking-widest uppercase text-xs">Navigation_Matrix</span>
             {['Services', 'Work', 'Process', 'About'].map(item => (
               <Link key={item} to={`/${item.toLowerCase()}`} className="text-white hover:text-accent-amber transition-colors w-fit group flex items-center gap-2">
                 <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent-cyan">{'>'}</span>
                 {item}
               </Link>
             ))}
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-4 font-code text-sm">
             <span className="text-text-muted mb-4 tracking-widest uppercase text-xs">External_Nodes</span>
             {['Twitter / X', 'LinkedIn', 'Instagram', 'GitHub'].map(item => (
               <a key={item} href="#" className="text-white hover:text-accent-amber transition-colors w-fit group flex items-center gap-2">
                 <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent-cyan">{'>'}</span>
                 {item}
               </a>
             ))}
          </div>
        </div>

        {/* Huge Bottom Typography */}
        <div className="w-full flex flex-col items-center border-t border-border/50 pt-12 md:pt-16">
           <h1 className="font-display text-[22vw] md:text-[18vw] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 select-none text-center w-full">
             DEVNEST
           </h1>
           <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 font-code text-[10px] md:text-xs text-text-muted gap-4 md:gap-0">
             <span>© {CURRENT_YEAR} DEVNEST STUDIO. ALL RIGHTS RESERVED.</span>
             <span className="md:ml-auto md:mr-8">PUNE, INDIA // GLOBAL REACH</span>
             <a href="#" className="hover:text-accent-cyan transition-colors">PRIVACY POLICY</a>
           </div>
        </div>

      </div>
    </footer>
  );
}

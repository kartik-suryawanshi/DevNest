import { motion } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition';

// Framer Motion Typewriter utility

const letterVariant = {
  hidden: { opacity: 0, display: 'none' },
  visible: { opacity: 1, display: 'inline' }
};

function TypewriterText({ text, delay = 0, className = "" }: { text: string; delay?: number, className?: string }) {
  return (
    <motion.span 
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.015, delayChildren: delay } }
      }} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {text.split('').map((char, i) => (
         <motion.span key={`${char}-${i}`} variants={letterVariant}>
            {char}
         </motion.span>
      ))}
    </motion.span>
  );
}

const STAT_LINES = [
  "user@devnest:~$ ./aggregate_stats.sh",
  "[OK] Connection established.",
  "Fetching historical logs...",
  "========================================",
  "AGENCY_UPTIME.......: 1.4 Years",
  "PROJECTS_DEPLOYED...: 42",
  "CLIENT_RETENTION....: 98.5%",
  "LINES_OF_CODE.......: 1,204,500+",
  "COFFEE_CONSUMED.....: ERR_OVERFLOW",
  "========================================",
  "Status: Operational and Scaling."
];

const TEAM = [
  { flag: '--founder', name: 'Kartik', role: 'Architect & Director' },
  { flag: '--design', name: 'Purvesh', role: 'UX/UI Alchemist' },
  { flag: '--engineer', name: 'Aniket', role: 'Core Logic Developer' }
];

export default function About() {
  return (
    <PageTransition>
      <div className="bg-bg min-h-screen pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-8 relative">
          
          <div className="font-code text-accent-amber text-sm tracking-widest flex items-center gap-4 mb-32">
            <span>// 04</span>
            <span>ABOUT_SYS</span>
          </div>

          {/* Split Layout */}
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-16 md:gap-32 items-center mb-48">
             
             {/* Left: Terminal Window */}
             <div className="bg-surface border border-border rounded-lg overflow-hidden font-code text-[10px] md:text-sm shadow-[0_0_30px_rgba(0,229,255,0.05)]">
               
               {/* Terminal Bar */}
               <div className="bg-[#1A1F2B] px-4 py-3 flex items-center gap-2 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-accent-amber/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 text-text-muted text-xs">root@devnest-core:~</div>
               </div>

               {/* Terminal Output */}
               <div className="p-6 md:p-8 flex flex-col gap-2 text-accent-cyan min-h-[300px]">
                 {STAT_LINES.map((line, i) => (
                   <TypewriterText key={i} text={line} delay={i * 0.3} />
                 ))}
                 <motion.div 
                   animate={{ opacity: [1, 0, 1] }} 
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="w-3 h-5 bg-accent-amber inline-block mt-4" 
                 />
               </div>

             </div>

             {/* Right: Sharp Statement */}
             <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-4xl md:text-7xl lg:text-[6vw] leading-[0.9] text-white uppercase"
                >
                  We refuse to build <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-amber to-accent-cyan">
                    mediocre software.
                  </span>
                </motion.h2>
             </div>

          </div>

          {/* Team Members */}
          <div className="border-t border-border pt-32">
             <h3 className="font-code text-text-muted text-sm tracking-widest mb-16 uppercase">
               SYSTEM_OPERATORS
             </h3>
             <div className="flex flex-col gap-8 font-code text-sm md:text-2xl text-white">
                {TEAM.map((t, i) => (
                  <div key={t.name} className="flex gap-4 group">
                     <span className="text-accent-amber">{'>'}</span>
                     <TypewriterText text={`./team ${t.flag}="${t.name}" --role="${t.role}"`} delay={0.5 + (i * 0.4)} />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PHASES = [
  { step: '01', name: 'DISCOVERY', desc: 'Audit, telemetry, and exact scope mapping.' },
  { step: '02', name: 'BLUEPRINT', desc: 'Architecture, UX flows, and performance budgets.' },
  { step: '03', name: 'DEVELOPMENT', desc: 'React/Next.js implementation with native Canvas.' },
  { step: '04', name: 'LAUNCH', desc: 'Zero-downtime deployment and global CDN propagation.' },
  { step: '05', name: 'GROWTH', desc: 'Post-launch marketing and SEO escalation.' },
];

function StepNode({ phase, index, scrollYProgress }: { phase: any, index: number, scrollYProgress: any }) {
  // Reveal when line passes
  const thresholdStart = index * 0.2;
  const thresholdActive = (index + 0.5) * 0.2;
  const thresholdEnd = (index + 1) * 0.2;

  const opacity = useTransform(scrollYProgress, 
    [thresholdStart - 0.1, thresholdStart, thresholdActive, thresholdEnd, 1], 
    [0.1, 0.3, 1, 0.3, 0.3] // Past steps dim to 30%, active glows, future is 10%
  );
  
  const scale = useTransform(scrollYProgress,
    [thresholdStart - 0.1, thresholdStart, thresholdActive, thresholdEnd],
    [0.9, 0.95, 1, 0.95]
  );
  
  const xOffset = useTransform(scrollYProgress,
    [thresholdStart - 0.1, thresholdActive],
    [40, 0] // Slide in effect
  );

  return (
    <motion.div 
      style={{ opacity, scale, x: xOffset }}
      className="relative flex items-center justify-start min-h-[30vh] w-full pl-16 md:pl-32"
    >
      <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-bg border-4 border-accent-cyan rounded-full z-10 hidden md:flex items-center justify-center">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [thresholdStart, thresholdActive], [0, 1]) }}
          className="w-4 h-4 rounded-full bg-accent-amber"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-display text-7xl md:text-[10rem] text-accent-cyan/10 leading-none">
          {phase.step}
        </span>
        <div className="-mt-8 md:-mt-16 ml-4 md:ml-12 relative z-20">
          <h3 className="font-display text-5xl md:text-8xl text-accent-cyan tracking-wide mb-2">
            {phase.name}
          </h3>
          <p className="font-code text-text-primary text-sm md:text-xl uppercase tracking-widest max-w-xl">
            {phase.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TheNestMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="bg-bg py-32 relative overflow-hidden text-text-primary border-b border-border">
      
      {/* Section Label */}
      <div className="max-w-7xl mx-auto px-8 w-full mb-32 relative z-20">
        <div className="font-code text-accent-amber text-sm tracking-widest flex items-center gap-4">
          <span>// 03</span>
          <span>PROCESS</span>
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-8 relative flex">
        
        {/* SVG Drawing Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-accent-cyan/10">
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="w-full h-full bg-accent-cyan shadow-[0_0_20px_rgba(0,229,255,0.8)]"
          />
        </div>

        <div className="flex flex-col w-full relative z-10">
          {PHASES.map((p, i) => (
            <StepNode key={p.step} phase={p} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  );
}

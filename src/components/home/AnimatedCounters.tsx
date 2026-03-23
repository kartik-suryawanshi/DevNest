import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Hatched' },
  { value: 100, suffix: '%', label: 'On-Time Delivery' },
  { value: 3, suffix: '×', label: 'Average Client Growth' },
  { value: 6, suffix: '', label: 'Services, 1 Studio' },
];

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2 });
      return animation.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function AnimatedCounters() {
  return (
    <section className="relative w-full py-32 bg-[#000] overflow-hidden">
      {/* Constellation Background logic (simplified via CSS radial for now) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,210,255,0.05)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="text-5xl md:text-7xl font-display font-extrabold text-accent-cyan mb-2 flex">
              <AnimatedNumber value={stat.value} />
              <span>{stat.suffix}</span>
            </div>
            <div className="text-text-muted font-subheading uppercase tracking-widest text-sm text-balance">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

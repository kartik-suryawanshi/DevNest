import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';

const PROJECTS = [
  { id: 'ananya-fitness', title: 'Ananya Fitness', suffix: 'Studio', tech: ['Next.js', 'Tailwind', 'Stripe', 'Meta Ads'], color: '#1A0B2E', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80' },
  { id: 'rohans-bakery', title: 'Rohan\'s Artisan', suffix: 'Bakery', tech: ['React Native', 'Node.js', 'AWS', 'WebSockets'], color: '#2E1A0B', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80' },
  { id: 'tech-corp', title: 'TechCorp Auto', suffix: 'Systems', tech: ['Go', 'PostgreSQL', 'Docker', 'React'], color: '#0B2E1A', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80' },
  { id: 'creative-brand', title: 'Studio Aesthet', suffix: 'Agency', tech: ['Three.js', 'GSAP', 'WebGL', 'Framer'], color: '#0B1A2E', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80' },
];

function ProjectSection({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Wipe in effect
  const clipPath = useTransform(scrollYProgress, [0.2, 0.5], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div ref={ref} className="h-screen w-full relative overflow-hidden flex items-center justify-center sticky top-0" style={{ zIndex: index }}>
      
      {/* Wipe-in Image Background */}
      <motion.div 
        style={{ 
          clipPath, 
          backgroundImage: `linear-gradient(rgba(8, 10, 15, 0.7), rgba(8, 10, 15, 0.8)), url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        className="absolute inset-0 z-0" 
      />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 mix-blend-overlay opacity-50 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.2)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* Section Label */}
        <div className="absolute top-12 left-8 md:top-32 md:left-24 font-code text-accent-amber text-sm tracking-widest flex items-center gap-4">
          <span>// 02/0{index + 1}</span>
          <span>{project.id.toUpperCase()}</span>
        </div>

        {/* Massive Watermark Title behind */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10"
        >
          <h2 className="font-display text-[15vw] leading-none text-white whitespace-nowrap opacity-50">
            {project.title.toUpperCase()}
          </h2>
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-20 text-center flex flex-col items-center mt-32">
          <h3 className="font-display text-5xl md:text-9xl text-white mb-2 leading-none uppercase">
            {project.title} <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent-cyan to-accent-amber">{project.suffix}</span>
          </h3>
          
          <div className="flex flex-wrap gap-4 mt-12 justify-center mb-16">
            {project.tech.map((t: string) => (
              <span key={t} className="font-code text-accent-cyan text-sm border border-accent-cyan/30 px-4 py-2 bg-bg/50 backdrop-blur-md">
                [{t}]
              </span>
            ))}
          </div>

          <Link 
            to={`/work/${project.id}`}
            className="group relative font-display text-4xl tracking-widest uppercase overflow-hidden text-white hover:text-bg transition-colors duration-300 px-12 py-6 border border-border"
          >
            <span className="relative z-10">Deploy Case Study</span>
            <div className="absolute inset-0 bg-accent-amber transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
            <div className="absolute -inset-1 border border-accent-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 scale-105 group-hover:scale-100" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function Work() {
  return (
    <PageTransition>
      <div className="bg-bg min-h-screen relative">
         {PROJECTS.map((p, i) => (
           <ProjectSection key={p.id} project={p} index={i} />
         ))}
      </div>
    </PageTransition>
  );
}

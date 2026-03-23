import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { type MouseEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({ children, variant = 'primary', href, onClick, className, type = 'button' }: ButtonProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleInteraction = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // Generate particles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Clean up particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    if (onClick) onClick();
  };

  const baseStyles = "relative overflow-hidden font-bold tracking-wide rounded-sm font-subheading flex items-center justify-center gap-2 transition-all duration-300 px-6 py-3";
  
  const variants = {
    primary: "bg-accent-amber text-bg hover:shadow-[0_0_20px_rgba(255,171,64,0.4)]",
    ghost: "bg-transparent border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
    secondary: "bg-surface border border-border text-text-primary hover:border-accent-cyan/50 hover:bg-surface/80",
  };

  const classes = cn(baseStyles, variants[variant], className);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 0, opacity: 1 }}
            animate={{ 
              x: p.x + (Math.random() - 0.5) * 100, 
              y: p.y + (Math.random() - 0.5) * 100, 
              scale: Math.random() * 1.5 + 0.5,
              opacity: 0
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-accent-amber pointer-events-none z-0"
            style={{ translateX: '-50%', translateY: '-50%' }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <Link to={href} onClick={handleInteraction} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleInteraction} className={classes}>
      {content}
    </button>
  );
}

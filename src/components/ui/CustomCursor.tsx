import React, { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Cursor Context Provider
const CursorContext = createContext<any>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [hoverState, setHoverState] = useState<'default' | 'clickable' | 'text'>('default');
  const [isClicked, setIsClicked] = useState(false);

  // Mouse absolute position refs
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner dot (instant)
  const innerX = useSpring(mouseX, { stiffness: 1000, damping: 20 });
  const innerY = useSpring(mouseY, { stiffness: 1000, damping: 20 });

  // Outer ring (0.12s lag approx) -> tuned Framer Motion spring for smooth lag
  const outerX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const outerY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect hover targets
      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = target.closest('button, a, input, select');
        const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, div.text-text-muted');
        
        if (isClickable) {
          setHoverState('clickable');
        } else if (isText && window.getComputedStyle(target).cursor === 'text') {
          setHoverState('text');
        } else if (isText) {
          // Assume text if no explicit cursor set but it is a text tag
           setHoverState('text');
        } else {
          setHoverState('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <CursorContext.Provider value={null}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden sm:block">
          {/* Inner Dot */}
          <motion.div
            className="absolute top-0 left-0 bg-accent-cyan rounded-full will-change-transform"
            style={{
              x: innerX,
              y: innerY,
              translateX: '-50%',
              translateY: '-50%',
              width: 4,
              height: 4,
            }}
            animate={{
              scale: isClicked ? 0.75 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          
          {/* Outer Ring */}
          <motion.div
            className="absolute top-0 left-0 border border-accent-cyan/60 rounded-full will-change-transform flex items-center justify-center overflow-hidden"
            style={{
              x: outerX,
              y: outerY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 28, height: 28 }}
            animate={{
              width: hoverState === 'text' ? 2 : (hoverState === 'clickable' ? 50 : 28),
              height: hoverState === 'text' ? 20 : (hoverState === 'clickable' ? 50 : 28),
              borderRadius: hoverState === 'text' ? '0px' : '50%',
              backgroundColor: hoverState === 'clickable' ? 'rgba(0,229,255,0.08)' : 'transparent',
              borderColor: hoverState === 'text' ? 'rgba(0,229,255,1)' : 'rgba(0,229,255,0.6)',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>,
        document.body
      )}
    </CursorContext.Provider>
  );
}

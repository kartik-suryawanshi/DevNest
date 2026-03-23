import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence, useTransform } from 'framer-motion';

const DEVNEST_HERO_CONFIG = {
  CANVAS_W: 1920,
  CANVAS_H: 1080,
  THEME: '#080A0F', // Black
  GRID_VANISH_X: 0.5,
  GRID_VANISH_Y: 0.55,
};

function renderCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  // Clear
  ctx.fillStyle = DEVNEST_HERO_CONFIG.THEME;
  ctx.fillRect(0, 0, width, height);

  const cx = width * DEVNEST_HERO_CONFIG.GRID_VANISH_X;
  const cy = height * DEVNEST_HERO_CONFIG.GRID_VANISH_Y;

  // Parallax the vanishing point vertically based on scroll
  const parallaxCy = cy - (progress * 300);

  // Ground plane grid
  ctx.strokeStyle = `rgba(0, 229, 255, 0.15)`; // Cyan grid
  ctx.lineWidth = 1;

  const zOffset = progress * 200; // Continuous forward motion
  
  // Horizontal (depth) lines
  for (let i = 1; i <= 30; i++) {
    const yDepth = (i * 2 + zOffset) ** 1.3;
    if (yDepth > height - parallaxCy) continue;
    const y = parallaxCy + yDepth;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Perspective (radiating) lines
  for (let i = -20; i <= 20; i++) {
    const startX = cx + (i * width * 0.15);
    const bgX = cx + (startX - cx) * 5; 
    ctx.beginPath();
    ctx.moveTo(cx, parallaxCy);
    ctx.lineTo(bgX, height);
    ctx.stroke();
  }

  // Central glowing orb (Amber)
  const pulse = Math.sin(Date.now() / 600) * 0.1 + 1;
  const orbY = parallaxCy - 20; // Sits just above vanishing point
  const r = 45 * pulse;
  
  const grd = ctx.createRadialGradient(cx, orbY, 0, cx, orbY, r * 4);
  grd.addColorStop(0, `rgba(255, 165, 0, 0.5)`);
  grd.addColorStop(1, 'rgba(255, 165, 0, 0)');
  
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, orbY, r * 4, 0, Math.PI * 2);
  ctx.fill();

  // Solid core center
  ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
  ctx.beginPath();
  ctx.arc(cx, orbY, r * 0.15, 0, Math.PI * 2);
  ctx.fill();
}

const TERMINAL_CARDS = [
  { id: 1, pos: { top: '12%', left: '4%' }, rot: -3, speed: 280, 
    content: (
      <>
        <div className="text-accent-cyan mb-2">$ npm install @devnest/core</div>
        <div><span className="text-[#28C840]">✓</span> <span className="text-white/60">Resolved 142 packages</span></div>
        <div><span className="text-[#28C840]">✓</span> <span className="text-white/60">Added 142 packages in 2.3s</span></div>
        <div className="text-accent-cyan mt-2">{'>'} devnest-core@2.4.1 postinstall</div>
        <div className="text-white/60 mt-1">[OK] Ready to build.</div>
      </>
    )
  },
  { id: 2, pos: { top: '55%', left: '6%' }, rot: 2, speed: 280, 
    content: (
      <>
        <div className="text-accent-cyan mb-2">$ ./deploy.sh --env=production</div>
        <div className="text-accent-amber">[▓▓▓▓▓▓▓▓▓▓] 100%</div>
        <div><span className="text-[#28C840]">✓</span> <span className="text-white/60">Build successful</span></div>
        <div><span className="text-[#28C840]">✓</span> <span className="text-white/60">Container pushed to registry</span></div>
        <div><span className="text-[#28C840]">✓</span> <span className="text-white/60">Live at devnest.app</span></div>
      </>
    )
  },
  { id: 3, pos: { top: '10%', right: '6%' }, rot: 4, speed: 220, 
    content: (
      <>
        <div className="text-white/60">json{'{'}</div>
        <div className="pl-4">
          <span className="text-accent-cyan">"project"</span>: <span className="text-accent-amber">"client-dashboard"</span>,
        </div>
        <div className="pl-4">
          <span className="text-accent-cyan">"stack"</span>: [<span className="text-accent-amber">"Next.js"</span>, <span className="text-accent-amber">"Node"</span>, <span className="text-accent-amber">"Postgres"</span>],
        </div>
        <div className="pl-4">
          <span className="text-accent-cyan">"status"</span>: <span className="text-accent-amber">"deploying"</span>,
        </div>
        <div className="pl-4">
          <span className="text-accent-cyan">"uptime"</span>: <span className="text-accent-amber">"99.98%"</span>
        </div>
        <div className="text-white/60">{'}'}</div>
      </>
    )
  },
  { id: 4, pos: { top: '45%', right: '3%' }, rot: -2, speed: 220, 
    content: (
      <>
        <div className="text-accent-cyan mb-2">$ git log --oneline -4</div>
        <div><span className="text-accent-amber">a3f92c1</span> <span className="text-white/60">feat: launch v2 dashboard</span></div>
        <div><span className="text-accent-amber">b81de22</span> <span className="text-white/60">fix: auth token refresh</span></div>
        <div><span className="text-accent-amber">c994f01</span> <span className="text-white/60">perf: reduce bundle 40%</span></div>
        <div><span className="text-accent-amber">d002ab3</span> <span className="text-white/60">chore: update deps</span></div>
      </>
    )
  },
  { id: 5, pos: { top: '75%', right: '18%' }, rot: -5, speed: 340, 
    content: (
      <>
        <div className="text-accent-cyan">$ curl -X POST /api/project/init \</div>
        <div className="text-accent-cyan ml-4 mb-2">-H "Authorization: Bearer $TOKEN"</div>
        <div className="text-white/60">{'<'} 201 Created</div>
        <div className="text-white/60">{'<'} {'{"id":"proj_xK92","status":"active"}'}</div>
      </>
    )
  },
];

export default function HeroScrollEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [loaderPhase, setLoaderPhase] = useState<'svg' | 'text' | 'exit' | 'done'>('svg');

  // Loader Timeline
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase('text'), 600); // SVG draw takes 0.6s
    const t2 = setTimeout(() => setLoaderPhase('exit'), 1000); // Typing text takes 0.4s
    const t3 = setTimeout(() => setLoaderPhase('done'), 1300); // Exit animation takes 0.3s
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Sync Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const renderLoop = () => {
      const scrollVal = scrollYProgress.get();
      renderCanvas(ctx, canvas.width, canvas.height, scrollVal);
      animFrame = requestAnimationFrame(renderLoop);
    };
    
    animFrame = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [scrollYProgress]);

  // Derived Scroll Physics for Cards
  const cardsOpacityFade = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);
  const cardsScaleFade = useTransform(scrollYProgress, [0, 1], [0.9, 0.7]);

  // Mask bleed at bottom of hero to blend into next section seamlessly
  const maskStyle = { maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-bg">
      <div className="sticky top-0 w-full h-screen overflow-hidden text-text-primary" style={maskStyle}>
        
        {/* Cinematic Canvas Background */}
        <motion.canvas 
          ref={canvasRef} 
          width={DEVNEST_HERO_CONFIG.CANVAS_W} 
          height={DEVNEST_HERO_CONFIG.CANVAS_H} 
          initial={{ scale: 1.4 }}
          animate={{ scale: loaderPhase === 'done' ? 1 : 1.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover origin-bottom"
        />

        {/* Ambient Tracking Glow */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0%,transparent_50%)] z-0" />

        {/* Floating Terminal Code Snippets - Moved to background behind text */}
        {loaderPhase === 'done' && TERMINAL_CARDS.map((card, i) => (
          <FloatingCard 
            key={card.id} 
            card={card} 
            idx={i} 
            progress={scrollYProgress} 
            opacity={cardsOpacityFade} 
            scale={cardsScaleFade} 
          />
        ))}

        {/* Main Headline (Always Visible after loader) */}
        {loaderPhase === 'done' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-20" style={{ top: '-10%' }}>
             
             <motion.div 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
               className="flex flex-col items-center drop-shadow-2xl"
             >
               <span className="text-accent-amber mb-6">{'{ • }'}</span>
               <h1 className="font-display text-6xl md:text-9xl tracking-tight text-white m-0 leading-none">
                 WHERE IDEAS HATCH<br/>
                 <span className="text-accent-cyan">INTO DIGITAL REALITY</span>
               </h1>
             </motion.div>
          </div>
        )}

        {/* Scroll To Explore Indicator */}
        {loaderPhase === 'done' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 left-8 font-code flex items-center gap-4 hidden md:flex"
          >
            <div className="h-12 w-px bg-border overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, 48] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-1/2 bg-accent-cyan" />
            </div>
            <span className="text-xs text-text-muted tracking-[0.2em] transform -rotate-90 origin-left translate-y-8">SCROLL TO EXPLORE</span>
          </motion.div>
        )}

        {/* Bespoke Loader Sequence */}
        <AnimatePresence>
          {loaderPhase !== 'done' && (
            <motion.div 
              key="loader"
              className="absolute inset-0 z-50 bg-bg flex flex-col items-center justify-center"
              initial={{ scale: 1, opacity: 1 }}
              animate={loaderPhase === 'exit' ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4">
                {/* SVG Braces drawing */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-accent-cyan" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path 
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                     // Approximate exact curly braces visually
                     d="M 35 20 C 15 20, 15 45, 10 50 C 15 55, 15 80, 35 80 M 65 20 C 85 20, 85 45, 90 50 C 85 55, 85 80, 65 80"
                  />
                </svg>
                
                {/* Text typing */}
                <div className="font-display text-7xl text-white overflow-hidden whitespace-nowrap" style={{ width: loaderPhase === 'svg' ? '0px' : '300px', transition: 'width 0.4s steps(7, end)' }}>
                  DevNest
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Child component to safely use framer hooks dynamically
function FloatingCard({ card, idx, progress, opacity, scale }: any) {
  const yMove = useTransform(progress, [0, 1], [0, -card.speed]);

  return (
    <motion.div
      className="absolute z-10 hidden xl:block will-change-transform"
      style={{
        top: card.pos.top,
        bottom: card.pos.bottom,
        left: card.pos.left,
        right: card.pos.right,
        y: yMove,
        opacity,
        scale,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.12, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="w-[260px] 2xl:w-[320px] bg-[#0D1117]/60 rounded-lg border border-accent-cyan/10 font-mono text-xs md:text-sm overflow-hidden shadow-2xl backdrop-blur-md"
        style={{
          rotate: card.rot,
          boxShadow: '0 0 24px rgba(0, 229, 255, 0.03), inset 0 1px 0 rgba(255,255,255,0.02)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="flex gap-2 px-4 py-3 border-b border-accent-cyan/10 bg-black/40">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="p-4 whitespace-pre-wrap leading-relaxed">
          {card.content}
        </div>
      </motion.div>
    </motion.div>
  );
}

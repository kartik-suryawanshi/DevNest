import { motion } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition';
import TheNestMethod from '../../components/home/TheNestMethod';
import Button from '../../components/ui/Button';

export default function Process() {
  return (
    <PageTransition>
      <div className="pt-32 min-h-screen pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-24 text-center">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6">The Nest Method</h1>
            <p className="text-2xl text-text-muted font-body max-w-3xl mx-auto">
              How we go from zero to launched in 5 structured phases. Pure signal. Zero noise.
            </p>
          </motion.div>
        </div>

        {/* Bring in the component we built for the home page, it serves exactly this purpose */}
        <TheNestMethod />

        <div className="max-w-7xl mx-auto px-8 mt-32">
          {/* Collaboration Model */}
          <section className="mb-32 grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl font-display font-bold text-white mb-6">The Collaboration Model</h2>
               <p className="text-text-muted leading-relaxed font-body mb-6">
                 We hate bloated status updates. We communicate asynchronously and clearly so you can focus on running your business while we build it.
               </p>
               <ul className="space-y-4 font-code text-sm text-accent-cyan">
                 <li>[✓] Notion for central project management</li>
                 <li>[✓] Weekly Loom video updates of our progress</li>
                 <li>[✓] Direct Slack/WhatsApp channels for emergencies</li>
                 <li>[✓] 2 dedicated revision rounds per milestone</li>
               </ul>
             </div>
             <div className="glass-panel p-8 rounded-2xl aspect-video flex flex-col items-center justify-center font-code opacity-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-grain" />
                {">"} Syncing internal tooling... OK
             </div>
          </section>

          {/* Guarantee Box */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full bg-accent-amber text-bg p-12 text-center rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(255,171,64,0.3)] mb-32"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4)_0%,transparent_50%)] pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6 text-black tracking-tight">The DevNest Commitment</h2>
            <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto text-black/80 font-bold mb-8">
              "If we miss a milestone, you get a free sprint. We take accountability for every line of code and every pixel."
            </p>
            <Button href="/contact" variant="secondary" className="bg-black text-white border-black hover:bg-surface">
               Start Your Project
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

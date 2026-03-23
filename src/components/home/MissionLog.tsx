import { motion } from 'framer-motion';

const logs = [
  {
    client: "Ananya Fitness Studio, Pune",
    service: "Web Development + Digital Marketing",
    result: "Website + Meta Ads → 4× inquiries in 45 days",
    verdict: "DevNest didn't just build our site, they built our business.",
  },
  {
    client: "Rohan's Artisan Bakery",
    service: "Branding + App Development",
    result: "Zero online orders → ₹50k daily run-rate",
    verdict: "The ordering web-app is so fast, customers actually compliment it.",
  },
  {
    client: "LegalEdge Associates",
    service: "Corporate Portfolio",
    result: "First page Google ranking for local terms",
    verdict: "Sleek, professional, and finally puts us ahead of legacy firms.",
  }
];

export default function MissionLog() {
  return (
    <section className="w-full py-32 px-8 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold flex items-center gap-4">
            <span className="text-accent-amber animate-pulse">●</span> Mission Log
          </h2>
        </motion.div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="snap-center min-w-[320px] md:min-w-0 flex-shrink-0 bg-black border border-[#1a1f33] hover:border-accent-amber/50 rounded-lg p-6 font-code text-sm transition-colors group shadow-lg"
            >
              <div className="flex items-center gap-2 border-b border-[#1a1f33] pb-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[#3a4466] ml-2 text-xs">testimonial_payload.json</span>
              </div>
              <div className="space-y-4 text-text-muted">
                <div><span className="text-accent-amber">{'>'}</span> <span className="text-accent-cyan">client.name</span> = <span className="text-green-400">"{log.client}"</span></div>
                <div><span className="text-accent-amber">{'>'}</span> <span className="text-accent-cyan">service.used</span> = <span className="text-green-400">"{log.service}"</span></div>
                <div><span className="text-accent-amber">{'>'}</span> <span className="text-accent-cyan">result.achieved</span> = <span className="text-green-400">"{log.result}"</span></div>
                <div><span className="text-accent-amber">{'>'}</span> <span className="text-accent-cyan">client.verdict</span> = <span className="text-white">"{log.verdict}"</span></div>
                <div className="text-accent-amber pt-4">{'>'} status = MISSION_SUCCESS ✓ <span className="animate-pulse">_</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

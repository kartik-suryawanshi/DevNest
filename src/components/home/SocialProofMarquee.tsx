import { motion } from 'framer-motion';

const topRow = [
  "Rohan's Bakery · Pune", "FitCoach Priya · Mumbai", "LegalEdge Firm · Delhi", "Dr. Mehta's Clinic · Nagpur",
  "Rohan's Bakery · Pune", "FitCoach Priya · Mumbai", "LegalEdge Firm · Delhi", "Dr. Mehta's Clinic · Nagpur"
];

const bottomRow = [
  "3× Revenue in 90 days", "First website → Google Page 1", "Zero to 10K followers", "App launched in 6 weeks",
  "3× Revenue in 90 days", "First website → Google Page 1", "Zero to 10K followers", "App launched in 6 weeks"
];

export default function SocialProofMarquee() {
  return (
    <section className="w-full py-16 bg-surface overflow-hidden border-y border-border">
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex gap-4 px-2"
        >
          {topRow.map((text, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-bg border border-border rounded-full font-code text-text-muted text-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden mt-6">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-4 px-2"
        >
          {bottomRow.map((text, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-bg border border-border rounded-full font-code text-accent-cyan text-sm shrink-0">
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

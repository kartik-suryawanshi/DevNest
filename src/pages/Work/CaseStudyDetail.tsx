import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';

const DB = {
  title: 'Ananya Fitness Studio',
  client: 'Ananya Fitness',
  industry: 'Health & Wellness',
  year: '2025',
  challenge: "Ananya had 200 loyal regulars in her physical studio but zero Google presence. She relied entirely on WhatsApp forwards for new signups. Her brand didn't reflect the premium quality of her coaching.",
  approach: [
    { phase: 'Audit', detail: 'Analyzed local search volume for "premium fitness coaching Pune".' },
    { phase: 'Identity', detail: 'Rebranded with a dark, high-energy aesthetic.' },
    { phase: 'Platform', detail: 'Built a custom Next.js site with integrated class booking.' },
    { phase: 'Growth', detail: 'Launched targeted Meta Ads to local radius.' }
  ],
  results: {
    before: { presence: '0 online presence', revenue: '₹0 digital revenue' },
    after: { presence: 'Google Page 1 in 8 weeks', revenue: '₹2.4L/month from ads' }
  },
  testimonial: "DevNest didn't just build our site, they built our business. The booking system runs itself, and the leads won't stop coming."
};

export default function CaseStudyDetail() {
  useParams(); // Mocked DB, slug not strictly needed

  return (
    <PageTransition>
      <div className="pt-32 px-8 min-h-screen pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <Link to="/work" className="text-accent-cyan font-code text-sm hover:underline mb-8 inline-block">
              &larr; Back to Work
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 flex flex-col gap-4 text-white">
              {DB.title}
            </h1>
            <div className="flex gap-6 font-code text-sm text-text-muted mt-8 border-t border-border pt-6">
               <div><span className="text-accent-cyan block">CLIENT</span>{DB.client}</div>
               <div><span className="text-accent-cyan block">INDUSTRY</span>{DB.industry}</div>
               <div><span className="text-accent-cyan block">YEAR</span>{DB.year}</div>
            </div>
          </motion.div>

          {/* Hero Image Mock */}
          <div className="w-full bg-surface aspect-video rounded-2xl border border-border flex items-center justify-center font-display text-text-muted/20 text-4xl mb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-grain z-10 opaciy-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent" />
            Project Visual Mockup
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-24 border-b border-border pb-24">
            <h2 className="text-3xl font-display font-bold text-white">The Challenge</h2>
            <p className="text-lg text-text-muted leading-relaxed font-body">{DB.challenge}</p>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-24 border-b border-border pb-24">
            <h2 className="text-3xl font-display font-bold text-white">Our Approach</h2>
            <div className="space-y-8">
               {DB.approach.map((a, i) => (
                 <div key={i} className="flex gap-4 group">
                    <div className="font-code text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                    <div>
                      <h4 className="font-subheading font-bold text-white mb-1">{a.phase}</h4>
                      <p className="text-text-muted text-sm">{a.detail}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="mb-24 bg-surface p-12 rounded-2xl border border-grid relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-amber via-accent-cyan to-accent-amber" />
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Results Delivered</h2>
            
            <div className="grid md:grid-cols-2 gap-12 font-code">
              <div className="space-y-6">
                 <h4 className="text-text-muted border-b border-border pb-4 uppercase">Before DevNest</h4>
                 <div className="text-lg text-red-400/80">{DB.results.before.presence}</div>
                 <div className="text-lg text-red-400/80">{DB.results.before.revenue}</div>
              </div>
              <div className="space-y-6">
                 <h4 className="text-text-muted border-b border-border pb-4 uppercase">After DevNest</h4>
                 <div className="text-2xl text-accent-cyan font-bold">{DB.results.after.presence}</div>
                 <div className="text-2xl text-accent-cyan font-bold text-accent-amber drop-shadow-[0_0_10px_rgba(255,171,64,0.3)]">{DB.results.after.revenue}</div>
              </div>
            </div>
          </div>

          <div className="text-center italic font-display text-2xl text-white max-w-2xl mx-auto mb-32 relative">
             <span className="absolute -top-10 -left-6 text-6xl text-accent-cyan/20">"</span>
             {DB.testimonial}
             <div className="mt-6 text-sm font-body text-text-muted font-normal not-italic tracking-widest uppercase">— {DB.client}</div>
          </div>

          <Link to="/work/next-project" className="w-full group bg-surface hover:bg-bg border border-border p-12 rounded-2xl flex items-center justify-between transition-all">
             <div>
               <div className="text-accent-cyan font-code text-sm mb-2">NEXT PROJECT</div>
               <h3 className="text-3xl font-display font-bold text-white group-hover:text-accent-amber transition-colors">TechCorp Automation</h3>
             </div>
             <ArrowRight className="w-8 h-8 text-text-muted group-hover:text-accent-amber group-hover:translate-x-4 transition-all" />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

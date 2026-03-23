import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Server, Smartphone, Monitor, Database } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';
import Button from '../../components/ui/Button';

// Mock DB for the dynamic template
const SERVICE_DB: Record<string, any> = {
  'web-dev': {
    title: 'Web Development',
    tagline: 'Websites that work as hard as you do.',
    features: ['Landing Pages', 'E-Commerce', 'Booking Systems', 'Portfolios', 'SaaS Interfaces', 'Corporate Sites'],
    process: [
      { step: 1, title: 'Architecture Planning', desc: 'Defining the sitemap and component structure' },
      { step: 2, title: 'UI/UX Design', desc: 'Figma prototypes and micro-interaction planning' },
      { step: 3, title: 'Frontend Build', desc: 'React/Next.js implementation with Tailwind' },
      { step: 4, title: 'Backend & Launch', desc: 'CMS integration and Vercel deployment' },
    ],
    tech: [
      { name: 'React', icon: Monitor }, { name: 'Next.js', icon: Server },
      { name: 'Node.js', icon: Database }, { name: 'Responsive UI', icon: Smartphone }
    ],
    pricing: [
      { name: 'Starter', price: '₹40,000', features: ['Single Page Landing', 'Contact Form', 'Mobile Responsive', '1 Week Delivery'] },
      { name: 'Growth', price: '₹85,000+', features: ['Multi-page CMS', 'SEO Optimization', 'Custom Animations', '3 Weeks Delivery'] },
      { name: 'E-Commerce', price: 'Custom', features: ['Shopify/Custom Backend', 'Payment Gateway', 'Inventory Sync', 'Scalable Architecture'] }
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = SERVICE_DB[slug || 'web-dev'] || SERVICE_DB['web-dev']; // Fallback for demo

  return (
    <PageTransition>
      <div className="pt-32 px-8 min-h-screen pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
            <Link to="/services" className="text-accent-cyan font-code text-sm hover:underline mb-8 inline-block">
              &larr; Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6">{data.title}</h1>
            <p className="text-2xl text-text-muted font-body max-w-2xl">{data.tagline}</p>
          </motion.div>

          {/* Features Grid */}
          <section className="mb-32">
            <h2 className="text-3xl font-display font-bold mb-12">What We Build</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.features.map((f: string, i: number) => (
                <div key={i} className="glass-panel p-6 flex items-center gap-4 text-text-primary rounded-lg border-border hover:border-accent-cyan transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent-amber" />
                  <span className="font-subheading font-bold">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Process Stepper */}
          <section className="mb-32 p-12 bg-surface border border-grid rounded-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-grain" />
             <div className="relative z-10">
               <h2 className="text-3xl font-display font-bold mb-12">Our Process</h2>
               <div className="flex flex-col gap-8">
                 {data.process.map((p: any, i: number) => (
                   <div key={i} className="flex gap-6 items-start group">
                     <div className="w-12 h-12 rounded-full border border-accent-cyan flex items-center justify-center font-code text-accent-cyan group-hover:bg-accent-cyan group-hover:text-bg transition-all shrink-0">
                       0{p.step}
                     </div>
                     <div>
                       <h4 className="text-xl font-bold font-subheading mb-2">{p.title}</h4>
                       <p className="text-text-muted">{p.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>

          {/* Pricing Tiers */}
          <section className="mb-32">
            <h2 className="text-3xl font-display font-bold mb-12 text-center">Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.pricing.map((tier: any, i: number) => (
                <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col border border-border hover:border-accent-amber/50 hover:shadow-[0_10px_40px_rgba(255,171,64,0.1)] transition-all">
                  <h3 className="text-2xl font-bold font-display mb-2">{tier.name}</h3>
                  <div className="text-4xl font-display font-bold text-accent-cyan mb-8">{tier.price}</div>
                  <ul className="mb-8 flex-1 space-y-4">
                    {tier.features.map((f: string, j: number) => (
                      <li key={j} className="flex items-center gap-3 text-text-muted text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={i === 1 ? 'primary' : 'ghost'} className="w-full">Get Started</Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

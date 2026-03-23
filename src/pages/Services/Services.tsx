import { motion } from 'framer-motion';
import { Rocket, Globe, Cpu, Radio, Sparkles, MonitorSmartphone } from 'lucide-react';
import PageTransition from '../../components/layout/PageTransition';
import Button from '../../components/ui/Button';

const services = [
  { 
    id: 'app-dev', title: 'App Development', icon: Rocket,
    tagline: 'Cross-platform apps built for real users',
    features: ['React Native / Flutter', 'iOS & Android Native', 'API Integration', 'UI/UX Prototyping']
  },
  { 
    id: 'web-dev', title: 'Web Development', icon: Globe,
    tagline: 'Websites that work as hard as you do',
    features: ['High-Performance React/Next.js', 'E-commerce Architecture', 'CMS Integration', 'SEO Optimization']
  },
  { 
    id: 'automation', title: 'Business Automation', icon: Cpu,
    tagline: 'Replace manual effort with intelligent systems',
    features: ['Workflow mapping', 'Zapier/Make integration', 'CRM setups', 'Custom internal tools']
  },
  { 
    id: 'marketing', title: 'Digital Marketing', icon: Radio,
    tagline: 'Campaigns that reach your people, every time',
    features: ['Performance Meta/Google Ads', 'SEO strategy', 'Social Media Management', 'Conversion Rate Optimization']
  },
  { 
    id: 'branding', title: 'Branding & Online Presence', icon: Sparkles,
    tagline: 'Identity that makes you unmistakable',
    features: ['Logo & Visual Identity', 'Brand Guidelines', 'Social Media Kits', 'Copywriting & Voice']
  },
  { 
    id: 'portfolio', title: 'Professional Portfolios', icon: MonitorSmartphone,
    tagline: 'Showcase your work. Command attention.',
    features: ['Custom WebGL/Canvas', 'Performant animations', 'Case study structuring', 'Resume integration']
  },
];

export default function Services() {
  return (
    <PageTransition>
      <div className="pt-32 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-4">Our Services</h1>
            <p className="text-text-muted text-lg relative inline-block group">
              Every tool you need. Nothing you don't.
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent-cyan/0 group-hover:bg-accent-cyan/50 transition-colors" />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="group relative glass-panel rounded-xl p-8 hover:-translate-y-2 hover:shadow-[0_20px_60px_var(--color-glow-cyan)] hover:border-accent-cyan/40 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-6 border border-border group-hover:border-accent-cyan group-hover:text-accent-cyan transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-subheading font-bold mb-3">{svc.title}</h3>
                  <p className="text-text-muted mb-6 font-body leading-relaxed">{svc.tagline}</p>
                  
                  <ul className="mb-8 space-y-2 flex-grow">
                     {svc.features.map((f, j) => (
                       <li key={j} className="flex items-center gap-2 text-sm text-text-muted">
                         <span className="w-1.5 h-1.5 rounded-full bg-accent-amber shrink-0" />
                         {f}
                       </li>
                     ))}
                  </ul>

                  <Button href={`/services/${svc.id}`} variant="ghost" className="w-full">
                    Learn More &rarr;
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-32 w-full glass-panel p-12 text-center rounded-xl flex flex-col items-center mb-32"
          >
            <h3 className="text-3xl font-display font-bold mb-4">Not sure which service you need?</h3>
            <p className="text-text-muted mb-8 max-w-lg">We can review your business and recommend the exact tools that will drive growth.</p>
            <Button href="/contact" variant="primary">Book a Free Audit &rarr;</Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

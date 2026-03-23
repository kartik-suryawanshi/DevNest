import PageTransition from '../../components/layout/PageTransition';
import CTASection from '../../components/home/CTASection';

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-24 min-h-screen bg-bg">
        {/* Monospace Section Label for individual page directly */}
        <div className="absolute top-32 left-8 md:top-40 md:left-24 font-code text-accent-amber text-sm tracking-widest flex items-center gap-4 z-50">
          <span>// 05</span>
          <span>INITIATE_CONTACT</span>
        </div>
        
        <CTASection />
      </div>
    </PageTransition>
  );
}

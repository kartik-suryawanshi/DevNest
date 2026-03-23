import PageTransition from '../../components/layout/PageTransition';
import HeroScrollEngine from '../../components/home/HeroScrollEngine';
import ServicesGrid from '../../components/home/ServicesGrid';
import SocialProofMarquee from '../../components/home/SocialProofMarquee';
import Work from '../Work/Work';
import TheNestMethod from '../../components/home/TheNestMethod';
import About from '../About/About';
import ProductsEcosystem from '../../components/home/ProductsEcosystem';
import CTASection from '../../components/home/CTASection';

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-bg w-full">
        {/* The Loader & Parallax Canvas Hero */}
        <HeroScrollEngine />
        
        {/* Seamlessly integrated blocks */}
        <ServicesGrid />

        {/* Parallax Image Marquee */}
        <SocialProofMarquee />
        
        {/* Work acts as a series of full-screen sticky sticky sections */}
        <Work />
        
        {/* Process SVG Timeline */}
        <TheNestMethod />
        
        {/* Terminal About Section */}
        <About />

        {/* Deep Org Product Network Graph */}
        <ProductsEcosystem />
        
        {/* Massive Inline CTA Bookend */}
        <CTASection />
      </div>
    </PageTransition>
  );
}

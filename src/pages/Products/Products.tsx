import PageTransition from '../../components/layout/PageTransition';
import ProductsEcosystem from '../../components/home/ProductsEcosystem';
import CTASection from '../../components/home/CTASection';

export default function Products() {
  return (
    <PageTransition>
      <div className="bg-bg min-h-screen pt-24">
        {/* Products Core Section */}
        <ProductsEcosystem />
        
        {/* Call to action bookend */}
        <CTASection />
      </div>
    </PageTransition>
  );
}

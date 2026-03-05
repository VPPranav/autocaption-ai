import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingPreview } from "@/components/landing/PricingPreview";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <PricingPreview />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;

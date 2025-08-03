import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Navbar from "@/components/Navbar";
import Working from "@/components/Working";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      {/* <Working/> */}
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Index;

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import UseCases from "../components/UseCases";
import SecuritySection from "../components/SecuritySection";
import CTASection from "../components/CTASection";

export default function HomePage() {
  return (
    <div className="bg-[#020617] text-white min-h-screen">
      <Header />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <SecuritySection />
      <CTASection />
    </div>
  );
}

import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { HowItWorks } from "@/components/how-it-works";
import { AIShowcaseSection } from "@/components/ai-showcase-section";
import { InsightsSection } from "@/components/insights-section";
import { SecuritySection } from "@/components/security-section";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturesGrid />
      <HowItWorks />
      <AIShowcaseSection />
      <InsightsSection />
      <SecuritySection />
    </div>
  );
};
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesGrid } from "@/components/sections/features-grid";
import ThreeSteps from "@/components/sections/three-steps";
import UndetectableComparison from "@/components/sections/undetectable-comparison";
import TranscriptionStats from "@/components/sections/transcription-stats";
import FaqSection from "@/components/sections/faq-section";
import FinalCta from "@/components/sections/final-cta";

export default function Home() {
  return (
      <div className="min-h-screen w-full">
        <main className="w-full">
          <HeroSection />
          <FeaturesGrid />
          <ThreeSteps />
          <UndetectableComparison />
          <TranscriptionStats />
          <FaqSection />
          <FinalCta />
        </main>
      </div>
  );
};
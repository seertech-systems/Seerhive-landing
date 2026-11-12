import Hero from "@/components/Hero";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import HiringJourney from "@/components/HiringJourney";
import VoiceSpotlight from "@/components/VoiceSpotlight";
import SeerHiveShowcase from "@/components/SeerHiveShowcase";
import WhySection from "@/components/WhySection";
import WhatIsSection from "@/components/WhatIsSection";
import ProductShowcase from "@/components/ProductShowcase";
import ComparisonTable from "@/components/ComparisonTable";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <VoiceSpotlight />
      <WhatIsSection />
      <ProjectSpotlight />
      <HiringJourney />
      <SeerHiveShowcase />
      <ProductShowcase />
      <ComparisonTable />
      <WhySection />
      <Faq />
    </main>
  );
}

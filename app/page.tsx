import Hero from "@/components/Hero";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import ModuleGallery from "@/components/ModuleGallery";
import HiringJourney from "@/components/HiringJourney";
import VoiceSpotlight from "@/components/VoiceSpotlight";
import SeerHiveShowcase from "@/components/SeerHiveShowcase";
import WhySection from "@/components/WhySection";
import WhatIsSection from "@/components/WhatIsSection";
import ProductShowcase from "@/components/ProductShowcase";
import AudienceTabs from "@/components/AudienceTabs";
import ComparisonTable from "@/components/ComparisonTable";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <VoiceSpotlight />
      <WhatIsSection />
      <ProjectSpotlight />
      <ModuleGallery />
      <HiringJourney />
      <SeerHiveShowcase />
      <ProductShowcase />
      <AudienceTabs />
      <ComparisonTable />
      <WhySection />
      <Faq />
    </main>
  );
}

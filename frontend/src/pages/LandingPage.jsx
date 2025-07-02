import { Toaster } from "@/components/ui/sonner";
import { Footer, Navbar } from "@/components/common";
import { BlogsSection, HeroSection, FAQSection, FeaturesSection } from "@/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BlogsSection />
      <FeaturesSection />
      <FAQSection />
      <Toaster />
      <Footer />
    </>
  );
}

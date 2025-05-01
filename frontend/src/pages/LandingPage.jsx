import { Toaster } from "@/components/ui/sonner";
import { Footer, Navbar } from "@/components/common";
import { BlogsSection, HeroSection } from "@/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BlogsSection />
      <Toaster />
      <Footer />
    </>
  );
}

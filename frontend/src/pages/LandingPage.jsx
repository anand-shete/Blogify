import { Toaster } from "@/components/ui/sonner";
import { LandingPageBlogs, HeroSection, FAQSection, FeaturesSection } from "@/components/Landing";

const Home = () => (
  <>
    <HeroSection />
    <LandingPageBlogs />
    <FeaturesSection />
    <FAQSection />
    <Toaster />
  </>
);

export default Home;

import { LoginSection } from "@/sections";
import { Navbar, Footer } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";

export default function Login() {
  return (
    <>
      <Navbar />
      <LoginSection />
      <Footer />
      <Toaster />
    </>
  );
}

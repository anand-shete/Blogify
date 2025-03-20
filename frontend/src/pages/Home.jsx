import { Toaster } from "@/components/ui/sonner";
import { Footer, Navbar, Blogs } from "../components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Blogs />
      <Toaster />
      <Footer />
    </>
  );
}

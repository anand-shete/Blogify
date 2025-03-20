import { Navbar, Footer } from "@/components";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

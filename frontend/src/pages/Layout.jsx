import { Footer, Loader, Navbar } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function Layout() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // always pass key to Suspense component
    <Suspense fallback={<Loader />} key={key}>
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </Suspense>
  );
}

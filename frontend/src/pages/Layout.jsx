import { Footer, Loader, Navbar } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </Suspense>
  );
}

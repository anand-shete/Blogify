import { Footer, Navbar } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Outlet } from "react-router";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
}

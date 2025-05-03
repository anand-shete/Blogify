import { Footer, Navbar } from "@/components/common";
import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

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

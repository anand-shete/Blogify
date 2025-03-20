import { NavLink } from "react-router";
import React from "react";

export default function Footer() {
  return (
    <footer className="max-h-fit max-w-screen bg-stone-800 text-white py-6 text-center border-t-2 border-t-black">
      <p>© 2025 Blogify. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <NavLink
          to="https://github.com/anand-shete/Blogify"
          target="_blank"
          className="hover:underline hover:text-slate-300"
        >
          GitHub
        </NavLink>
        <NavLink to="/" className="hover:underline hover:text-slate-300">
          Privacy Policy
        </NavLink>
        <NavLink to="/" className="hover:underline hover:text-slate-300">
          Terms of Service
        </NavLink>
      </div>
    </footer>
  );
}

import { NavLink } from "react-router";
import React from "react";

export default function Footer() {
  return (
    <footer className="max-w-screen max-h-fit overflow-hidden border-t-2 border-t-black bg-stone-800 py-6 text-center text-white">
      <p>© 2025 Blogify. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <NavLink
          to="https://github.com/anand-shete/Blogify"
          target="_blank"
          className="hover:text-slate-300 hover:underline"
        >
          GitHub
        </NavLink>
        <NavLink to="/" className="hover:text-slate-300 hover:underline">
          Privacy Policy
        </NavLink>
        <NavLink to="/" className="hover:text-slate-300 hover:underline">
          Terms of Service
        </NavLink>
      </div>
    </footer>
  );
}

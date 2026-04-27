import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import { NavbarLogo, DesktopNavbar, NavbarBurgerMenu } from ".";

export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-5 flex min-h-22 min-w-full items-center justify-around border-b-1 border-black bg-white shadow-xl">
      <NavbarLogo />
      <NavbarBurgerMenu
        isBurgerOpen={isBurgerOpen}
        toggleBurger={() => setIsBurgerOpen(!isBurgerOpen)}
      />
      <DesktopNavbar />
      <Button className="relative z-1 sm:hidden" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
        {isBurgerOpen ? <X /> : <AlignJustify />}
      </Button>
    </nav>
  );
}

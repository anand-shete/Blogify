import { useState } from "react";
import NavbarBurgerMenu from "./NavbarBurgerMenu";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";

export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-3 flex min-h-20 max-w-screen items-center justify-around border-b-1 border-black bg-white">
      <NavbarLogo />
      <NavbarBurgerMenu
        isBurgerOpen={isBurgerOpen}
        toggleBurger={() => setIsBurgerOpen(!isBurgerOpen)}
      />
      <NavbarLinks />
      <Button className="relative z-1 sm:hidden" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
        {isBurgerOpen ? <X /> : <AlignJustify />}
      </Button>
    </nav>
  );
}

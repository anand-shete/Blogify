import { NavLink } from "react-router";

export default function NavbarLogo() {
  return (
    <NavLink to="/">
      <img
        src="logos/main.png"
        alt="logo"
        className="hover:scale-120 h-10 rounded-xl border border-black shadow-2xl transition-transform"
      />
    </NavLink>
  );
}

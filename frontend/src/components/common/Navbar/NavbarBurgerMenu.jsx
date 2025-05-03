import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function NavbarBurgerMenu({ isBurgerOpen, toggleBurger }) {
  const user = useSelector(user => user.user);

  return (
    <div
      className={`${isBurgerOpen ? "translate-x-0" : "-translate-x-500"} z-1 fixed top-0 flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-stone-300 transition-transform *:rounded-md *:bg-stone-800 *:px-10 *:py-2 *:text-white`}
    >
      {user.name ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/logout">Logout</NavLink>
          <NavLink to="/">Add Blog</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/user/signup">Sign Up</NavLink>
          <NavLink to="/user/login">Login</NavLink>
        </>
      )}
    </div>
  );
}

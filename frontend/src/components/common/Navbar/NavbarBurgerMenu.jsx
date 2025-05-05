import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function NavbarBurgerMenu({ isBurgerOpen, toggleBurger }) {
  const user = useSelector(user => user.user);

  return (
    <div
      className={`${isBurgerOpen ? "translate-x-0" : "-translate-x-500"} fixed top-0 z-1 flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-stone-300 transition-transform *:rounded-md *:bg-stone-800 *:px-10 *:py-2 *:text-white`}
    >
      {user._id ? (
        <>
          <NavLink to="/" onClick={toggleBurger}>
            Home
          </NavLink>
          <NavLink to="/user/dashboard" onClick={toggleBurger}>
            Dashboard
          </NavLink>
          <NavLink to="/user/blog/add" onClick={toggleBurger}>
            Add Blog
          </NavLink>
          <NavLink to="/user/logout" onClick={toggleBurger}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/user/signup" onClick={toggleBurger}>
            Sign Up
          </NavLink>
          <NavLink to="/user/login" onClick={toggleBurger}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}

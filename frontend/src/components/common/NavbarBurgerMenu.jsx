import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function NavbarBurgerMenu({ isBurgerOpen, toggleBurger }) {
  const user = useSelector(user => user.user);

  return (
    <div
      className={`${isBurgerOpen ? "translate-x-0" : "-translate-x-500"} [&_a]:bg-primary fixed top-0 z-1 flex h-screen w-full flex-col items-center justify-center space-y-8 bg-black/80 transition-transform [&_a]:rounded-md [&_a]:px-10 [&_a]:py-2 [&_a]:text-white`}
    >
      <NavLink to="/" onClick={toggleBurger}>
        Home
      </NavLink>
      <NavLink to="/discover" onClick={toggleBurger}>
        Discover
      </NavLink>

      {user._id ? (
        <>
          <NavLink to="/dashboard" onClick={toggleBurger}>
            Dashboard
          </NavLink>
          <NavLink to="/blog/add" onClick={toggleBurger}>
            Add Blog
          </NavLink>
          <NavLink to="/logout" onClick={toggleBurger}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup" onClick={toggleBurger}>
            Sign Up
          </NavLink>
          <NavLink to="/login" onClick={toggleBurger}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}

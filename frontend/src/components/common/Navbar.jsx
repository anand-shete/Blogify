import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const user = useSelector((user) => user.user);
  const { pathname } = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <nav className="min-h-22 max-w-screen flex flex-row items-center justify-around sm:justify-stretch sm:space-x-20 text-white bg-stone-800">
      {/* Burger menu not open */}
      {!isBurgerOpen && (
        <>
          <NavLink to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="h-10 ml-4 hidden sm:inline-block rounded-2xl hover:scale-110 transition-transform bg-white"
            />
            <img
              src="/small-logo.png"
              alt="logo"
              className="h-10 ml-5 inline-block sm:hidden rounded-2xl hover:scale-110 transition-transform bg-white"
            />
          </NavLink>

          <NavLink
            to="/user/home"
            className="ml-10 hidden sm:inline hover:bg-stone-300 hover:scale-120 hover:shadow-custom hover:shadow-stone-900 hover:text-black transition-transform rounded-md px-3 py-2"
          >
            Home
          </NavLink>

          {/* Dropdown else Signup, Login buttons */}
          {user._id ? (
            <>
              <NavLink
                to="/user/add-blog"
                className="hidden sm:inline hover:bg-stone-300 hover:scale-120 hover:shadow-custom hover:shadow-stone-900 hover:text-black transition-transform rounded-md px-3 py-2"
              >
                Add Blog
              </NavLink>

              <NavLink
                to="/user/logout"
                className="hidden sm:inline hover:bg-stone-300 hover:scale-120 hover:shadow-custom hover:shadow-stone-900 hover:text-black transition-transform rounded-md px-3 py-2"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/user/signup"
                className="hidden sm:inline hover:bg-stone-300 hover:scale-120 hover:shadow-custom hover:shadow-stone-900 hover:text-black transition-transform rounded-md px-3 py-2"
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/user/login"
                className="hidden sm:inline hover:bg-stone-300 hover:scale-120 hover:shadow-custom hover:shadow-stone-900 hover:text-black transition-transform rounded-md px-3 py-2"
              >
                Login
              </NavLink>
            </>
          )}
        </>
      )}
      <NavLink
        to="/user/home"
        className={`sm:hidden ${isBurgerOpen ? "hidden" : "inline"}`}
      >
        Home
      </NavLink>
      {/* Hamburger menu icon*/}
      <Button
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
        className={`${isBurgerOpen ? "hidden" : "inline"} sm:hidden`}
      >
        <img src="/burger.png" alt="burger" className="w-5" />
      </Button>
      <Button
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
        className={`${
          !isBurgerOpen ? "hidden" : "block"
        } sm:hidden fixed top-7 right-8`}
      >
        <img src="/cross.svg" alt="cross" className="w-5" />
      </Button>

      {/* Burger menu open */}
      {isBurgerOpen && (
        <div className="sm:hidden min-h-screen max-w-screen mt-30 flex flex-col justify-start text-center space-y-5">
          <NavLink to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="h-10 bg-white rounded-2xl mb-15"
            />
          </NavLink>
          <NavLink
            to={`${user._id ? "/user/home" : "/"}`}
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="px-3 py-2 bg-stone-900 rounded-md"
          >
            Home
          </NavLink>
          <NavLink
            to="/user/signup"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="px-3 py-2 bg-stone-900 rounded-md"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/user/login"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="px-3 py-2 bg-stone-900 rounded-md"
          >
            Login
          </NavLink>
          <NavLink
            to="/user/add-blog"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="px-3 py-2 bg-stone-900 rounded-md"
          >
            Add Blog
          </NavLink>
          <NavLink
            to="/user/logout"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className="px-3 py-2 bg-stone-900 rounded-md"
          >
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
}

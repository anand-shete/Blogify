import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { motion } from "motion/react";

export default function NavbarLinks() {
  const user = useSelector(user => user.user);
  return (
    <motion.div className="hidden space-x-10 *:rounded-md *:bg-stone-100 *:px-3 *:py-2 *:transition-all *:hover:bg-stone-800 *:hover:text-white *:hover:shadow-custom *:hover:shadow-stone-400 sm:block">
      {user._id ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/user/dashboard">Dashboard</NavLink>
          <NavLink to="/user/blog/add">Add Blog</NavLink>
          <NavLink to="/user/logout">Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/user/signup">Sign Up</NavLink>
          <NavLink to="/user/login">Login</NavLink>
        </>
      )}
    </motion.div>
  );
}

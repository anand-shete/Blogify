import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Button } from "../ui/button";

export default function DesktopNavbar() {
  const user = useSelector(user => user.user);

  return (
    <div className="**:transition-all **:hover:scale-120 **:hover:underline hidden space-x-10 duration-300 sm:block">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>

      {user._id ? (
        <>
          <Link to="/blog/add">Add Blog</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}

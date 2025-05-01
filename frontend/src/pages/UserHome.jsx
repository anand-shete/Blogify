import api from "@/api";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/features/userSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { clearAllBlogs, setAllBlogs } from "@/features/blogSlice";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common";

export default function UserHome() {
  const user = useSelector((user) => user.user);
  const blogs = useSelector((blogs) => blogs.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      dispatch(clearAllBlogs());
      try {
        if (!user._id) {
          const res = await api.get("/user/auth/status");
          dispatch(setUser(res.data));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/login");
      }

      try {
        if (user._id) {
          const res = await api.get(`/blog/blogs/${user._id}`);
          dispatch(setAllBlogs(res.data));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [user, blogs]);

  return (
    <div className="min-h-screen max-w-screen">
      <h1 className="text-2xl text-center my-10">Welcome, {user.name}</h1>
      <div className="min-h-screen max-w-screen my-20 text-center grid grid-cols-1 xl:grid-cols-4 gap-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="h-fit mx-10 hover:scale-110 transition-transform"
              >
                <CardHeader>
                  <img
                    src={blog.coverImageURL}
                    alt="image"
                    className="w-full h-full object-contain"
                  />
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="mx-auto"
                    onClick={() => navigate(`/${blog._id}`)}
                  >
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

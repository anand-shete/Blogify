import api from "@/api";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "@/features/userSlice";
import { setAllBlogs } from "@/features/blogSlice";

export default function UserHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(user => user.user);
  const blogs = useSelector(blogs => blogs.blogs);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (!user._id) {
      (async () => {
        try {
          const res = await api.get("/user/auth/status");
          dispatch(setUser(res.data));
        } catch (error) {
          console.log("error", error);
          toast.error(error.response.data.message);
          navigate("/user/login");
        }
      })();
    }
    if (user._id) {
      (async () => {
        try {
          const res = await api.get(`/blog/getBlogs/${user._id}`);
          dispatch(setAllBlogs(res.data));
        } catch (error) {
          console.log("erroring getting blogs", error);
          toast.error(error.response.data.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, user]);
  return (
    <div className="min-h-screen max-w-screen">
      <h1 className="mt-15 mb-10 text-center text-2xl font-semibold sm:text-4xl">
        Welcome, {user.name}
      </h1>
      {loading ? (
        <div className="mx-auto flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen max-w-screen">
          {blogs.length === 0 ? (
            <div className="text-center text-muted-foreground sm:text-2xl">
              Your Blogs will be displayed here
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 text-center xl:grid-cols-3">
              {blogs.map(blog => (
                <Card
                  key={blog._id}
                  className="m-10 h-fit transition-transform hover:scale-102"
                >
                  <CardHeader>
                    <img
                      src={blog.coverImageURL}
                      alt="image"
                      className="h-full w-full rounded-sm"
                    />
                    <CardTitle className="text-xl sm:text-2xl">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="w-full justify-evenly [&_span]:hidden [&_span]:sm:inline">
                    <Button onClick={() => navigate(`/user/${blog._id}`)}>
                      <span>View</span>
                      <Eye />
                    </Button>
                    <Button
                      onClick={() => navigate(`/user/blog/edit/${blog._id}`)}
                    >
                      <span>Edit</span>
                      <Pencil />
                    </Button>
                    <Button
                      onClick={() => navigate(`/user/blog/delete/${blog._id}`)}
                    >
                      <span>Delete</span>
                      <Trash2 />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

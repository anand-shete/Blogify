import api from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common";
import { Eye, Trash2, Edit3, Plus } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "@/features/userSlice";
import { setAllBlogs } from "@/features/blogSlice";

export default function UserHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(user => user.user);
  const blogs = useSelector(blogs => blogs.blogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user._id) {
      (async () => {
        try {
          const res = await api.get("/user/auth/status");
          dispatch(setUser(res.data));
        } catch (error) {
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
          toast.error(error.response.data.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen max-w-screen">
      <div className="mx-auto mt-5 max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-gray-600">
              Edit or delete your published blog posts whenever you want.
            </p>
          </div>
          <Link to="/user/blog/add">
            <Button className="w-fit bg-stone-900 text-white hover:bg-stone-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </Link>
        </div>
        <h2 className="mt-10 -mb-5 text-2xl font-semibold">Your Posts</h2>
      </div>
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
            <div className="mx-auto mt-5 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map(blog => (
                <Card
                  key={blog._id}
                  className="group border-stone-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    {/* Blog Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={blog.coverImageURL}
                        alt={blog.title}
                        className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <h3 className="mb-4 line-clamp-2 text-center text-xl leading-tight font-semibold">
                        {blog.title}
                      </h3>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/user/${blog._id}`)}
                          className="flex-1 border-stone-200 text-gray-600 hover:bg-stone-50 hover:text-gray-900"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/user/blog/edit/${blog._id}`)}
                          className="flex-1 border-stone-200 text-gray-600 hover:bg-stone-50 hover:text-gray-900"
                        >
                          <Edit3 className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/user/blog/delete/${blog._id}`)}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

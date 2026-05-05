import api from "@/api";
import { ArrowUpRight, BookOpen, Compass, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setAllBlogs } from "@/features/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/common";

export default function LandingPageBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/blogs");
        dispatch(setAllBlogs(res.data.blogs));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border-b py-10 lg:py-20">
      <Link to="discover">
        <h1 className="text-heading mb-2">
          <Compass size={26} strokeWidth={1.5} className="mr-2" />
          Discover Blogs
          <ArrowUpRight size={20} />
        </h1>
      </Link>
      <p className="mb-10 text-center text-sm">
        Browse every blog ever published — discover stories, tutorials, and insights, all in one
        place.
      </p>
      <div className="mx-10 grid grid-cols-1 gap-16 text-center lg:mx-30 lg:grid-cols-2 xl:grid-cols-3">
        {blogs.map(blog => (
          <Card
            key={blog._id}
            className="group border-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={blog.coverImageURL}
                  alt={blog.title}
                  className="h-48 w-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
              </div>

              <h3 className="mt-6 mb-4 line-clamp-2 text-center text-xl leading-tight font-bold tracking-tight">
                {blog.title}
              </h3>

              <Button onClick={() => navigate(`/blog/view/${blog._id}`)}>
                <Eye />
                <span>View</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

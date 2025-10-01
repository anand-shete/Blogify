import api from "@/api";
import { BookOpen, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setAllBlogs } from "@/features/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/common";

export default function OurBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/blogs");
        dispatch(setAllBlogs(res.data.blogs));
      } catch (error) {
        // console.log("error in getting all blgos", error);
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
      <h1 className="text-primary mb-4 flex items-center justify-center text-2xl font-semibold lg:text-4xl">
        <BookOpen className="lg:scale-130 mr-3 scale-110" strokeWidth={1.5} />
        Explore All Blogs
      </h1>
      <p className="mb-10 text-center">
        Browse every blog ever published — discover stories, tutorials, and insights, all in one
        place.
      </p>
      <div className="grid min-w-full grid-cols-1 gap-10 text-center lg:grid-cols-2 xl:grid-cols-3">
        {blogs.map(blog => (
          <Card
            key={blog._id}
            className="hover:scale-102 mx-10 h-fit transition-transform lg:mx-20"
          >
            <CardHeader>
              <img
                src={blog.coverImageURL}
                alt="image"
                className="h-full w-full rounded-sm object-contain"
                onClick={() => navigate(`user/${blog._id}`)}
              />
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardFooter className="w-full justify-center [&_span]:hidden [&_span]:sm:inline">
              <Button onClick={() => navigate(`/${blog._id}`)}>
                <Eye className="mb-[1px]" />
                <span>View</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

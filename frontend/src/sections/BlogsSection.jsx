import api from "@/api";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setAllBlogs } from "@/features/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/common";

export default function BlogsSection() {
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

  return (
    <>
      {loading ? (
        <div className="mx-auto flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="">
          <h1 className="my-10 text-center text-2xl font-semibold xl:text-4xl">Our Blogs</h1>
          <div className="my-20 grid min-h-screen max-w-screen grid-cols-1 gap-10 text-center xl:grid-cols-3">
            {blogs.map(blog => (
              <Card key={blog._id} className="mx-10 h-fit transition-transform hover:scale-102">
                <CardHeader>
                  <img
                    src={blog.coverImageURL}
                    alt="image"
                    className="h-full w-full rounded-sm object-contain"
                    onClick={() => navigate(`user/${blog._id}`)}
                  />
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardFooter className="w-full justify-evenly [&_span]:hidden [&_span]:sm:inline">
                  <Button onClick={() => navigate(`/user/${blog._id}`)}>
                    <span>View</span>
                    <Eye />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

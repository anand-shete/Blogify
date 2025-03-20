import api from "@/api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAllBlogs } from "@/features/blogSlice";
import { Loader } from "..";

export default function Blogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((blogs) => blogs.blogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.get("/all-blogs");
      dispatch(setAllBlogs(res.data.blogs));
      setLoading(false);
    })();
  }, []);
  return (
    <>
      <h1 className="text-2xl xl:text-4xl font-semibold text-center my-10">
        Our Blogs
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen max-w-screen my-20 text-center grid grid-cols-1 xl:grid-cols-4 gap-10">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="h-90 mx-10 flex flex-col justify-around hover:scale-110 transition-transform"
            >
              <CardHeader>
                <img
                  src={blog.coverImageURL}
                  alt="image"
                  className="h-full w-full object-contain"
                />
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  className="mx-auto"
                  onClick={() => navigate(`/user/${blog._id}`)}
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

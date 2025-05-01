import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/hooks/useGetAllBlogs";
import { useSelector } from "react-redux";

export default function BlogsSection() {
  const blogs = useSelector(blogs => blogs.blogs);
  getAllBlogs();
  return (
    <>
      <h1 className="my-10 text-center text-2xl font-semibold xl:text-4xl">Our Blogs</h1>

      <div className="my-20 grid min-h-screen max-w-screen grid-cols-1 gap-10 text-center xl:grid-cols-4">
        {blogs.map(blog => (
          <Card
            key={blog._id}
            className="mx-10 flex h-90 flex-col justify-around transition-transform hover:scale-110"
          >
            <CardHeader>
              <img src={blog.coverImageURL} alt="image" className="h-full w-full object-contain" />
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button className="mx-auto" onClick={() => navigate(`/${blog._id}`)}>
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common";
import { useSetUser } from "@/hooks/useSetUser";
import { useSetUserBlogs } from "@/hooks/useSetUserBlogs";
import { Pencil, Trash2 } from "lucide-react";

export default function UserHome() {
  const user = useSelector(user => user.user);
  const blogs = useSelector(blogs => blogs.blogs);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const loading1 = useSetUser();
  const loading2 = useSetUserBlogs();

  useEffect(() => {
    if (loading1 && loading2) setLoading(false);
  }, []);

  return (
    <div className="min-h-screen max-w-screen">
      <h1 className="my-10 text-center text-2xl sm:text-4xl">Welcome, {user.name}</h1>
      {loading ? (
        <div className="mx-auto flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="my-20 grid min-h-screen max-w-screen grid-cols-1 gap-10 text-center xl:grid-cols-3">
          {blogs.map(blog => (
            <Card key={blog._id} className="mx-10 h-fit transition-transform hover:scale-105">
              <CardHeader>
                <img
                  src={blog.coverImageURL}
                  alt="image"
                  className="h-full w-full rounded-sm object-contain"
                />
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardFooter className={""}>
                <Button className="mx-auto" onClick={() => navigate(`/${blog._id}`)}>
                  View
                </Button>
                <Pencil className="mr-2 h-8 w-8 rounded-md bg-stone-900 text-white" onClick={""}/>
                <Trash2 className="ml-2 h-8 w-8 bg-stone-900 text-white" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

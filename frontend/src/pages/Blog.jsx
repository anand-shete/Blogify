import api from "@/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setComments } from "@/features/blogSlice";

const formSchema = z.object({
  content: z.string().min(1, { message: "Content cannot be empty" }),
});

export default function Blog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const user = useSelector((user) => user.user);
  const blogs = useSelector(blogs=> blogs.blogs)
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
console.log(blogs);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/blog/${blogId}`);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/user/home");
      }
    })();
  }, []);

  const submit = async (data) => {
    try {
      const res = await api.post(`/blog/add-comment/${blog._id}`, data);
      toast.success(res.data.message);
      dispatch(setComments(res.data.commentArr));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen max-w-screen my-20 flex flex-col items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <img
            src={blog.coverImageURL}
            alt="coverImageURL"
            className="lg:max-w-[50vw] rounded-md mb-10"
          />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </>
      )}

      <h1 className="text-2xl mt-30">Comments</h1>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col space-y-5 my-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">{user.name}</FormLabel>
                <FormControl>
                  <Input
                    className="w-[full]"
                    placeholder="What do u feel?"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Comment</Button>
        </form>
      </Form>
    </div>
  );
}

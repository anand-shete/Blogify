import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router";
import api from "@/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/userSlice";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "@/components";

const formSchema = z.object({
  title: z.string().min(1, { message: "Blog Title required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  blogCoverImage: z
    .instanceof(FileList)
    .refine(
      (files) => !files || files[0].type.startsWith("image"),
      "File must be an image"
    )
    .optional(),
});

export default function AddBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.user);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/check-auth");
        dispatch(setUser(res.data));
      } catch (error) {
        navigate("/user/login");
      }
    })();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      blogCoverImage: undefined, // FileList can't have a default ""
    },
  });

  const submit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("userId", user._id);
      if (data.blogCoverImage)
        formData.append("blogCoverImage", data.blogCoverImage[0]);

      const res = await api.post("/blog/add-blog", formData);
      navigate("/user/home");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen m-10 sm:m-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col space-y-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blog Cover image  */}
          <FormField
            control={form.control}
            name="blogCoverImage" // must be same in backend
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Tiny MCE editor */}
          {loading && <Loader />}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Content</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    onInit={(evt, editor) => setloading(false)}
                    onEditorChange={(newContent, editor) => {
                      field.onChange(newContent);
                    }}
                    value={field.value} // Bind to form state
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                      height: 500,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-[20vh]">
            Add Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}

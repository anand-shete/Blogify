import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router";
import api from "@/api";
import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "@/components/common";
import { useSetUser } from "@/hooks/useSetUser";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, { message: "Blog Title required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  blogCoverImage: z
    .instanceof(FileList)
    .refine(files => !files || files[0].type.startsWith("image"), "File must be an image")
    .optional(),
});

export default function AddBlog() {
  const navigate = useNavigate();
  const user = useSelector(user => user.user);
  const [loading, setloading] = useState(true);
  useSetUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      blogCoverImage: undefined,
    },
  });

  const submit = async data => {
    try {
      const file = data?.blogCoverImage?.[0];
      let coverImageURL;

      if (file) {
        const res = await api.get("/blog/generateSignedUrl");
        const url = res.data.url;

        await axios.put(url, file, {
          headers: { "Content-Type": file.type },
        });
        coverImageURL = url.split("?")[0];
      }
      const res = await api.post("/blog/blog/add", { ...data, coverImageURL, email: user.email });
      navigate("/user/dashboard");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="m-10 flex min-h-screen max-w-screen flex-col sm:m-20">
      <Button className="mb-5 w-fit self-end hover:scale-110">Add Blog</Button>
      <Form {...form} className="">
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog Title" type="text" {...field} className="p-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blog Cover image  */}
          <FormField
            control={form.control}
            name="blogCoverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Cover Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={e => field.onChange(e.target.files)}
                    className="cursor-pointer file:mt-1 file:mr-5"
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
                <FormLabel className="ml-1 text-2xl">Text Editor</FormLabel>
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

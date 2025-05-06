import { z } from "zod";
import { htmlToText } from "html-to-text";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import api from "@/api";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "@/components/common";
import axios from "axios";
import { setUser } from "@/features/userSlice";
import { Brain, CirclePlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(1, { message: "Blog Title required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  blogCoverImage: z
    .instanceof(FileList)
    .refine(
      files => !files || files[0].type.startsWith("image"),
      "File must be an image",
    )
    .optional(),
});

export default function AddBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(user => user.user);
  const [loading, setLoading] = useState(true);
  const [generate, setGenerate] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const [useAI, setUseAI] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/auth/status");
        dispatch(setUser(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/user/login");
      }
    })();
  }, []);

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
      const res = await api.post("/blog/add", {
        ...data,
        coverImageURL,
        _id: user._id,
      });
      navigate("/user/dashboard");
      toast.success(res.data.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error.respose.data.message || "Some Error Occured");
    }
  };

  const enchance = async () => {
    if (!contentRef.current.getContent() || !titleRef.current.value) {
      toast.warning("Both Title and Content are required");
      return;
    }

    try {
      setUseAI(true);
      const plainText = htmlToText(contentRef.current.getContent(), {
        wordwrap: false,
        selectors: [
          { selector: "a", options: { ignoreHref: true } },
          { selector: "sup", format: "skip" },
        ],
      });

      const res = await api.post("/blog/improve", {
        content: plainText,
        title: titleRef.current.value,
      });

      setGenerate(res.data.content);
      setUseAI(false);
    } catch (error) {}
  };

  return (
    <div className="m-10 flex min-h-screen max-w-screen flex-col sm:m-20">
      <Button
        className="mb-5 w-fit self-end hover:scale-110"
        onClick={form.handleSubmit(submit)}
      >
        <CirclePlus />
        Add Blog
      </Button>
      <Form {...form} className="">
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col space-y-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blog Title"
                    type="text"
                    className="p-3"
                    {...field}
                    ref={el => {
                      field.ref(el); // attach RHF's ref
                      titleRef.current = el; // attach our custom ref
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blogCoverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">
                  Cover Image (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={e => field.onChange(e.target.files)}
                    className="cursor-pointer file:mr-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                <Brain className="relative top-[-3px] mr-1 inline text-green-600" />
                AI Suggestions
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                Use Artificial Intelligence to refine your content.
              </span>
              <CardDescription>
                <Button
                  className="transition-all duration-200 hover:scale-110 hover:bg-green-600"
                  onClick={enchance}
                  type="button"
                >
                  <Brain />
                  Get Suggestions
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {useAI ? (
                <p>Please Wait...</p>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {generate}
                </ReactMarkdown>
              )}
            </CardContent>
          </Card>

          {loading && <Loader />}
          {/* Tiny MCE editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Text Editor</FormLabel>
                <FormMessage />
                <FormControl>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    onInit={(evt, editor) => {
                      contentRef.current = editor;
                      setLoading(false);
                    }}
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
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-[20vh] hover:scale-110">
            <CirclePlus />
            Add Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}

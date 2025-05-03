import { z } from "zod";
import api from "@/api";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { NavLink, useNavigate, useParams } from "react-router";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name field in required" }),
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
  profileImageURL: z
    .instanceof(FileList)
    .refine(files => !files || files[0].type.startsWith("image"), "File must be an image")
    .optional(),
});

export default function Signup() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImageURL: undefined, // FileList cannot default to ""
    },
  });
  const Oauth = async () => {
    window.location.href = `${import.meta.env.VITE_BASEURL}/user/auth/google`;
  };

  const submit = async data => {
    try {
      const file = data?.profileImageURL?.[0];
      let profileImageURL;

      const check = await api.post("/user/check", data);
      if (check.data) {
        toast.error("Account Already exists");
        return;
      }

      if (file) {
        const res = await api.get("/user/generateSignedUrl");
        const url = res.data.url;

        await axios.put(url, file, {
          headers: { "Content-Type": file.type },
        });
        profileImageURL = url.split("?")[0];
      }

      const res = await api.post("/user/signup", { ...data, profileImageURL });
      toast.success(res.data.message);
      navigate("/user/login");
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Account couldn't be created");
    }
  };

  return (
    <div className="flex min-h-screen max-w-screen flex-col items-center justify-center bg-stone-200">
      <Card className="mx-5 min-w-100 text-center shadow-2xl shadow-black">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create your Blogify account and Start writing</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon Doe" type="text" autoComplete="on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhon@gmail.com"
                        type="email"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="123" type="password" autoComplete="on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileImageURL" // must be same in backend
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Profile Image (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={e => field.onChange(e.target.files)}
                        className={"file:mr-2 file:cursor-pointer file:font-bold"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign Up</Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-1 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full" onClick={Oauth} type="button">
                <img src="/google.svg" alt="google Logo" className="h-4" />
                Sign Up with Google
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <NavLink to="/user/login" className="underline underline-offset-4">
                  Login
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

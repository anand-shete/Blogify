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
import { useDispatch } from "react-redux";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name field in required" }),
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
  profileImageURL: z
    .instanceof(FileList)
    .refine(
      (files) => !files || files[0].type.startsWith("image"),
      "File must be an image"
    )
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
      profileImageURL: undefined, // FileList can't have a default ""
    },
  });

  const submit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.profileImageURL) {
        formData.append("profileImageURL", data.profileImageURL[0]);
      }

      const res = await api.post("/user/signup", formData);
      toast.success(res.data.message);
      navigate("/user/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Account couldn't be created"
      );
      if (error.status === 409) navigate("/user/login");
    }
  };

  return (
    <div className="max-w-screen flex flex-col justify-center items-center">
      <Card className="my-20 mx-5 min-w-80 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your details below to Sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jhon Doe"
                        type="text"
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
                      <Input
                        placeholder="123"
                        type="password"
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
                name="profileImageURL" // must be same in backend
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Profile Image</FormLabel>
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
              <Button type="submit">Sign Up</Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <NavLink
                  to="/user/login"
                  className="underline underline-offset-4"
                >
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

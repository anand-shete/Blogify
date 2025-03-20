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
import { setUser } from "@/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
});

export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((user) => user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await api.get("/user/simple-auth");
      dispatch(setUser(res.data)); 
    })();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submit = async (data) => {
    try {
      const res = await api.post("/user/signin", data);
      toast.success(res.data.message);
      navigate("/user/home");
    } catch (error) {
      if (error.status == 404) navigate("/user/signup");
      toast.error(error.response.data.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-screen flex flex-col justify-center items-center">
      <Card className="my-20 mx-5 min-w-80 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your details below to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col space-y-5"
            >
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
              <Button type="submit">Login</Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <NavLink
                  to="/user/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

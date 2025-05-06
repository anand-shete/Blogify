import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate, useLocation } from "react-router";
import api from "@/api";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
});

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  if (search.split("?")[1] === "error") {
    toast.error("Google Login Failed");
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Oauth = async () => {
    window.location.href = `${import.meta.env.VITE_BASEURL}/user/auth/google`;
  };

  const submit = async data => {
    try {
      const res = await api.post("/user/signin", data);
      toast.success(res.data.message);
      navigate("/user/dashboard");
    } catch (error) {
      // console.log("error", error.response);
      if (error.status == 404) navigate("/user/signup");
      toast.error(error.response.data.message || "Login Failed");
    }
  };

  return (
    <div className="flex max-w-screen flex-col items-center justify-center bg-stone-200">
      <Card className="mx-5 my-20 px-5 text-center shadow-2xl shadow-black md:min-w-110">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your details below to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-5">
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
              <Button type="submit">Login</Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-1 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full border-black"
                onClick={Oauth}
                type="button"
              >
                <img src="/google.svg" alt="google Logo" className="h-4" />
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <NavLink to="/user/signup" className="underline underline-offset-4">
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

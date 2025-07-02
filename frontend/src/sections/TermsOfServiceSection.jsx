import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { NavLink } from "react-router";

export default function TermsOfServiceSection() {
  return (
    <div className="flex max-w-screen items-center justify-center">
      <Card className="my-40 w-[60vw] py-10 text-center shadow-2xl shadow-black/60">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center text-2xl">
            <ShieldAlert className="relative top-1 mr-1 text-gray-600" />
            Terms Of Service
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          Blogify is a free platform built for educational and hobby purposes. By using this
          website, you agree to not misuse the platform or engage in harmful activity. There is no
          guarantee of uptime or data retention. This is not a commercial product.
        </CardContent>
        <NavLink to="/">
          <Button>Home</Button>
        </NavLink>
      </Card>
    </div>
  );
}

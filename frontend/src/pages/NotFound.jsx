import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="flex max-w-screen items-center justify-center">
      <Card className="my-40 w-[60vw] py-10 text-center shadow-2xl shadow-black/60">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center text-2xl">
            <CircleAlert className="relative top-1 mr-1 text-red-600" />
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>Sorry, the page you're looking for doesn't exist</CardContent>
        <NavLink to="/user/dashboard">
          <Button>Dashboard</Button>
        </NavLink>
      </Card>
    </div>
  );
}

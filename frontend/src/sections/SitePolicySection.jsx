import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { NavLink } from "react-router";

export default function SitePolicySection() {
  return (
    <div className="flex max-w-screen items-center justify-center">
      <Card className="my-40 w-[60vw] py-10 text-center shadow-2xl shadow-black/60">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center text-2xl">
            <Info className="relative top-1 mr-1 text-gray-600" />
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          We don't collect or share any personal data other than your Google account details used
          for login via OAuth. Your blog content is stored securely in our database and not shared
          with third parties. This project is a personal, non-commercial project created for
          learning purposes only.
        </CardContent>
        <NavLink to="/">
          <Button>Home</Button>
        </NavLink>
      </Card>
    </div>
  );
}

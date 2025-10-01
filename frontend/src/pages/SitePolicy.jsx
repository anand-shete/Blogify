import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { NavLink } from "react-router";

// renamed to SitePolicy to avoid brave from blocking this component
export default function SitePolicy() {
  return (
    <div className="flex min-w-full items-center justify-center">
      <Card className="lg:my-30 my-20 w-[80vw] py-10 text-center shadow-2xl shadow-black/60 lg:w-[60vw]">
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

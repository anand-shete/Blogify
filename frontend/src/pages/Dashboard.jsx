import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useFetchBlogs from "@/hooks/useFetchBlogs";
import { DashboardSection, DashboardLoader } from "@/components/Dashboard";

export default function UserHome() {
  const { blogs, loading, user } = useFetchBlogs();

  return (
    <div className="min-h-screen min-w-full">
      <div className="mx-10 mt-5 px-4 pt-10 lg:mx-30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold md:text-3xl">Welcome back, {user.name}</h1>
            <p className="text-sm text-gray-600">Create, edit, and share your stories anytime.</p>
          </div>
          <Link to="/blog/add">
            <Button size="lg">
              Add Blog
              <Plus />
            </Button>
          </Link>
        </div>
        <h2 className="mt-10 text-base md:text-xl">Your Blogs</h2>
      </div>

      <div className="min-w-full">
        {loading ? <DashboardLoader /> : <DashboardSection blogs={blogs} />}
      </div>
    </div>
  );
}

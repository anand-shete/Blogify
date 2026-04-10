import api from "@/api";
import { Loader } from "@/components/common";
import { DashboardSection } from "@/components/Dashboard";
import { Compass } from "lucide-react";
import { useEffect, useState } from "react";

const DiscoverBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="text-primary mt-14 flex text-2xl font-semibold tracking-tight md:text-3xl">
        <Compass size={30} className="mr-2 mt-px" />
        <h1>Discover Blogs</h1>
      </div>
      <p className="mt-2 text-sm text-neutral-600">
        Browse content created by users across the platform
      </p>

      <div className="mt-5">
        <DashboardSection blogs={blogs} />
      </div>
    </div>
  );
};

export default DiscoverBlogs;

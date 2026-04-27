import api from "@/api";
import { Loader } from "@/components/common";
import { DashboardLoader, DashboardSection } from "@/components/Dashboard";
import { Compass } from "lucide-react";
import { useEffect, useState } from "react";

const DiscoverBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <div className="text-primary mt-14 flex text-2xl font-semibold tracking-tight md:text-3xl">
        <Compass size={30} className="mt-px mr-2" />
        <h1>Discover Blogs</h1>
      </div>
      <p className="mt-2 text-sm text-neutral-600">
        Browse content created by users across the platform
      </p>

      <div className="mt-5">
        {loading ? <DashboardLoader /> : <DashboardSection blogs={blogs} />}
      </div>
    </div>
  );
};

export default DiscoverBlogs;

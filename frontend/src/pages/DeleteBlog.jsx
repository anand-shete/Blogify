import api from "@/api";
import { Loader } from "@/components/common";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function DeleteBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.delete(`/blog/delete/${blogId}`);
        console.log("res", res.data);
        toast.success(res.data.message);
        navigate("/user/dashboard");
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-[80vh] max-w-screen flex-col items-center justify-center">
      <h1 className="mb-15 text-2xl sm:text-5xl">Please Wait</h1>
      <Loader />
    </div>
  );
}

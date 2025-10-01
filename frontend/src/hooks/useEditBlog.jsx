import api from "@/api";
import { setUser } from "@/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const useEditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/auth/status");
        dispatch(setUser(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/login");
      }
    })();

    if (blogId) {
      (async () => {
        try {
          const res = await api.get(`/blog/${blogId}`);
          setBlog({
            content: res.data.blog.content,
            title: res.data.blog.title,
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    }
  }, []);
};

export default useEditBlog;

import { setAllBlogs } from "@/features/blogSlice";
import api from "@/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSetUserBlogs = () => {
  const dispatch = useDispatch();
  const user = useSelector(user => user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/blog/getBlogs/${user.email}`);
        dispatch(setAllBlogs(res.data));
      } catch (error) {
        console.log("error", error);
        console.log("axios error", error.response.data);
      } finally {
        setLoading(false);
      }
    };
    if (user.name) fetchData();
  }, [dispatch, user]);
  return loading;
};

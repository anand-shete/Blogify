import { setAllBlogs } from "@/features/blogSlice";
import api from "@/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const getAllBlogs = () => {
  const user = useSelector(user => user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/blogs");
        dispatch(setAllBlogs(res.data.blogs));
      } catch (error) {
        console.log("error in getting all blgos", error);
      }
    })();
  }, []);
};

import { setAllBlogs } from "@/features/blogSlice";
import api from "@/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const getAllBlogs = () => {
  const navigate = useNavigate();
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

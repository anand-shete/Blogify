import { setAllBlogs } from "@/features/blogSlice";
import api from "@/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useSetUserBlogs = () => {
  const dispatch = useDispatch();
  const user = useSelector(user => user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, [dispatch, user]);
  return loading;
};

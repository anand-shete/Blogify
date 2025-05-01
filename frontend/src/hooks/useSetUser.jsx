import api from "@/api";
import { setUser } from "@/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await api.get("/user/auth/status");
      dispatch(setUser(res.data));
    })();
  }, []);
};

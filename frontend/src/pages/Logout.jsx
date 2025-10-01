import api from "@/api";
import { Loader } from "@/components/common";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/userSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/logout");
        navigate("/");
        dispatch(clearUser());
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="flex min-h-[80vh] min-w-full flex-col items-center justify-center">
      <h1 className="mb-15 text-2xl sm:text-5xl">Please Wait</h1>
      <Loader />
    </div>
  );
}

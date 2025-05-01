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
        await api.get("/user/logout");
        dispatch(clearUser());
        navigate("/");
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="max-w-screen flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="mb-15 text-2xl lg:text-5xl">Please Wait</h1>
      <Loader />
    </div>
  );
}

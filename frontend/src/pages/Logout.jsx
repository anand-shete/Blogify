import api from "@/api";
import { Loader } from "@/components";
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
    <div className="min-h-[80vh] max-w-screen flex flex-col justify-center items-center ">
      <h1 className="text-2xl lg:text-5xl mb-15">Please Wait</h1>
      <Loader />
    </div>
  );
}

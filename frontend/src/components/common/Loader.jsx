import { BarLoader } from "react-spinners";
import img from "@/assets/hero1.svg";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 z-10 flex min-h-screen min-w-full flex-col items-center justify-center space-y-10 bg-white">
      <img src={img} alt="loader" className="h-[20vh]" />
      <BarLoader width={130} color="#4f46e5" className="mb-20" />
    </div>
  );
}

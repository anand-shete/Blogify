import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="fixed left-0 top-0 z-10 flex min-h-screen min-w-full items-center justify-center bg-white">
      <motion.div
        className="sm:scale-200 absolute h-20 w-20 rounded-full border-t-4 border-indigo-600"
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
}

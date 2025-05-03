import { motion } from "motion/react";

export default function Loader() {
  return (
    <motion.div
      className="mx-auto my-20 h-20 w-20 rounded-full border-t-4 border-stone-600 lg:scale-200"
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}

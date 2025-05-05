import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div className="relative flex h-screen max-w-screen flex-col items-center justify-center border-b-1 border-black bg-[url(/bg.svg)] bg-cover bg-fixed bg-center text-center text-white">
      <div className="absolute inset-0 h-screen max-w-screen bg-black/50 opacity-100" />
      <motion.h1
        className="relative text-3xl font-bold sm:text-5xl"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        Share Ideas, Inspire Minds — Welcome to Blogify
      </motion.h1>
      <p className="text-md relative pt-5 sm:text-2xl">
        A clean, powerful platform to write, share, and grow our stories with
        ease.
      </p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="max-w-screen relative flex h-screen flex-col items-center justify-center bg-[url(/bg.svg)] bg-cover bg-fixed bg-center text-center text-white">
      <div className="max-w-screen absolute inset-0 h-screen bg-black/50 opacity-100" />
      <h1 className="relative text-3xl font-bold sm:text-5xl">
        Share Ideas, Inspire Minds — Welcome to Blogify
      </h1>
      <p className="text-md relative pt-5 sm:text-2xl">
        A clean, powerful platform to write, share, and grow our stories with ease.
      </p>
    </div>
  );
}

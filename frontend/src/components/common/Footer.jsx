import { Github } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-stone-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Blogify</h3>
            <p className="mt-1 text-gray-400">Modern blogging made simple</p>
          </div>

          <div className="flex flex-col gap-6 *:text-stone-300 *:hover:text-white sm:flex-row sm:gap-8">
            <a
              href="https://github.com/anand-shete/Blogify"
              className="flex items-center gap-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href="/privacy-policy" className="transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2025 Blogify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

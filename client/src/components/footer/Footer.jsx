import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-pink-50 px-5 py-2 md:p-2">
      <div className="flex flex-row items-center justify-center gap-1 md:gap-4">
        <div className="border-r-2 border-gray-200">
          <Link to="/" className="flex flex-shrink-0 items-center pr-3">
            <img
              className="h-7 w-auto"
              src="/logo/baked-cake-cup-svgrepo-com.png"
              alt="Logo"
            />
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          Copywrite &copy; 2025 by Healthy Sweet Life. All rights reservered.
        </p>
      </div>
    </footer>
  );
}

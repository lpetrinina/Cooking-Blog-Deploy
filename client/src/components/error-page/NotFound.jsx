import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="text-gray-700">
      <div className="mt-20 px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-pink-400">404</h1>

          <p className="mt-4 text-2xl font-medium">Oops! Page not found</p>
          <p className="mb-8 mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="rounded-md bg-white px-6 py-3 font-bold transition duration-300 ease-in-out hover:bg-pink-100 hover:text-gray-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

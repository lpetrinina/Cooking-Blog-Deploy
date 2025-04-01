import { Link } from "react-router";

export default function ServerError() {
  return (
    <div className="text-gray-700">
      <div className="mt-20 px-2">
        <div className="text-center">
          <h1 className="mb-3 text-9xl font-bold text-pink-400">500</h1>
          <h2 className="text-2xl text-pink-400">Internal Server Error</h2>

          <p className="mt-4 text-2xl font-medium">
            Oh no! Something bad happened.
          </p>
          <p className="mb-8 mt-4">
            Please come back later when we fixed that problem. Thanks.
          </p>
        </div>
      </div>
    </div>
  );
}

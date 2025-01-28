import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-cyan-600">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-700 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage

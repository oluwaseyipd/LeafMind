import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-cyan-900">
      <div className="text-center max-w-md mx-auto px-4">
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <BookOpen className="text-cyan-600 w-16 h-16" />
        </div>

        <h1 className="text-6xl font-bold text-cyan-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Oops! Page not found
        </h2>
        <p className="text-lg text-cyan-100 mb-8">
          The page you're looking for doesn't exist. Maybe it's time to discover a new book instead?
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Link>

          <div className="text-center">
            <Link
              to="/books"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Or browse our book collection →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition">
              <span className="text-white font-bold text-lg">
                J
              </span>
            </div>

            <span className="text-xl font-bold text-white">
            JobPortal<span className="text-blue-500">Pro</span>
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {user ? (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  Profile
                </Link>

                {/* User Name */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    Hello, {user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-200 shadow-md shadow-red-600/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  Login
                </Link>

                {/* Signup */}
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 shadow-md shadow-blue-600/20"
                >
                  Signup
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
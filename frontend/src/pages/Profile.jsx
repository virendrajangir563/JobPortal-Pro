import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data.user);
      } catch (error) {
        setError(error.message);

        if (
          error.message === "Invalid or expired token" ||
          error.message === "No token provided"
        ) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="text-lg font-medium text-white">
            Loading profile...
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-2xl">
              !
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Something went wrong
          </h2>

          <p className="text-red-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/20">
            <span className="text-3xl font-bold text-white">
              {profile?.name?.charAt(0).toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            My Profile
          </h1>

          <p className="text-slate-400 mt-1">
            Manage your account information
          </p>

        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Card Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-5">

            <h2 className="text-lg font-bold text-slate-800">
              Account Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your personal account details
            </p>

          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">

            {/* Name */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Full Name
                </p>

                <p className="text-base font-semibold text-slate-800 mt-1">
                  {profile?.name}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">
                  N
                </span>
              </div>

            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email Address
                </p>

                <p className="text-base font-semibold text-slate-800 mt-1 break-all">
                  {profile?.email}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">
                  @
                </span>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-5 flex justify-end">

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
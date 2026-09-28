import { useState } from "react";
import { signupUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // 1. Empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    // 2. Password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // 3. Password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // confirmPassword backend ko nahi bhejna
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const data = await signupUser(signupData);

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">

      {/* Main Container */}
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">

          {/* Logo */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-4">
            <span className="text-white text-2xl font-bold">
              A
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Create your account to get started
          </p>

        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="text-xs text-slate-400 mt-1.5">
                Password must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:-translate-y-0.5 shadow-blue-600/20"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200">
              <p className="text-center text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition"
            >
              Login
            </span>
          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © 2026 Auth System. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Signup;
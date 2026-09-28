import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const data = await loginUser(formData);

      login(data.user, data.token);

      setMessage(data.message);

      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">

      {/* Login Card */}
      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-4">
            <span className="text-white text-2xl font-bold">
              A
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Login to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Login
            </button>

          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-5 p-3 rounded-xl bg-green-50 border border-green-200">
              <p className="text-center text-sm font-medium text-green-600">
                {message}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-center text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Signup Link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700"
            >
              Create Account
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

export default Login;
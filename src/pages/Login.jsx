import React, { useState } from "react";
import { Mail, Lock, ShoppingBag, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    localStorage.removeItem("dashboard-token");

    const result = await loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    console.log("Login Success");

    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0B1120] flex items-center justify-center px-4 py-5 transition-colors duration-300">
      <div className="w-full max-w-6xl bg-white dark:bg-[#141B2D] rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 transition-colors duration-300">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-400 px-12 py-10 text-white">
          <div className="flex items-center gap-2 mb-8">
            <ShoppingBag size={26} />
            <h2 className="text-2xl font-bold">Koda Commerce</h2>
          </div>

          <h1 className="text-[52px] font-bold leading-tight">
            Manage Your Store
            <br />
            Like a Pro
          </h1>

          <p className="mt-5 text-[18px] text-blue-100 leading-9">
            Control products, orders, users, carts and analytics from a modern dashboard experience.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/15 rounded-xl py-4 px-5 backdrop-blur-sm">
              ✔ Product Management
            </div>
            <div className="bg-white/15 rounded-xl py-4 px-5 backdrop-blur-sm">
              ✔ Order Tracking
            </div>
            <div className="bg-white/15 rounded-xl py-4 px-5 backdrop-blur-sm">
              ✔ Customer Insights
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-12 py-10">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img
                src="src/services/KodaLogo2-D3eRgjLV.png"
                alt="logo"
                className="w-48"
              />
            </div>

            <h2 className="text-[#111827] dark:text-white text-5xl font-bold text-center transition-colors">
              Welcome Back
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-7 text-center text-lg transition-colors">
              Sign in to your admin dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-700 dark:text-gray-300 text-sm transition-colors">
                  Email Address
                </label>

                <div className="mt-2 flex items-center bg-gray-100 dark:bg-[#1D2740] rounded-xl px-4 transition-colors">
                  <Mail className="text-gray-500 dark:text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-4 px-3 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-300 text-sm transition-colors">
                  Password
                </label>

                <div className="mt-2 flex items-center bg-gray-100 dark:bg-[#1D2740] rounded-xl px-4 transition-colors">
                  <Lock className="text-gray-500 dark:text-gray-400" size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent py-4 px-3 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {error && (
              <p className="text-red-500 dark:text-red-400 mt-3 text-center text-sm font-medium">
                {error}
              </p>
            )}

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 transition-colors"></div>
              <span className="px-4 text-gray-500 dark:text-gray-400 transition-colors">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 transition-colors"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "https://e-commerce-api-3wara.vercel.app/auth/google";
              }}
              className="w-full py-4 rounded-xl bg-gray-100 dark:bg-[#1D2740] hover:bg-gray-200 dark:hover:bg-[#263352] transition flex items-center justify-center gap-3 text-gray-900 dark:text-white"
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6 transition-colors">
              Secure Admin Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React from "react";
import { Mail, Lock, ShoppingBag } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const { loginUser, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

     const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  const result = await loginUser(email, password);

  if (!result.success) {
    setError(result.message);
    return;
  }

  console.log("Login Success");
  navigate("/");
};
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-6xl bg-[#141B2D] rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-400 px-12 py-10 text-white">

          <div className="flex items-center gap-2 mb-8">
            <ShoppingBag size={26} />
            <h2 className="text-2xl font-bold">
              Koda Commerce
            </h2>
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

        {/* Right Side */}

        <div className="flex items-center justify-center px-12 py-10">

          <div className="w-full max-w-md">

            <div className="flex justify-center mb-6">
              <img
                src="src/KodaLogo2-D3eRgjLV.png"
                alt="logo"
                className="w-48"
              />
            </div>

            <h2 className="text-white text-5xl font-bold text-center">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2 mb-7 text-center text-lg">
              Sign in to your admin dashboard
            </p>

            <form onSubmit={handleSubmit}  className="space-y-4" >
              <div>

                <label className="text-gray-300 text-sm">
                  Email Address
                </label>

                <div className="mt-2 flex items-center bg-[#1D2740] rounded-xl px-4">

                  <Mail className="text-gray-400" size={18} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full bg-transparent py-4 px-3 text-white outline-none"
                    />

                </div>

              </div>

              <div>

                <label className="text-gray-300 text-sm">
                  Password
                </label>

                <div className="mt-2 flex items-center bg-[#1D2740] rounded-xl px-4">

                  <Lock className="text-gray-400" size={18} />

                  <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full bg-transparent py-4 px-3 text-white outline-none"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                {loading ? "Loading..." : "Sign In"}
                </button>

            </form>

            {error && (
              <p className="text-red-500 mt-3 text-center">
                {error}
              </p>
            )}

            <div className="flex items-center my-6">

              <div className="flex-1 h-px bg-gray-700"></div>

              <span className="px-4 text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-700"></div>

            </div>

            <button
                  type="button"
                  onClick={() => {
                    window.location.href =
                      "https://e-commerce-api-3wara.vercel.app/auth/google";
                  }}
                  className="w-full py-4 rounded-xl bg-[#1D2740] hover:bg-[#263352] transition flex items-center justify-center gap-3 text-white"
                >
                  <FcGoogle size={24} />
                  <span>Continue with Google</span>
                </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Secure Admin Access
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Login

=======
export default Login;
>>>>>>> 096520aded8265af03bb7d293a257c9c120e9992

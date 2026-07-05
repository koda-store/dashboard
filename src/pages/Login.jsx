import React from 'react'

import { Mail, Lock, ShoppingBag } from "lucide-react";
import {FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-[#141B2D] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-400 p-12 text-white">

          <div className="flex items-center gap-2 mb-10">
            <ShoppingBag size={28} />
            <h2 className="text-3xl font-bold">
              Koda Commerce
            </h2>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Manage Your Store
            <br />
            Like a Pro
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Control products, orders, users, carts and analytics from one modern dashboard.
          </p>

          <div className="mt-12 space-y-5">

            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              ✔ Product Management
            </div>

            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              ✔ Order Tracking
            </div>

            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              ✔ Customer Insights
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12">

          <div className="w-full max-w-md">

            <div className="flex justify-center mb-8">
              <img
                src="https://placehold.co/220x80?text=LOGO"
                alt="logo"
                className="rounded-lg"
              />
            </div>

            <h2 className="text-white text-4xl font-bold text-center">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2 mb-8 text-center">
              Sign in to your admin dashboard
            </p>

            <form className="space-y-5">

              <div>
                <label className="text-gray-300 text-sm">
                  Email Address
                </label>

                <div className="mt-2 flex items-center bg-[#1D2740] rounded-xl px-4">

                  <Mail className="text-gray-400" size={18} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent p-4 text-white outline-none"
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
                    className="w-full bg-transparent p-4 text-white outline-none"
                  />

                </div>

              </div>

              <button
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-4 text-white font-semibold hover:opacity-90 transition"
              >
                Sign In
              </button>

            </form>

            <div className="flex items-center my-7">

              <div className="flex-1 h-px bg-gray-700"></div>

              <span className="px-4 text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-700"></div>

            </div>

            <button
              className="w-full bg-[#1D2740] rounded-xl py-5 text-white font-medium hover:bg-[#263352] transition"
            >
              <FcGoogle className="text-4xl "  />
              Continue with Google
            </button>

            <p className="text-center text-gray-500 text-sm mt-7">
              Secure Admin Access
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;



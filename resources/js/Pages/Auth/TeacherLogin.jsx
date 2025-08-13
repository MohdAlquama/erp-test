import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

function TeacherLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API request example
      console.log("Logging in teacher:", formData);
     let response =  await axiosInstance.post("/teacher/login", formData);
     console.log(response.data);
     
             router.visit("/teacher/dashboard");


    } catch (err) {
      console.error("Login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/logo.png" // Replace with your logo path
            alt="School Logo"
            className="w-20 h-20 mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">Teacher Login</h1>
          <p className="text-gray-500 text-sm">Welcome back! Please sign in.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="teacher@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-5 text-sm text-center text-gray-500">
          <a href="/forgot-password" className="hover:text-blue-600">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;

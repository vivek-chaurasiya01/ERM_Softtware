import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading, closeLoading } from "./utils/sweetAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading
    showLoading('Logging in...', 'Please wait while we verify your credentials');
    
    // Simulate API call
    setTimeout(async () => {
      closeLoading();
      
      if (email && password) {
        await showSuccess('Login Successful!', 'Welcome to Branch Admin Dashboard');
        Navigate("/dashbord");
      } else {
        await showError('Login Failed!', 'Please enter valid credentials');
      }
    }, 2000);

    console.log("Login Data:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Branch Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage your branch
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@branch.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 Branch Management System
        </p>
      </div>
    </div>
  );
}

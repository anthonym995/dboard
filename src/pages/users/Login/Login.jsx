import React from "react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

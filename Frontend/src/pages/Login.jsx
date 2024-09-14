import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              required
              className="w-full p-2 rounded bg-zinc-700 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={formData.password}
              // onChange={handleChange}
              required
              className="w-full p-2 rounded bg-zinc-700 text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-white mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

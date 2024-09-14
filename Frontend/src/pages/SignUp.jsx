import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">Signup</h2>

        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-400 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              // value={formData.username}
              // onChange={handleChange}
              required
              className="w-full p-2 rounded bg-zinc-700 text-white"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block  text-zinc-400 mb-2">
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
            <label htmlFor="password" className="block  text-zinc-400 mb-2">
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

          {/* Address Input Field */}
          <div className="mb-6">
            <label htmlFor="address" className="block  text-zinc-400 mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              // value={formData.address}
              // onChange={handleChange}
              required
              className="w-full p-2 rounded bg-zinc-700 text-white"
              placeholder="Enter your address"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            // disabled={loading}
          >
            Sign Up
          </button>
        </form>

        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

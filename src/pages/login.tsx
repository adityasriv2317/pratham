"use client";

// Login page for Hospital Management System using shadcn/ui and TailwindCSS
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Metadata } from "next";
import axios from "axios";

import { authActions } from "@/store/authSlice";

import img from "@/assets/splash.jpeg";
import { useDispatch } from "react-redux";
import Page from "@/app/page";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const metadata: Metadata = {
  title: "Pratham",
  description: "Generated by create next app",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    dispatch(authActions.loginStart());
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/users/login",
        {
          email,
          password,
          role,
          remember,
        },
        { withCredentials: true }
      );
      if (res.status == 200) {
        if (remember) {
          localStorage.setItem("accessToken", res.data.token);
        } else {
          sessionStorage.setItem("accessToken", res.data.token);
        }
        dispatch(authActions.loginSuccess(res.data));
        window.location.href = "/dashboard/" + role; // Redirect to the dashboard based on role
      } else {
        setError("Login failed. Please check your credentials.");
        dispatch(authActions.loginFailure(res.data));
        console.error("Login response error:", res.data);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex font-oxanium items-stretch bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Left side image section */}
      <div className="hidden md:flex w-1/2 min-h-full max-h-full items-center justify-center bg-gray-950">
        <img
          src={img.src}
          alt="Pratham Hospital Management"
          className="object-cover min-h-full max-h-full drop-shadow-2xl"
        />
      </div>
      {/* Right side login form */}
      <div className="flex flex-col max-h-full justify-center w-full md:w-1/2 px-4 sm:px-8 py-4 sm:py-6 bg-gray-900 bg-opacity-90 shadow-2xl overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white tracking-tight">
          Pratham
        </h2>
        <p className="text-center text-gray-400 mb-8 text-lg font-medium">
          Hospital Management System
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 px-0 sm:px-8 max-h-screen overflow-hidden not-md:overflow-auto">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {/* Email Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {/* Lock Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m12 0A2.25 2.25 0 0121 12.75v6A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-6A2.25 2.25 0 015.25 10.5h13.5z"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 placeholder-gray-500 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.77 9.77 0 0021 12c-1.5-2.5-4.5-6-9-6-1.61 0-3.09.37-4.41 1.01M3.64 7.64A9.77 9.77 0 003 12c1.5 2.5 4.5 6 9 6 1.61 0 3.09-.37 4.41-1.01"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.77 9.77 0 0021 12c-1.5-2.5-4.5-6-9-6-4.5 0-7.5 3.5-9 6a9.77 9.77 0 001.64 2.64M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* role */}
            <div className="mt-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="block w-full rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                {/* <option value="staff">Staff</option> */}
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-400 px-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-800 rounded"
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-400 hover:underline flex items-center gap-1"
            >
              Forgot password?
            </a>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 md:max-w-2/5 md:mx-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-60 relative"
            disabled={loading}
          >
            {loading ? <Loader /> : "Sign in"}
            {!loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </button>
          {/* register user */}
          <div className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";


const Login = () => {
  // ---------- Local state ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ---------- Redux & Router hooks ----------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  // Redirect handling
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // ---------- API hook ----------
  const [login, { isLoading }] = useLoginMutation();

  // ---------- Redux auth state ----------
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // ---------- Submit handler ----------
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success("Login successful ✅");
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  // ---------- UI ----------
  return (
    <div className="mt-20 p-6 md:p-10">
      <motion.section
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}>


      {/* Container respects Sidebar layout */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2 text-center text-slate-800">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-slate-500 mb-6 text-center">
          Please sign in to continue
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>



          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required/>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-800 transition disabled:opacity-60">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>


          {isLoading && <Loader />}
        </form>


        <p className="mt-6 text-sm text-center text-slate-600">
          New customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-slate-800 font-semibold hover:underline">
            Register
          </Link>
        </p>
        
      </div>
      </motion.section>
    </div>
  );
};

export default Login;

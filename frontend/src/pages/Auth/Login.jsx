import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredientials({ ...res }));
      toast.success("Login sucessfully")
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-100">
      <section className="bg-white p-8 rounded-2xl shadow-lg w-[28rem]">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-slate-500 mb-8 text-center">
          Please sign in to continue
        </p>

        {/* Form */}
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
              required/>
          </div>


          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700">
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


          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-800 transition disabled:opacity-60">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-slate-600">
          New customer?{" "}

          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-slate-800 font-semibold hover:underline">
            Register
          </Link>
          
        </p>
      </section>
    </div>
  );
};

export default Login;

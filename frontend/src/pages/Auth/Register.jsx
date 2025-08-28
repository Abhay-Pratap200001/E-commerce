import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

//set data to slice so store can access that
import { setCredientials } from "../../redux/features/auth/authSlice";

//for calling api to sending data to backermd i
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);


// Get the query string part from the current URL (everything after ?)
  const { search } = useLocation();

  // Convert the query string into an object we can read values from
  const sp = new URLSearchParams(search);

  // Get the "redirect" value from URL, or use "/" (home) if it doesn’t exist
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    // If user is logged in, send them to the redirect page (or home)
    if (userInfo) {
      navigate(redirect);
    }
  },[navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Registered successfully! 🎉");

        navigate(redirect);
      } catch (error) {}
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-100">
      <section className="bg-white p-8 rounded-2xl shadow-lg w-[28rem] border border-slate-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">
          Create Account
        </h1>
        <p className="text-slate-500 text-sm text-center mb-6">
          Please fill in your details to register
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}/>
          </div>


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
              className="mt-1 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
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
              className="mt-1 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>



          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-3 rounded-lg w-full border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>



          {/* Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="px-4 py-3 w-full rounded-lg font-medium text-white bg-slate-600 hover:bg-slate-700 transition-all duration-200 disabled:opacity-60">
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-slate-800 font-medium hover:underline">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;

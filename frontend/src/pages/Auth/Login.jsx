import React from "react";
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//to perform the login actions
import { useLoginMutation } from "../../redux/api/usersApiSlice";

//to add in store data of user that user is login or logout
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  //accessing user info to check or insert data when user login or logout in redux store
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
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-100">
  <section className="bg-white p-8 rounded shadow-md w-[30rem]">
    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

    <form onSubmit={submitHandler} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 rounded w-full border-2 bg-slate-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 rounded w-full border-2 bg-slate-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="px-4 py-2 w-full rounded cursor-pointer bg-slate-300 transition-all hover:bg-slate-400"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      {isLoading && <Loader />}
    </form>

    <p className="mt-4 text-sm text-center">
      New Customer?{" "}
      <Link
        to={redirect ? `/register?redirect=${redirect}` : "/register"}
        className="text-red-500 hover:underline"
      >
        Register
      </Link>
    </p>
  </section>
</div>

  );
};

export default Login;

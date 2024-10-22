import { useEffect, useState } from "react";
import loginImg from "../assets/loginPage.webp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../reducer/authSlice";
import { getUserData } from "../reducer/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Too short!")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      dispatch(loginUser(values)).then(() => {
        dispatch(getUserData());
      });
    },
  });

  // Redirect to dashboard if token is present
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token]); // Listen for changes in the token

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side with To-Do Image */}
      <div className="hidden lg:flex flex-1 bg-blue-500 items-center justify-center">
        <img
          src={loginImg}
          alt="To-Do Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side with Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {/* Error message */}
          {error && (
            <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded-md">
              {error}
            </div>
          )}

        
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex justify-end mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="mb-4">
              <button type="submit" className="btn2">
                Login
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

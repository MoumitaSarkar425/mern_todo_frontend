import { useFormik, validateYupSchema } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { forgotPassword } from "../reducer/authSlice";
import axiosInstance from "../components/Utilities/axiosInstance";
import { useState } from "react";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const resetToken = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Too short!")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm the password"),
    }),
    onSubmit: async (values,{ setSubmitting, setErrors }) => {
      console.log("Form data:", values);
      try {
        const response = await axiosInstance.post(
          `/auth/reset-password/${resetToken.resetToken}`,
          values
        );
        console.log(response.data.message);
        setMessage(response.data.message)
      } catch (error) {
        setErrors({ serverError: error.response.data.message });
      }
    },
  });
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {/* Error message */}
        {formik.errors.serverError  && (
          <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded-md">
            {formik.errors.serverError }
          </div>
        )}

        {/* Success Message */}

        {message && (
          <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded-md">
            {message}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
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
              placeholder="Enter a new password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Confirm your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

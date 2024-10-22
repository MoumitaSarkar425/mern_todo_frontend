import { useFormik, validateYupSchema } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { forgotPassword } from "../reducer/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error , success } = useSelector((state) => state.auth);
  console.log(error);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      dispatch(forgotPassword(values));
    },
  });
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email address, and we'll send you instructions to reset
          your password.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}
        
        {/* Success Message */}

        {success && (
            <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded-md">
                {success}
            </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
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
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { useFormik } from "formik";
import PageHeaderTitle from "../components/PageHeaderTitle";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../reducer/profileSlice";
import { useEffect } from "react";
import { getUserData } from "../reducer/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../components/Utilities/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const ChangePassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Current password is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm the password"),
    }),
    onSubmit: async (values) => {
      console.log("Form data:", values);
      try {
        // Make the POST request using axiosInstance
        const response = await axiosInstance.post(
          "/user/change-password",
          values
        );
        localStorage.setItem("token", response.data.user.newToken);
         // Show success toast on successful response
         toast.success(`Success: ${response.data.msg}`, {
            autoClose: 3000,
        });
      } catch (error) {
        // Show error toast on failure
        toast.error(`Error: ${error.message}`, {
            autoClose: 3000,
        });
      }
    },
  });

  return (
    <section className="">
      <PageHeaderTitle title="Settings" />
      <ToastContainer/>
      <div className="flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full ">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Change Password
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col stylesInputsField"
          >
            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                className="w-full"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <div className="text-red-500">{formik.errors.oldPassword}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

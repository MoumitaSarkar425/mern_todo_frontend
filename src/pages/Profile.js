import { useFormik } from "formik";
import PageHeaderTitle from "../components/PageHeaderTitle";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../reducer/profileSlice";
import { useEffect } from "react";
import { getUserData } from "../reducer/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const formik = useFormik({
    enableReinitialize: true, // This allows the form to reinitialize when initialValues change
    initialValues: {
      name: user?.user?.firstname || "", // Add optional chaining here
      password: "",
      confirmPassword: "",
      profileImage: user?.user?.profileImage || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      profileImage: Yup.string().required("Profile image is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form data:", values);
      const formData = new FormData();
      formData.append("profileImage", values.profileImage);
      formData.append("firstname", values.name);
      formData.append("userId", user.user.id);

      const resultAction = await dispatch(updateProfile(formData));

      if (updateProfile.fulfilled.match(resultAction)) {
        // Show success toast on successful response
        toast.success(`Success: Profile updated successfully!`, {
          autoClose: 3000,
        });
        dispatch(getUserData()); // Re-fetch user data after update
      } else {
        // Show error toast on failure
        toast.error(`Error: ${resultAction.payload}`, {
          autoClose: 3000,
        });
      }
    },
  });

  // Set default profile image
  const defaultImage = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`;

  const matchDefaultProfileImg = "/uploads/default.png"

  // Use the dynamic image if available, or fall back to the default image
  const profileImage = user?.user?.profileImage
    ?  matchDefaultProfileImg.includes("default.png")?defaultImage:`${process.env.REACT_APP_SERVER_IMG_DOMIN}${user?.user?.profileImage}`
    : defaultImage;

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (!user || !user.user) {
    return <div>No user data available</div>; // Avoid rendering if user data is null or undefined
  }
  return (
    <section className="">
      <PageHeaderTitle title="Profile" />
      <ToastContainer />

      <div className="flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full ">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit Profile
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col stylesInputsField"
          >
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
                  src={profileImage}
                  alt="Profile"
                />

                <label
                  htmlFor="file-upload"
                  className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-violet-600 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPen} className="text-white" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "profileImage",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                {formik.touched.profileImage && formik.errors.profileImage ? (
                  <div className="text-red-500">
                    {formik.errors.profileImage}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.user.email}
                className="w-full"
                readOnly
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="btn2">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;

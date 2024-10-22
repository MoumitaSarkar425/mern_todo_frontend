import React, { useEffect } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosInstance";
import useDate from "../hooks/useDate";
import useIsotoDate from "../hooks/useIsotoDate";
import { useDispatch } from "react-redux";
import { modalActions } from "../../reducer/modalSlice";
import { modalEditActions } from "../../reducer/modalEditSlice";

const ModalCreateTask = ({
  onClose,
  nameForm,
  task = "",
  editTask = false,
}) => {
  const dateFormated = useIsotoDate(task.date);
  const dispatch = useDispatch();
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + "-" + month + "-" + day;

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      title: task.title || "",
      desc: task.desc || "",
      date: dateFormated || "",
      isImportant: task.isImportant || false,
      isCompleted: task.isCompleted || false,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      date: Yup.string().required("Date is required"),
      desc: Yup.string()
        .required("Description is required")
        .min(3, "Description must be at least 3 characters"),
    }),
    onSubmit: async (values) => {
      console.log("Form data:", values);
      try {
        // Make the POST request using axiosInstance
        let response;
        if (editTask) {
          response = await axiosInstance.put(
            `/task/edit-task/${task._id}`,
            values
          );
        } else {
          response = await axiosInstance.post("/task/create-task", values);
        }

        // Show success toast on successful response
        toast.success(`Success: ${response.data.message}`, {
          autoClose: 3000,
        });
        if (editTask) {
          dispatch(modalEditActions.closeModalEditTask());
        } else {
          dispatch(modalActions.closeModalCreateTask());
        }
      } catch (error) {
        // Show error toast on failure
        toast.error(`Error: ${error.message}`, {
          autoClose: 3000,
        });
      }
    },
  });

  const handleCheckboxChange = (e) => {
    formik.setFieldValue("isCompleted", e.target.checked);
  };

  const handleCheckboxisImportantChange = (e) => {
    formik.setFieldValue("isImportant", e.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          {/* Close Button */}
          <button
            className="text-gray-500 hover:text-gray-700 float-right"
            onClick={onClose}
          >
            &#x2715;
          </button>
          <h2 className="font-medium mb-5 text-lg md:text-2xl text-black">
            {nameForm}
          </h2>

          {/* Modal Content */}
          <div className="mt-4">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col stylesInputsField"
            >
              <label>
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g, study for the test"
                  required
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-500">{formik.errors.title}</div>
                ) : null}
              </label>
              <label>
                Date
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full"
                  value={formik.values.date}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min={todayDate}
                  max={maxDate}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-500">{formik.errors.date}</div>
                ) : null}
              </label>
              <label>
                Description (optional)
                <textarea
                  placeholder="e.g, study for the test"
                  className="w-full"
                  id="desc"
                  name="desc"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.desc && formik.errors.desc ? (
                  <div className="text-red-500">{formik.errors.desc}</div>
                ) : null}
              </label>
              <label className="mb-0 flex items-center cursor-pointer">
                <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                  {formik.values.isImportant && (
                    <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                  )}
                </div>
                <span className="order-1 flex-1">Mark as important</span>
                <input
                  type="checkbox"
                  name="isImportant"
                  className="sr-only"
                  checked={formik.values.isImportant}
                  onChange={handleCheckboxisImportantChange}
                />
              </label>

              <label className="mb-0 flex items-center cursor-pointer">
                <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
                  {formik.values.isCompleted && (
                    <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
                  )}
                </div>
                <span className="order-1 flex-1">Mark as Completed</span>
                <input
                  type="checkbox"
                  name="isCompleted"
                  className="sr-only"
                  checked={formik.values.isCompleted}
                  onChange={handleCheckboxChange}
                />
              </label>
              <button type="submit" className="btn mt-5">
                {nameForm}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateTask;

import React, { useEffect, useState } from "react";
import PageHeaderTitle from "../components/PageHeaderTitle";
import ButtonsSort from "../components/ButtonsSort";
import TaskItem from "../components/TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../reducer/modalSlice";
import axiosInstance from "../components/Utilities/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodaysTasks = () => {
  const [isListInView1, setIsListInView1] = useState(false);
  const [sortedBy, setSortedBy] = useState("");
  const [taskList, setTaskList] = useState([]);
  const modalOpen = useSelector((state) => state.modal.modalCreateTaskOpen);
  const modalEditOpen = useSelector((state)=>state.modalEdit.modalEditTaskOpen);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(modalActions.openModalCreateTask());
  };

  const markAsImportantHandler = async (taskId, taskImportant) => {
    try {
      let taskStatus = true;
      if (taskImportant) {
        taskStatus = false;
      }
      let body = {
        taskId: taskId,
        status: taskStatus,
      };
      const data = await axiosInstance.post("/task/mark-important", body);

      // Show success toast on successful response
      toast.success(`Success: ${data.data.message}`, {
        autoClose: 3000,
      });
      fetchtask();
    } catch (error) {
      // Show error toast on failure
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000,
      });
    }
  };

  const markAsCompleteHandler = async (taskId, taskComplete) => {
    try {
      let taskCompleteStatus = true;
      if (taskComplete) {
        taskCompleteStatus = false;
      }
      let body = {
        taskId: taskId,
        status: taskCompleteStatus,
      };
      const data = await axiosInstance.post("/task/change-status", body);

      // Show success toast on successful response
      toast.success(`Success: ${data.data.message}`, {
        autoClose: 3000,
      });
      fetchtask();
    } catch (error) {
      // Show error toast on failure
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000,
      });
    }
  };

  const handlerDelete = async (taskId) => {
    try {
      console.log(taskId);
      let body = {
        taskId: taskId,
      };
      const data = await axiosInstance.post("/task/delete", body);
      // Show success toast on successful response
      toast.success(`Success: ${data.data.message}`, {
        autoClose: 3000,
      });
      fetchtask();
    } catch (error) {
      // Show error toast on failure
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchtask();
  }, [modalOpen,modalEditOpen]);

  const fetchtask = async () => {
    const taskData = await axiosInstance.get("/task/todays-task");
    setTaskList(taskData.data.data);
  };

  return (
    <section>
      <ToastContainer />
      <PageHeaderTitle title="Today's Task" />
      <ButtonsSort
        isListInView1={isListInView1}
        setIsListInView1={setIsListInView1}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />

      <ul
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
          isListInView1
            ? "grid-cols-1"
            : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
        }`}
      >
        {taskList.map((task) => (
          <TaskItem
            key={task.id}
            isListInView1={isListInView1}
            task={task}
            markAsImportantHandler={markAsImportantHandler}
            markAsCompleteHandler={markAsCompleteHandler}
            handlerDelete={handlerDelete}
          />
        ))}

        <li>
          <button
            onClick={openModalHandler}
            className={`border-2 border-slate-300
             text-slate-400 w-full rounded-lg
              border-dashed transition hover:bg-slate-300
               hover:text-slate-500
               dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                 isListInView1 ? "h-20 sm:h-32" : "h-52 sm:h-64"
               }`}
          >
            Add new task
          </button>
        </li>
      </ul>
    </section>
  );
};

export default React.memo(TodaysTasks);

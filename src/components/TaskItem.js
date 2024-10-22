import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import useDate from "./hooks/useDate";
import BtnToggleCompleted from "./TaskButton/BtnToggleCompleted";
import BtnMarkAsImportant from "./TaskButton/BtnMarkAsImportant";
import BtnDeleteTask from "./TaskButton/BtnDeleteTask";
import BtnEditTask from "./TaskButton/BtnEditTask";

const TaskItem = ({ isListInView1, task,markAsImportantHandler,markAsCompleteHandler,handlerDelete }) => {
  const dateFormated = useDate(task.date);
  return (
    <>
      <li key={task.id}>
        <article
          className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
            isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"
          }`}
        >
          <div
            className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}
          >
            <div
              className={`flex items-center justify-between ${
                isListInView1 ? "mb-1" : "mb-2"
              }`}
            >
              <span className="block font-medium dark:text-slate-200">
                {task.title}
              </span>
            </div>
            <p
              title={task.desc}
              className={`description mb-2 text-slate-500 dark:text-slate-500 ${
                isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
              }`}
            >
              {task.desc}
            </p>
            <time className="mt-auto flex w-full">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 w-4 sm:w-5" />{" "}
              {dateFormated}
            </time>
          </div>
          <div
            className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
              isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
            }`}
          >
            <BtnToggleCompleted
              taskCompleted={task.isCompleted}
              taskId={task._id}
              isListInView1={isListInView1}
              markAsCompleteHandler ={markAsCompleteHandler}
            />
            <BtnMarkAsImportant
              taskId={task._id}
              taskImportant={task.isImportant}
              markAsImportantHandler ={markAsImportantHandler}
            />
            <BtnDeleteTask taskId={task._id} handlerDelete={handlerDelete} />
            <BtnEditTask task={task} />
          </div>
          {/* <InfosTask task={task} isListInView1={isListInView1} />
          <ActionsTaskItem task={task} isListInView1={isListInView1} /> */}
        </article>
      </li>
    </>
  );
};

export default React.memo(TaskItem);

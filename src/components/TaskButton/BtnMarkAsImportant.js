import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../Utilities/axiosInstance";


const BtnMarkAsImportant = ({ taskId, taskImportant, markAsImportantHandler }) => {
  
  return (
    <>
    <button
      title={taskImportant ? "unmark as important" : "mark as important"}
      onClick={()=>markAsImportantHandler(taskId,taskImportant)}
      className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
    >
      <FontAwesomeIcon
        icon={faStar}
        className={`w-8 h-8 sm:w-6 sm:h-6 ${
          taskImportant ? "text-rose-500" : ""
        }`}
      />
    </button>
    </>
  );
};

export default React.memo(BtnMarkAsImportant);

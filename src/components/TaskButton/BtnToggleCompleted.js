import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const BtnToggleCompleted = ({ taskCompleted, taskId, isListInView1,markAsCompleteHandler }) => {
  return (
    <button
      title={taskCompleted ? "mark as uncompleted" : "mark as completed"}
      onClick={()=>markAsCompleteHandler(taskId,taskCompleted)}
      className={`${
        taskCompleted
          ? "bg-emerald-200 text-emerald-800 "
          : "bg-amber-200 text-amber-800 "
      } ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {taskCompleted ? "completed" : "uncompleted"}
      </span>
      <span className=" sm:hidden w-6 h-6 grid place-items-center">
        {taskCompleted ? (
          <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />

        ) : (
            <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
        )}
      </span>
    </button>
  );
};

export default React.memo(BtnToggleCompleted);

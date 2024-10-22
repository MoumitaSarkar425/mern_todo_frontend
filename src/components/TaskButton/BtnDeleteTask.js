import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';

const BtnDeleteTask = ({taskId,handlerDelete}) => {

  return (
    <>
      
      <button
        onClick={() => handlerDelete(taskId)}
        title="delete task"
        className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
      >
        <FontAwesomeIcon icon={faTrash} className="w-8 h-8 sm:w-6 sm:h-6" />
      </button>
    </>
  );
};

export default React.memo(BtnDeleteTask);

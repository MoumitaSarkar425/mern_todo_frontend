import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ModalCreateTask from "../Utilities/ModalCreateTask";
import { useDispatch, useSelector } from "react-redux";
import { modalEditActions } from "../../reducer/modalEditSlice";

const BtnEditTask = ({task}) => {
  const dispatch = useDispatch();
  const modalEditOpen = useSelector((state)=>state.modalEdit.modalEditTaskOpen);
  const openModalEditTask = () =>{
    dispatch(modalEditActions.openModalEditTask());
  }
  const closeModalEditTask = ()=>{
    dispatch(modalEditActions.closeModalEditTask());
  }
  return (
    <>
    <button
      title="edit task"
      onClick={openModalEditTask}
      className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
    >
      <FontAwesomeIcon icon={faEllipsisV} className="w-8 h-8 sm:w-6 sm:h-6" />
    </button>
    { modalEditOpen && (
      <ModalCreateTask
        onClose={closeModalEditTask}
        nameForm="Edit task"
        task={task}
        editTask={true}
      />
    )}
    </>
  );
};

export default React.memo(BtnEditTask);

import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../reducer/modalSlice";

const BtnAddTask = ({ className }) => {
  const dispatch = useDispatch();
  const onOpenModal = () => {
    dispatch(modalActions.openModalCreateTask());
  };
  return (
    <>
      <button className={`btn  ${className}`} onClick={onOpenModal}>
        Add new task
      </button>
    </>
  );
};

export default BtnAddTask;
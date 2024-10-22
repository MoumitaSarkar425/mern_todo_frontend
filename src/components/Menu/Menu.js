import React, { useState } from "react";
import LayoutMenus from "../Utilities/LayoutMenus";
import BtnAddTask from "../Utilities/BtnAddTask";
import NavLinks from "./NavLinks ";
import { useDispatch, useSelector } from "react-redux";
import { menusActions } from "../../reducer/menuSlice";

const Menu = () => {
  const classLinkActive =
    "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

  const menuOpen = useSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useDispatch();
  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());
  };
  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      <header className="h-full flex flex-col">
        <h1 className="font-bold uppercase text-center  mt-8 text-lg tracking-wide hidden xl:block">
          To-do list
        </h1>
        <BtnAddTask className="my-8 mx-4" />
        <NavLinks classActive={classLinkActive} />
      </header>
    </LayoutMenus>
  );
};

export default Menu;

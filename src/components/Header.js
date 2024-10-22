import React, { useEffect, useState } from "react";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import BtnAddTask from "./Utilities/BtnAddTask";
import SearchField from "./SearchField";
import Notification from "./Notification";
import avatar1 from "../assets/avatar-1.png";
import { useDispatch, useSelector } from "react-redux";
import { menusActions } from "../reducer/menuSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reducer/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { user, loading, error} = useSelector((state)=>state.user);

  // Set default profile image
  const defaultImage = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`; 


  const matchDefaultProfileImg = "/uploads/default.png"


  // Use the dynamic image if available, or fall back to the default image
  const profileImage = user?.user?.profileImage 
    ? matchDefaultProfileImg.includes("default.png")?defaultImage: `${process.env.REACT_APP_SERVER_IMG_DOMIN}${user?.user?.profileImage }` 
    : defaultImage;

  const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
    .toString()
    .padStart(2, "0")}`;

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}}`;

  const openMenuHeaderHandler = () => {
    dispatch(menusActions.openMenuHeader());
  };

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = ()=>{
    dispatch(logout());
    // Redirect to login page after logout
    navigate('/login', { replace: true });
  }

  return (
    <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
      <button
        className="mr-6 block xl:hidden"
        title="open menu"
        onClick={openMenuHeaderHandler}
      >
        <MenuIcon />
      </button>
      <SearchField />
      <div className="text-center">
        <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
          To-do list
        </span>
        <time dateTime={dateTimeFormat}>{todayDate}</time>
      </div>
      <div className="flex flex-1 relative ">
        <Notification />
        <BtnAddTask className="sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent" />

        <img
          src={profileImage}
          onClick={toggleDropdown}
          alt="cat"
          className="w-10 h-10 rounded-full ml-4 border-2 border-slate-600 cursor-pointer"
        />

        {isOpen && (
          <div className="absolute right-0 mt-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              {/* Profile */}
              <Link
                to="profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Edit Profile
              </Link>

              {/* Divider */}
              <hr className="border-gray-200 my-1" />

              {/* Settings */}
              <Link
                to="settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" /> Change Password
              </Link>

              {/* Logout */}
              <button
              onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

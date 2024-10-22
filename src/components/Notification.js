import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as IconBell } from "../assets/bell.svg";

const Notification = () => {
  return (
    <div className="sm:mr-4 md:mr-6 ml-auto grid place-items-center relative">
      <button
        className={`relative`}
        title="see notifications"
      >
        <IconBell className="fill-violet-600 w-5 h-5 md:w-6 md:h-6 dark:fill-violet-800" />
      </button>
    </div>
  );
};

export default Notification;

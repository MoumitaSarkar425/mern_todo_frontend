import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useDate from "./hooks/useDate";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByTitle } from "../reducer/taskSearchSlice";

const SearchField = () => {
  // const tasks = [
  //   { id:12345, title: "test", date: "2024-09-30T10:00:00.000+00:00" },
  //   { id:23456, title: "test", date: "2024-09-30T10:00:00.000+00:00" },
  // ];

  const [searchInputValue, setSearchInputValue] = useState("");
  const [listResultsVisible, setListResultsVisible] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.taskSearch);
  const dispatch = useDispatch();
  const handleKeyUp = (e) => {
    e.preventDefault();
    const input = e.target.value;
    setSearchInputValue(input);

    if (input.trim().length > 0) {
      setListResultsVisible(true);
      dispatch(fetchTasksByTitle(input));
    } else {
      setListResultsVisible(false);
    }
  };

  const closeListResults = () => {
    setListResultsVisible(false);
  };
  return (
    <div className="flex-1 col-span-3 row-start-2 md:pr-10">
      <form className=" relative md:max-w-xs w-full" autoComplete="off">
        <label htmlFor="search" className="sr-only"></label>
        <input
          type="search"
          id="search"
          placeholder="Search task"
          className="inputStyles w-full"
          onChange={(e) => setSearchInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute w-4 sm:w-5 right-4 top-3.5 text-slate-400"
        />
        {listResultsVisible && (
          <div className="absolute bg-slate-100 rounded-md w-full top-14 p-3 dark:bg-slate-800 z-10">
            {tasks.length ? (
              <>
                <ul>
                  {tasks.map((task) => (
                    <ItemSearch
                      key={task._id}
                      task={task}
                      closeListResults={closeListResults}
                    />
                  ))}
                </ul>
                <button className="bg-rose-100 w-full p-2 rounded-md text-rose-600 dark:bg-slate-700/[.3] dark:text-slate-200">
                  All results for "{searchInputValue}"
                </button>
              </>
            ) : (
              <span>No tasks found</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchField;

const ItemSearch = ({ taskId, task, closeListResults }) => {
  const dateFormated = useDate(task.date);
  return (
    <li key={task._id} className="py-2">
      <Link
       to={`/dashboard/task/${task._id}?title=${encodeURIComponent(task.title)}`}
        onClick={closeListResults}
        className="flex justify-between transition hover:text-rose-500 dark:hover:text-slate-200"
      >
        <span>{task.title}</span>
        <span>{dateFormated}</span>
      </Link>
    </li>
  );
};

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";

const sortValues = [
  { value: "order-added", title: "Order added" },
  { value: "min-date", title: "Earlier first" },
  { value: "max-date", title: "Later first" },
  { value: "completed-first", title: "Completed first" },
  { value: "uncompleted-first", title: "Uncompleted first" },
];

const ButtonsSort = ({
  isListInView1,
  setIsListInView1,
  sortedBy,
  setSortedBy,
}) => {
  return (
    <div className="flex children-styles">
      <button onClick={() => setIsListInView1(true)} title="view in list">
        <FontAwesomeIcon
          icon={faList}
          className={isListInView1 ? "text-violet-600" : ""}
        />
      </button>
      <button onClick={() => setIsListInView1(false)} title="view in grid">
        <FontAwesomeIcon
          icon={faThLarge}
          className={!isListInView1 ? "text-violet-600" : ""}
        />
      </button>
      <select
        className="ml-auto inputStyles"
        value={sortedBy}
        onChange={({ target }) => setSortedBy(target.value)}
      >
        <option value="" disabled>
          Sort by
        </option>
        {sortValues.map((val) => (
          <option
            key={val.value}
            value={val.value}
            className="bg-slate-100 dark:bg-slate-800"
          >
            {val.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ButtonsSort;

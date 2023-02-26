import React from "react";

const GroupList = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="flex justify-center space-x-4">
      {items.map((i) => {
        return (
          <div
            key={i._id}
            onClick={() => onItemSelect(i)}
            className={
              i === selectedItem
                ? "border-b-2 border-slate-500  transition delay-100"
                : "border-b-2  hover:border-slate-500  transition delay-100"
            }
          >
            {i.name}
          </div>
        );
      })}
    </ul>
  );
};

export default GroupList;

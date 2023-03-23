import React from "react";

const GroupList = ({ items, onItemSelect, selectedItem }) => {
  return (
    <div className="filtercontainer">
      {items.map((i) => {
        return (
          <div
            key={i._id}
            onClick={() => onItemSelect(i)}
            className={i === selectedItem ? "filterselected" : "filter"}
          >
            {i.name}
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;

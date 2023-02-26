import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <nav className="m-4">
      <ul className="container flex space-x-4">
        {pages.map((page) => (
          <li
            key={"page" + page}
            className={
              page === currentPage
                ? "border-b-2 border-slate-500  transition delay-100"
                : "border-b-2  hover:border-slate-500  transition delay-100"
            }
          >
            <button onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="container pagination">
        {pages.map((page) => (
          <li key={"page" + page}>
            <div
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "active_paginate_btn"
                  : "non_active_paginate_btn"
              }
            >
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

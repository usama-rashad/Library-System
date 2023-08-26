import "./PaginatedView.scss";

import React, { useState } from "react";

// Icons

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 320 512" className="leftChevron">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 320 512" className="rightChevron">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />{" "}
    </svg>
  );
}

function PaginatedView({ headerCols }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const newPagePageNumber = (e) => {
    if (!e) {
      setPageNumber(1);
    } else {
      setPageNumber(e);
    }
  };

  return (
    <div className="mainPaginatedView">
      <div className="header">
        {headerCols.map((col, index) => {
          return (
            <>
              <p>{col}</p>
              {index === headerCols.length - 1 ? "" : <div className="seperator"></div>}
            </>
          );
        })}
      </div>

      <div className="dataContent"></div>

      <div className="pageNav">
        <ChevronLeftIcon />
        <input type="text" value={pageNumber} onChange={(e) => newPagePageNumber(parseInt(e.target.value))} />
        <p>of {totalPages}</p>
        <ChevronRightIcon />
      </div>
    </div>
  );
}

export default PaginatedView;

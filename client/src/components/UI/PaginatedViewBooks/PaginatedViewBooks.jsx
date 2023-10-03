import "./PaginatedViewBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import BookUpdateRow from "../BookUpdateRow/BookUpdateRow";
import BookRemoveRow from "../BookRemoveRow/BookRemoveRow";

import Spinner from "../Animations/Spinner/Spinner";

// Hooks
import useUpdateBookState from "../../../hooks/useUpdateBookState.js";

// Icons
import BookAnimation from "../../../assets/bookAnimation.gif";

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

function PaginatedViewBooks({ headerCols, flex, baseComponent: BaseComponent }) {
  const { success, fail, pending: isLoading, message, state, books } = useUpdateBookState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedRowNumber, setSelectedRowNumber] = useState(0);

  const newPagePageNumber = (e) => {
    if (!e) {
      setPageNumber(1);
    } else {
      setPageNumber(e);
    }
  };

  const selectedRow = (e) => {
    setSelectedRowNumber(e);
  };

  // Update the flex width of the header column titles
  useEffect(() => {
    let titles = document.getElementsByName("columnDivs");
    flex.forEach((flexAmount, index) => {
      let title = titles[index];
      titles[index].style.setProperty("flex", flexAmount);
    });
  }, []);

  return (
    <div className={`mainPaginatedView `}>
      {isLoading && (
        <div className="spinnerDiv">
          <img src={BookAnimation} />
        </div>
      )}
      <div className="header">
        {headerCols.map((col, index) => {
          return (
            <div className="divColumn" key={index} name="columnDivs">
              <p name="headerTitles">{col}</p>
              {index === headerCols.length - 1 ? "" : <div className="seperator"></div>}
            </div>
          );
        })}
      </div>

      <div className={`dataContent  ${isLoading ? "loading" : ""}`}>
        {books.length > 0
          ? books.map((book, index) => {
              return (
                <BaseComponent
                  key={index}
                  index={index + 1}
                  rowSelected={(e) => selectedRow(e)}
                  flex={[1, 3, 10, 3, 3, 3, 1]}
                  bookData={book}
                />
              );
            })
          : null}
      </div>

      <div className="pageNav">
        <ChevronLeftIcon />
        <input type="text" value={pageNumber} onChange={(e) => newPagePageNumber(parseInt(e.target.value))} />
        <p>of {totalPages}</p>
        <ChevronRightIcon />
      </div>
    </div>
  );
}

export default PaginatedViewBooks;

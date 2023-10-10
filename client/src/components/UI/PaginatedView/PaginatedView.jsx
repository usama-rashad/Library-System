import "./PaginatedView.scss";

import React, { useState, useRef, useEffect } from "react";

function PaginatedView({ titleBarColumns, dataSource, RenderItem, renderItemFlexLayout }) {
  const titleBarRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Update the flex width of the rwo elements
  useEffect(() => {
    let titles = titleBarRef.current.childNodes;
    let flexIndex = 0;
    let flexAmount = 0;
    for (let i = 0; i < titles.length; i++) {
      if (titles[i].className !== "seperator") {
        flexAmount = renderItemFlexLayout[flexIndex];
        titles[i].style.setProperty("flex", flexAmount);
        flexIndex++;
      }
    }
  }, []);

  return (
    <div className="paginatedView">
      <div ref={titleBarRef} className="titleBar">
        {titleBarColumns.map((colName) => {
          return <p>{colName}</p>;
        })}
      </div>
      <div className="dataContent">
        {dataSource.map((bookData, index) => {
          return <RenderItem key={index} index={index + 1} data={bookData} flex={renderItemFlexLayout} />;
        })}
      </div>
      <div className="navBar">
        <button onClick={prevPage}>Prev</button>
        <p>{`${currentPage} of ${totalPages}`}</p>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default PaginatedView;

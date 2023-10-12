import "./PaginatedView.scss";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

// Animations
import BookAnimation from "./../../../assets/bookAnimation.gif";

function PaginatedView({ busy, titleBarColumns, dataSource, RenderItem, renderItemFlexLayout }) {
  const titleBarRef = useRef();
  const dataContentRef = (useRef < HTMLDivElement) | (null > null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSelection, setPageSelection] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);

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

  // Get the hieght of the dataContent section
  useEffect(() => {
    setCurrentPage(1);
    let dataContent = document.getElementById("dataContentDiv");
    let perPage = Math.floor(dataContent.offsetHeight / 40);
    setItemsPerPage(perPage);
    setTotalPages(Math.ceil(dataSource.length / perPage));
    let lowerLimit = perPage * (currentPage - 1);
    let upperLimit = lowerLimit + perPage;
    setPageSelection(dataSource.slice(lowerLimit, upperLimit));
  }, [dataSource]);

  useEffect(() => {
    let lowerLimit = itemsPerPage * (currentPage - 1);
    let upperLimit = lowerLimit + itemsPerPage;
    setPageSelection(dataSource.slice(lowerLimit, upperLimit));
  }, [currentPage]);

  return (
    <div className="paginatedView">
      <div ref={titleBarRef} className="titleBar">
        {titleBarColumns.map((colName, index) => {
          return <p key={index}>{colName}</p>;
        })}
      </div>
      {busy && (
        <div className="loadingAnimation">
          <img src={BookAnimation} />
        </div>
      )}
      <div id="dataContentDiv" className="dataContent">
        {pageSelection.map((bookData, index) => {
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

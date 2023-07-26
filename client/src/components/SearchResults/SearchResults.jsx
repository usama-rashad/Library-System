import "./SearchResults.scss";
import React from "react";

// Components
import Navbar from "./../Navbar/Navbar";

function SearchResults() {
  return (
    <div className="mainSearchResults">
      <div className="top">
        <Navbar />
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="middle"></div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default SearchResults;

import React from "react";
import "./SearchResults.scss";
import Navbar from "../../components/Navbar/Navbar";
import Filterbar from "../../components/Filterbar/Filterbar";
import SearchImage from "./../../assets/books.jpg";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

function SearchResults() {
  return (
    <div className="mainSearchResults">
      <Navbar />
      <img src={SearchImage} className="searchImage" />
      {/* <Filterbar /> */}
      {/* Search results are shown here */}
      <div className="searchResults">
        <div className="left">
          <SearchFilter />
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default SearchResults;

import "./SearchBar.scss";
import React, { useEffect, useState } from "react";

import SearchIcom from "./../../assets/magnifying-glass-solid.svg";

function SearchBar() {
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchActiveAction = () => {
    setShowResults(true);
  };

  const searchDeactivatedAction = () => {
    setShowResults(false);
  };

  return (
    <div className="mainSearchBar">
      <div className="searchField">
        <input placeholder="Search..." className="searchText" onClick={searchActiveAction} onBlur={searchDeactivatedAction} />
        <img tabIndex={0} src={SearchIcom} width={"24px"} height={"24px"} />
      </div>
      <div className={`searchResults ${showResults ? "show" : ""}`}>
        <p></p>
      </div>
    </div>
  );
}

export default SearchBar;

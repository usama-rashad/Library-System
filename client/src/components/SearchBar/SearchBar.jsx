import "./SearchBar.scss";
import React, { useEffect, useState } from "react";

//Components
import SearchBarItem from "./../SearchBarItem/SearchBarItem";

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
        <SearchBarItem itemName={"Programming with Usama"} boldCount={5} />
        <SearchBarItem itemName={"Baking with chocolate"} boldCount={5} />
        <SearchBarItem itemName={"Private pilot license"} boldCount={6} />
        <SearchBarItem itemName={"C++ programming"} boldCount={3} />
        <SearchBarItem itemName={"Turbines and generators"} boldCount={4} />
        <SearchBarItem itemName={"FAA regulations Part VIII"} boldCount={1} />
      </div>
    </div>
  );
}

export default SearchBar;

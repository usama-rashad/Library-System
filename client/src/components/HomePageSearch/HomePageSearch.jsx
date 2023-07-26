import "./HomePageSearch.scss";
import React from "react";
import Button from "./../Button/Button";
import { useDispatch } from "react-redux";
import { signup } from "../../Reducers/authReducer";

// Icons

// Components
import SearchBar from "./../SearchBar/SearchBar";

function HomePageSearch() {
  return (
    <div className="mainHomePageSearch">
      <SearchBar />
    </div>
  );
}

export default HomePageSearch;

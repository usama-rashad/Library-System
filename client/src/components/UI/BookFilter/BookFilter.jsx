import "./BookFilter.scss";

import React, { useEffect, useState } from "react";

// Components
import InputField from "../../UI/Form/InputField/InputField";

// Reducer
import { useDispatch } from "react-redux";
import { getBooksByISBNThunk } from "../../../reducers/updateBooksReducer.js";

function BookFilter() {
  const [ISBN, setISBN] = useState("");
  const dispatch = useDispatch();

  const updateSearchISBN = (e) => {
    setISBN(e);
  };

  const startSearch = () => {
    dispatch(getBooksByISBNThunk({ ISBN: ISBN }));
  };
  return (
    <div className="mainBookFilter">
      <p id="titleText">Filter options</p>
      <InputField
        showLabel={false}
        label="ISBN"
        placeholder={"Enter ISBN-13"}
        type={"ISBN"}
        validationHint={"Numbers only."}
        source={ISBN}
        updateValue={(e) => updateSearchISBN(e)}
      />
      <button id="searchButton" onClick={startSearch}>
        Search
      </button>
    </div>
  );
}

export default BookFilter;

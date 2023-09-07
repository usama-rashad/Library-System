import "./BookFilter.scss";

import React, { useState } from "react";

// Components
import InputField from "../../UI/Form/InputField/InputField";

function BookFilter() {
  const [ISBN, setISBN] = useState("");
  const updateSearchISBN = (e) => {
    setISBN(e);
  };
  const startSearch = () => {};
  return (
    <div className="mainBookFilter">
      <p id="titleText">Filter options</p>
      <InputField showLabel={false} label="ISBN" placeholder={"Enter ISBN-13"} type={"ISBN"} validationHint={"Numbers only."} source={ISBN} updateValue={(e) => updateSearchISBN(e)} />
      <button id="searchButton" onClick={startSearch}>
        Search
      </button>
    </div>
  );
}

export default BookFilter;

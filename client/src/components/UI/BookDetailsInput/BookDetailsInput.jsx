import "./BookDetailsInput.scss";

import React, { useEffect, useState } from "react";
import InputField from "../Form/InputField/InputField";

// Actions
import { removeStorageInfo, addStorageInfo } from "./../../../reducers/addBookReducer.js";

function BookDetailsInput({ serialNumber, detailsSource, detailUpdate }) {
  const [bookDetails, setBookDetails] = useState({ serialNumber: "", aisle: "", shelf: "" });

  // Input actions
  const updateSerialNumber = (input) => {
    setBookDetails({ ...bookDetails, serialNumber: input });
    outputUpdate();
  };
  const updateAisle = (input) => {
    setBookDetails({ ...bookDetails, aisle: input });
    outputUpdate();
  };
  const updateShelf = (input) => {
    setBookDetails({ ...bookDetails, shelf: input });
    outputUpdate();
  };

  // Output update
  const outputUpdate = () => {
    detailUpdate(bookDetails);
  };

  return (
    <div className="mainBookDetailsInput">
      <div className="row">
        <div className="fields">
          <p>{serialNumber}.</p>
          <InputField
            label=""
            placeholder={"Enter serial number"}
            type={"number"}
            validationHint={"Can only be digits."}
            source={bookDetails.serialNumber}
            updateValue={(e) => updateSerialNumber(e)}
          />
          <InputField
            label=""
            placeholder={"Enter aisle"}
            type={"text"}
            validationHint={"Can only be letters."}
            source={bookDetails.aisle}
            updateValue={(e) => updateAisle(e)}
          />
          <InputField
            label=""
            placeholder={"Enter shelf number"}
            type={"number"}
            validationHint={"Can only be digits."}
            source={bookDetails.shelf}
            updateValue={(e) => updateShelf(e)}
          />
        </div>
        <div className="buttons">
          {/* <img src={AddIcon} className="icons addIcon" onClick={() => addNewRow()} />
          <img src={DeleteIcon} className="icons deleteIcon" onClick={() => removeRow()} /> */}
        </div>
      </div>
    </div>
  );
}

export default BookDetailsInput;

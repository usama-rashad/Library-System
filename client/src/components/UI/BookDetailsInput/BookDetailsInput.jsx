import "./BookDetailsInput.scss";

// Icons
import DeleteIcon from "../../../assets/trash-can-solid.svg";
import AddIcon from "../../../assets/square-plus-solid.svg";

import React, { useEffect, useState } from "react";
import InputField from "../Form/InputField/InputField";

function BookDetailsInput({ detailsSource, detailUpdate }) {
  const [bookDetails, setBookDetails] = useState({ serialNumber: "", aisle: "", shelf: "" });

  useEffect(() => {
    setBookDetails(detailsSource);
  }, [detailsSource]);

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
          <img src={AddIcon} className="icons addIcon" />
          <img src={DeleteIcon} className="icons deleteIcon" />
        </div>
      </div>
    </div>
  );
}

export default BookDetailsInput;

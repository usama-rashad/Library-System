import "./AddBooks.scss";

import React, { useEffect, useState } from "react";

//Components
import Button from "./../../../UI/Button/Button";
import InputField from "./../../../UI/Form/InputField/InputField";

// Utility
import { isAlphabetsOnly, isDigitsOnly } from "../../../../utility/InputValidation";

function AddBooks() {
  const charLimit = 200;
  const [charCount, setCharCount] = useState(0);
  const [colorState, setColorState] = useState("");
  const [addBookFormData, setAddBookFormData] = useState({
    ISBN: "", // Store the ISBN as 13 digits. No hyphen.
    Title: "",
    Author: "",
    Quantity: 0,
    Details: "",
  });

  const setBookQuantity = (input) => {
    setAddBookFormData({ ...addBookFormData, Quantity: input });
  };
  const updateDetails = (input) => {
    let charCount = input.length;
    if (charCount <= charLimit) {
      setCharCount(charCount);
      setColorState("");
      setAddBookFormData({ ...addBookFormData, Details: input });
    } else {
      setColorState("error");
      let trimmedMessage = input.slice(0, charLimit);
      setAddBookFormData({ ...addBookFormData, Details: trimmedMessage });
    }
  };
  const updateISBN = (input) => {
    let pass = isDigitsOnly(input);
    setAddBookFormData({ ...addBookFormData, ISBN: input });
  };
  const updateTitle = (input) => {
    setAddBookFormData({ ...addBookFormData, Title: input });
  };
  const updateAuthor = (input) => {
    setAddBookFormData({ ...addBookFormData, Author: input });
  };

  // BUTTON ACTIONS
  const clearButtonAction = () => {
    setDetails("");
  };

  const diagnoseMessage = (input) => {
    console.log("Input message is " + input);
  };

  return (
    <div className="mainAddBooks">
      <div className="pageLayout">
        <p className="dashTitle">Add a new book</p>
        <div className="fieldGrid">
          <div className="col1">
            <div className="field">
              <p>ISBN-13</p>
              <input
                placeholder="Enter ISBN..."
                type="text"
                value={addBookFormData.ISBN}
                onChange={(e) => updateISBN(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Title</p>
              <input
                placeholder="Enter title..."
                type="text"
                value={addBookFormData.Title}
                onChange={(e) => updateTitle(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Author</p>
              <input
                placeholder="Enter Author name..."
                type="text"
                value={addBookFormData.Author}
                onChange={(e) => updateAuthor(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Quantity</p>
              <input
                placeholder="Enter quantity..."
                type="number"
                value={addBookFormData.Quantity}
                onChange={(e) => setBookQuantity(parseInt(e.target.value))}
              />
              <div className="quickSelect">
                <button onClick={() => setBookQuantity(1)}>1</button>
                <button onClick={() => setBookQuantity(2)}>2</button>
                <button onClick={() => setBookQuantity(3)}>3</button>
                <button onClick={() => setBookQuantity(4)}>4</button>
                <button onClick={() => setBookQuantity(5)}>5</button>
                <button onClick={() => setBookQuantity(6)}>6</button>
              </div>
            </div>
            <InputField
              label="Dimensions"
              placeholder={"Enter dimensions..."}
              type={"text"}
              validationHint={"Can only be letters."}
              updateValue={(e) => diagnoseMessage(e)}
            />
          </div>
          <div className="col2">
            <div className="field">
              <p>Details</p>
              <textarea
                placeholder="Enter book description..."
                value={addBookFormData.Details}
                type="text"
                onChange={(e) => updateDetails(e.target.value)}
              />
              <p className={`charCount ${colorState}`}>{`${charCount}/200 characters`}</p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button>Add</Button>
          <Button>Clear</Button>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;

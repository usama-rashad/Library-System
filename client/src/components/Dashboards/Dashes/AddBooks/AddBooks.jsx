import "./AddBooks.scss";

import React, { useEffect, useState } from "react";

//Components
import Button from "./../../../UI/Button/Button";

function AddBooks() {
  const charLimit = 200;
  const [qty, stQty] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [colorState, setColorState] = useState("");
  const [addBookFormData, setAddBookFormData] = useState({ ISBN: "", Title: "", Author: "", Quantity: 0, Details: "" });

  useEffect(() => {
    console.log(addBookFormData);
  }, [addBookFormData]);

  const setBookQuantity = (input) => {
    stQty(input);
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

  // BUTTON ACTIONS
  const clearButtonAction = () => {
    setDetails("");
  };

  return (
    <div className="mainAddBooks">
      <div className="pageLayout">
        <p className="dashTitle">Add a new book</p>
        <div className="fieldGrid">
          <div className="col1">
            <div className="field">
              <p>ISBN</p>
              <input type="text" />
            </div>
            <div className="field">
              <p>Title</p>
              <input type="text" />
            </div>
            <div className="field">
              <p>Author</p>
              <input type="text" />
            </div>
            <div className="field">
              <p>Quantity</p>
              <input type="number" value={qty} onChange={(e) => setBookQuantity(parseInt(e.target.value))} />
              <div className="quickSelect">
                <button onClick={() => stQty(1)}>1</button>
                <button onClick={() => stQty(2)}>2</button>
                <button onClick={() => stQty(3)}>3</button>
                <button onClick={() => stQty(4)}>4</button>
                <button onClick={() => stQty(5)}>5</button>
                <button onClick={() => stQty(6)}>6</button>
              </div>
            </div>
          </div>
          <div className="col2">
            <div className="field">
              <p>Details</p>
              <textarea value={addBookFormData.Details} type="text" onChange={(e) => updateDetails(e.target.value)} />
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

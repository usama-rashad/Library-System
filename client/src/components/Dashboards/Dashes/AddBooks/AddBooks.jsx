import "./AddBooks.scss";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookAsyncThunk, reset, clearMessage } from "./../../../../reducers/addBookReducer";
import { BOOKS_API, backEndRoot, backEndPort } from "./../../../../contants.js";
import axios from "axios";

// Hooks
import useAddBookState from "./../../../../hooks/useAddBookState";
import useLoginState from "./../../../../hooks/useLoginState";

//Components
import Button from "./../../../UI/Button/Button";
import InputField from "./../../../UI/Form/InputField/InputField";
import Spinner from "./../../../UI/Animations/Spinner/Spinner";
import BookDetailsInput from "../../../UI/BookDetailsInput/BookDetailsInput";

function AddBooks() {
  const charLimit = 200;
  const { success, fail, pending, message, state } = useAddBookState();
  const [charCount, setCharCount] = useState(0);
  const [colorState, setColorState] = useState("");
  const [addBookFormData, setAddBookFormData] = useState({
    ISBN: "", // Store the ISBN as 13 digits. No hyphen.
    Title: "",
    Author: "",
    Quantity: 0,
    Details: [],
  });
  const [bookDetails, setBookDetails] = useState([
    { serialNumber: "1", aisle: "A1", shelf: "1" },
    { serialNumber: "2", aisle: "A2", shelf: "1" },
  ]);

  const dispatch = useDispatch();
  const { username } = useLoginState();

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
    console.log("Clear all the fields.");
    setAddBookFormData({
      ...addBookFormData,
      ISBN: "", // Store the ISBN as 13 digits. No hyphen.
      Title: "",
      Author: "",
      Quantity: 0,
      Details: [],
    });
    dispatch(reset());
  };

  const addBookAction = async () => {
    dispatch(addBookAsyncThunk({ username: username, bookData: addBookFormData }));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 2000);
  };

  return (
    <div className="mainAddBooks">
      <div className="pageLayout">
        <p className="dashTitle">Add a new book</p>
        <div className="fieldGrid">
          <div className="col1">
            <InputField
              label="ISBN"
              placeholder={"Enter ISBN-13"}
              type={"ISBN"}
              validationHint={"Can only be 13 digits."}
              source={addBookFormData.ISBN}
              updateValue={(e) => updateISBN(e)}
            />
            <InputField
              label="Title"
              placeholder={"Enter title"}
              type={"any"}
              validationHint={""}
              source={addBookFormData.Title}
              updateValue={(e) => updateTitle(e)}
            />
            <InputField
              label="Author"
              placeholder={"Enter author name"}
              type={"text"}
              validationHint={"Can only be letters"}
              source={addBookFormData.Author}
              updateValue={(e) => updateAuthor(e)}
            />
            <InputField
              label="Quantity"
              placeholder={"Enter quantity"}
              type={"number"}
              validationHint={"Can only be digits"}
              source={addBookFormData.Quantity}
              updateValue={(e) => {
                setBookQuantity(e);
                console.log(e);
              }}
              enableQuickSelect={true}
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
          {addBookFormData.Quantity > 0 && (
            <div className="col3">
              <p className="detailTitle">Enter details</p>
              <div className="bookDetailsRows">
                {bookDetails.map((bookDetail, index) => {
                  <BookDetailsInput
                    detailsSource={bookDetails[index]}
                    detailUpdate={(e) => {
                      setBookDetails([...bookDetails, e]);
                    }}
                  />;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="buttons">
            <Button clickAction={() => addBookAction()}>
              <p>Add</p>
              {pending && <Spinner />}
            </Button>
            <Button clickAction={() => clearButtonAction()}>
              <p>Clear</p>
            </Button>
          </div>
          {message && <p className={`message ${state}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddBooks;

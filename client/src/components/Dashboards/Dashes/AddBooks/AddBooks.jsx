import "./AddBooks.scss";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBookAsyncThunk, reset, clearMessage, addStorageInfo } from "./../../../../reducers/addBookReducer";

// Icons
import DeleteIcon from "../../../../assets/trash-can-regular.svg";
import AddIcon from "../../../../assets/square-plus-regular.svg";

// Hooks
import useAddBookState from "./../../../../hooks/useAddBookState";
import useLoginState from "./../../../../hooks/useLoginState";

//Components
import Button from "./../../../UI/Button/Button";
import InputField from "./../../../UI/Form/InputField/InputField";
import Spinner from "./../../../UI/Animations/Spinner/Spinner";
import BookDetailsInput from "../../../UI/BookDetailsInput/BookDetailsInput";
import DropDown from "../../../UI/DropDown/DropDown";

function AddBooks() {
  const charLimit = 200;
  const { success, fail, pending, message, state } = useAddBookState();
  const [charCount, setCharCount] = useState(0);
  const [colorState, setColorState] = useState("");
  const [storageInfo, setStorageInfo] = useState([{ serialNumber: 1, shelf: "", aisle: "" }]);
  const [addBookFormData, setAddBookFormData] = useState({
    ISBN: "", // Store the ISBN as 13 digits. No hyphen.
    Title: "",
    Author: "",
    Details: "",
  });

  const dispatch = useDispatch();
  const { username } = useLoginState();

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

  // HELPER FUNCTIONS
  const addStorageInfo = () => {
    setStorageInfo([...storageInfo, {}]);
  };

  const removeStorageInfo = () => {
    if (storageInfo.length === 1) {
      return;
    }
    setStorageInfo((prev) => prev.splice(0, prev.length - 1));
  };

  // BUTTON ACTIONS
  const clearButtonAction = () => {
    console.log("Clear all the fields.");
    setAddBookFormData({
      ...addBookFormData,
      ISBN: "", // Store the ISBN as 13 digits. No hyphen.
      Title: "",
      Author: "",
      Details: details,
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
            <DropDown
              title={"Genre"}
              options={[
                "Fantasy",
                "Adventure",
                "Romance",
                "Contemporary",
                "Dystopian",
                "Mystery",
                "Horror",
                "Thriller",
                "Paranormal",
                "Historical fiction",
                "Science Fiction",
                "Children’s",
                "Memoir",
                "Cookbook",
                "Art",
                "Self-help",
                "Personal Development",
                "Motivational",
                "Health",
                "History",
                "Travel",
                "Guide / How-to",
                "Families & Relationships",
                "Humor",
              ]}
            />
          </div>
          <div className="col2">
            <div className="field">
              <p>Description</p>
              <textarea
                placeholder="Enter book description..."
                value={addBookFormData.Details}
                type="text"
                onChange={(e) => updateDetails(e.target.value)}
              />
              <p className={`charCount ${colorState}`}>{`${charCount}/200 characters`}</p>
            </div>
          </div>
          <div className="col3">
            <div className="title">
              <p className="detailTitle">Enter storage information</p>
              <div className="icons">
                <img src={AddIcon} className="icons addIcon" onClick={() => addStorageInfo()} />
                <img src={DeleteIcon} className="icons deleteIcon" onClick={() => removeStorageInfo()} />
              </div>
            </div>
            <div className="bookDetailsRows">
              {storageInfo.map((bookDetail, index) => {
                return <BookDetailsInput key={index} serialNumber={index + 1} />;
              })}
            </div>
            <div className="finalBookCount">
              <p>Total books : </p>
              <p>{storageInfo.length}</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="buttons">
            <Button clickAction={() => addBookAction()}>
              <p>Add Book</p>
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

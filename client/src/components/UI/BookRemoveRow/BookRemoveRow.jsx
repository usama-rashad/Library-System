import "./BookRemoveRow.scss";

import React, { useEffect, useRef, useContext, useState } from "react";
import { useDispatch } from "react-redux";

// Reducers
import { addToList, removeFromList } from "./../../../reducers/ISBNListReducer";

function BookRemoveRow({ index, bookData, flex, rowSelected }) {
  const topRef = useRef();
  const deleteBoxRef = useRef();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  // Update the flex width of the rwo elements
  useEffect(() => {
    let titles = topRef.current.childNodes;

    let flexIndex = 0;
    let flexAmount = 0;
    for (let i = 0; i < titles.length; i++) {
      if (titles[i].className !== "seperator") {
        flexAmount = flex[flexIndex];
        titles[i].style.setProperty("flex", flexAmount);
        flexIndex++;
      }
    }
  }, []);

  const addToListAction = (ISBN) => {
    dispatch(addToList(ISBN));
  };

  const removeFromListAction = (ISBN) => {
    dispatch(removeFromList(ISBN));
  };

  const updateISBN = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      addToListAction(bookData.ISBN);
    } else {
      removeFromListAction(bookData.ISBN);
    }
  };

  return (
    <div className="mainBookRemoveRow">
      <div ref={topRef} className="top">
        <p name="topFields" className="topFields">
          {index}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.ISBN}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.title}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.author}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.genre}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.storageInfo.length}
        </p>
        <div className="seperator"></div>
        <div name="topFields" className="userSelection">
          <input
            onClick={(e) => {
              updateISBN(e);
            }}
            type="checkbox"
            checked={checked}
          />
        </div>
      </div>
    </div>
  );
}

export default BookRemoveRow;

import "./BookFilter.scss";

import React, { useEffect, useState, useContext } from "react";

// Components
import InputField from "../Form/InputField/InputField";
import Button from "../Button/Button";

// Reducer
import { useDispatch } from "react-redux";
import { getBooksByISBNThunk, clearBooks } from "../../../reducers/updateBooksReducer.js";
import { deleteBooksAsyncThunk } from "../../../reducers/deleteBooksReducer";
import { clearList } from "../../../reducers/ISBNListReducer";

// Hooks
import useISBNList from "../../../hooks/useISBNList";
import useLoginState from "../../../hooks/useLoginState";

function BookFilter({ showDeleteButton }) {
  const [ISBN, setISBN] = useState("");
  const dispatch = useDispatch();
  const { ISBNList, isEmpty } = useISBNList();
  const { name } = useLoginState();

  const updateSearchISBN = (e) => {
    setISBN(e);
  };

  const startSearch = () => {
    dispatch(clearBooks());
    dispatch(getBooksByISBNThunk({ ISBN: ISBN }));
    dispatch(clearList());
  };

  const deleteBooksByISBN = () => {
    console.log(`Deleting books ${ISBNList}`);
    dispatch(deleteBooksAsyncThunk({ username: name, ISBNList: ISBNList }));
    dispatch(clearList());

    setTimeout(() => {
      dispatch(clearBooks());
      dispatch(getBooksByISBNThunk({ ISBN: ISBN }));
    }, 1000);
  };

  return (
    <div className="mainBookFilter">
      <div className="left">
        <p id="titleText">Filter options</p>
        <InputField
          showLabel={false}
          label={searchFieldName}
          placeholder={`Enter ISBN-13`}
          type={"ISBN"}
          validationHint={"Numbers only."}
          source={ISBN}
          updateValue={(e) => updateSearchISBN(e)}
        />
        <button id="searchButton" onClick={startSearch}>
          Search
        </button>
      </div>
      <div className="right">
        {showDeleteButton && (
          <Button enable={!isEmpty} clickAction={deleteBooksByISBN}>
            <p>Delete</p>
          </Button>
        )}
      </div>
    </div>
  );
}

export default BookFilter;

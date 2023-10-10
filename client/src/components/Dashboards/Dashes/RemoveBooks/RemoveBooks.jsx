import "./RemoveBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import BookFilter from "../../../UI/BookFilter/BookFilter";

// Hooks

// Reducer
import { useDispatch } from "react-redux";

// Context
import { ISBNListProvider } from "../../../../contexts/TrackISBNContext";

function RemoveBooks() {
  return (
    <div className="mainRemoveBooks">
      <div className="pageLayout">
        <p className="dashTitle">Remove books</p>
        <div className="content">
          <BookFilter showDeleteButton={true} />
        </div>
      </div>
    </div>
  );
}

export default RemoveBooks;

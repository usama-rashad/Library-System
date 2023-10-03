import "./RemoveBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import PaginatedViewBooks from "../../../UI/PaginatedViewBooks/PaginatedViewBooks";
import BookFilter from "../../../UI/BookFilter/BookFilter";
import BookRemoveRow from "../../../UI/BookRemoveRow/BookRemoveRow";

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
          <PaginatedViewBooks
            headerCols={["S.No", "ISBN", "Title", "Author", "Genré", "Quantity", ""]}
            flex={[1, 3, 10, 3, 3, 3, 1]}
            baseComponent={BookRemoveRow}
          />
        </div>
      </div>
    </div>
  );
}

export default RemoveBooks;

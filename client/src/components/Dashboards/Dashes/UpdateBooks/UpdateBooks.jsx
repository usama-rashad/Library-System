import "./UpdateBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import PaginatedViewBooks from "../../../UI/PaginatedViewBooks/PaginatedViewBooks";
import BookFilter from "../../../UI/BookFilter/BookFilter";
import BookUpdateRow from "../../../UI/BookUpdateRow/BookUpdateRow";

// Hooks
import useUpdateBookState from "../../../../hooks/useUpdateBookState";

// Reducer
import { useDispatch } from "react-redux";
import { getGenresThunk } from "../../../../reducers/getGenreReducer";

function UpdateBooks() {
  const dispatch = useDispatch();
  const { books } = useUpdateBookState();

  useEffect(() => {
    dispatch(getGenresThunk());
  }, []);

  return (
    <div className="mainUpdateBooks">
      <div className="pageLayout">
        <p className="dashTitle">Update books</p>
        <div className="content">
          <BookFilter />
          <PaginatedViewBooks
            headerCols={["S.No", "ISBN", "Title", "Author", "Genré", "Quantity", ""]}
            flex={[1, 3, 10, 3, 3, 3, 1]}
            baseComponent={BookUpdateRow}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateBooks;

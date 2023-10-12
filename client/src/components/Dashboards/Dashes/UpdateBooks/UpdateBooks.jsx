import "./UpdateBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import BookFilter from "../../../UI/BookFilter/BookFilter";
import PaginatedView from "../../../UI/PaginatedView/PaginatedView";
import BookUpdateRow from "../../../UI/BookUpdateRow/BookUpdateRow";

// Hooks
import useUpdateBookState from "../../../../hooks/useUpdateBookState";

// Reducer
import { useDispatch } from "react-redux";
import { getGenresThunk } from "../../../../reducers/getGenreReducer";

function UpdateBooks() {
  const dispatch = useDispatch();
  const { books, pending } = useUpdateBookState();

  useEffect(() => {
    dispatch(getGenresThunk());
  }, []);

  return (
    <div className="mainUpdateBooks">
      <div className="pageLayout">
        <p className="dashTitle">Update books</p>
        <div className="content">
          <BookFilter />
          <PaginatedView
            busy={pending}
            dataSource={books}
            titleBarColumns={["S.No", "ISBN", "Title", "Author", "Genre", "Qty", ""]}
            RenderItem={BookUpdateRow}
            renderItemFlexLayout={[1, 2, 4, 3, 1, 1, 1]}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateBooks;

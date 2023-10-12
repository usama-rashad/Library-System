import "./RemoveBooks.scss";

import React, { useEffect, useState } from "react";

// Components
import BookFilter from "../../../UI/BookFilter/BookFilter";
import PaginatedView from "../../../UI/PaginatedView/PaginatedView";
import BookRemoveRow from "../../../UI/BookRemoveRow/BookRemoveRow";

// Hooks
import useUpdateBookState from "../../../../hooks/useUpdateBookState";

// Reducer
import { useDispatch } from "react-redux";

// Context
import { ISBNListProvider } from "../../../../contexts/TrackISBNContext";

function RemoveBooks() {
  const { books, pending } = useUpdateBookState();

  return (
    <div className="mainRemoveBooks">
      <div className="pageLayout">
        <p className="dashTitle">Remove books</p>
        <div className="content">
          <BookFilter showDeleteButton={true} />
          <PaginatedView
            busy={pending}
            dataSource={books}
            titleBarColumns={["S.No", "ISBN", "Title", "Author", "Genre", "Qty", ""]}
            RenderItem={BookRemoveRow}
            renderItemFlexLayout={[1, 2, 4, 3, 1, 1, 1]}
          />
        </div>
      </div>
    </div>
  );
}

export default RemoveBooks;

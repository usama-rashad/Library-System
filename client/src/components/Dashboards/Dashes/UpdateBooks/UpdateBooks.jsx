import "./UpdateBooks.scss";

import React from "react";

// Components
import PaginatedView from "../../../UI/PaginatedView/PaginatedView";
import BookFilter from "../../../UI/BookFilter/BookFilter";

function UpdateBooks() {
  return (
    <div className="mainUpdateBooks">
      <div className="pageLayout">
        <p className="dashTitle">Update books</p>
        <div className="content">
          <BookFilter />
          <PaginatedView headerCols={["S.No", "ISBN", "Title", "Author", "Genré", "Quantity", ""]} flex={[1, 3, 10, 3, 3, 3, 1]} />
        </div>
      </div>
    </div>
  );
}

export default UpdateBooks;

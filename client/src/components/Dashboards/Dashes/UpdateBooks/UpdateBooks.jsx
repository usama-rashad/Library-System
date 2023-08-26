import "./UpdateBooks.scss";

// Components
import PaginatedView from "../../../UI/PaginatedView/PaginatedView";

import React from "react";

function UpdateBooks() {
  return (
    <div className="mainUpdateBooks">
      <div className="pageLayout">
        <p className="dashTitle">Update books</p>
        <div className="content">
          <PaginatedView headerCols={["S.No", "ISBN", "Title", "Genre", "Issued"]} />
        </div>
      </div>
    </div>
  );
}

export default UpdateBooks;

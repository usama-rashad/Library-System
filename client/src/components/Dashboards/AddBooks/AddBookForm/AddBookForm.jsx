import "./AddBookForm.scss";

import React from "react";

function AddBookForm() {
  return (
    <div className="mainAddBookForm">
      <div className="grid">
        <div className="field">
          <p>ISBN</p>
          <input type="text" />
        </div>
        <div className="field">
          <p>Title</p>
          <input type="text" />
        </div>
        <div className="field">
          <p>Author</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default AddBookForm;

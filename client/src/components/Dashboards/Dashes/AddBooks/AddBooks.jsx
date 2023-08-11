import "./AddBooks.scss";

import React, { useState } from "react";

//Components
import Button from "./../../../UI/Button/Button";

function AddBooks() {
  const [qty, stQty] = useState(0);

  const setBookQuantity = (input) => {
    stQty(input);
  };

  return (
    <div className="mainAddBooks">
      <div className="pageLayout">
        <p className="dashTitle">Add a new book</p>
        <div className="fieldGrid">
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
          <div className="field">
            <p>Quantity</p>
            <input type="number" value={qty} onChange={(e) => setBookQuantity(parseInt(e.target.value))} />
            <div className="quickSelect">
              <button onClick={() => stQty(1)}>1</button>
              <button onClick={() => stQty(2)}>2</button>
              <button onClick={() => stQty(3)}>3</button>
              <button onClick={() => stQty(4)}>4</button>
              <button onClick={() => stQty(5)}>5</button>
              <button onClick={() => stQty(6)}>6</button>
            </div>
          </div>
          <div className="field">
            <p>Details</p>
            <textarea type="text" />
          </div>
        </div>
        <div className="buttons">
          <Button>Add</Button>
          <Button>Clear</Button>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;

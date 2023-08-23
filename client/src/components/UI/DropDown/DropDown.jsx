import "./DropDown.scss";

import React, { useState } from "react";

function DropDown({ title, options }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Test");

  const makeSelection = (e) => {
    setSelectedOption(e);
    setOpen(false);
  };

  return (
    <div className="mainDropDown">
      <div className="t">
        <p className="dropDownTitle">{title}</p>
        <p className={open ? "selectedOption" : "selectedOption selected"} onClick={() => setOpen(true)}>
          {selectedOption}
        </p>
      </div>
      <div className="b">
        <div className="options">
          {options.map((option, index) => {
            return <p onClick={(e) => makeSelection(e.target.innerHTML)}>{option}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default DropDown;

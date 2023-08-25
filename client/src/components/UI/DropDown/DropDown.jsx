import "./DropDown.scss";

import React, { useState, useEffect } from "react";

import ChevronRight from "../../../assets/chevron-right-solid.svg";

let dropDownMaxDisplayChars = 15;

function DropDown({ title, options }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [optionName, setOptionName] = useState("");

  const makeSelection = (e) => {
    setSelectedOption(e);
    setOpen(false);
    if (e.length > dropDownMaxDisplayChars) {
      let name = e.slice(0, dropDownMaxDisplayChars) + "...";
      setOptionName(name);
      return;
    }
    setOptionName(e);
  };

  const openMenu = () => {
    setOpen(true);
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="mainDropDown">
      <div className="t">
        <p className="dropDownTitle">{title}</p>
        <div className="selection">
          <p className={open ? "selectedOption selected" : "selectedOption"} onClick={openMenu}>
            {optionName}
          </p>
          <img className={open ? "open" : "close"} src={ChevronRight} alt="MenuArrow" onClick={toggleMenu} />
        </div>
      </div>
      <div className={open ? "b open" : "b"}>
        <div className="options">
          {options.map((option, index) => {
            return (
              <p key={index} onClick={(e) => makeSelection(e.target.innerHTML)}>
                {option}
              </p>
            );
          })}
          <div className="endLine" />
        </div>
      </div>
    </div>
  );
}

export default DropDown;

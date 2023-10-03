import "./UserUpdateRow.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

// Components
import EditableField from "../Form/EditableField/EditableField";
import Button from "../Button/Button";

// Images
import ChevronRight from "../../../assets/chevron-right-solid.svg";

// Hooks
import useStorageInfo from "../../../reducers/useStorageInfo";
import useGetBookGenres from "../../../hooks/useGetBookGenres";

function UserUpdateRow({ index, userData, flex, rowSelected, isSelected }) {
  const topRef = useRef();
  const [open, setOpen] = useState(false);
  const [modifiedUserData, setModifiedUserData] = useState(userData);

  const {
    array: storageInfo,
    push: appendStorageInfo,
    remove: reduceStorageInfo,
    updateRow,
    length,
  } = useStorageInfo(userData.storageInfo);

  useEffect(() => {
    setModifiedBookData(userData);
  }, [userData.ISBN]);

  // Update the flex width of the rwo elements
  useEffect(() => {
    let titles = topRef.current.childNodes;
    let flexIndex = 0;
    let flexAmount = 0;
    for (let i = 0; i < titles.length; i++) {
      if (titles[i].className !== "seperator") {
        flexAmount = flex[flexIndex];
        titles[i].style.setProperty("flex", flexAmount);
        flexIndex++;
      }
    }
  }, []);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const rowClick = () => {
    rowSelected();
  };

  return (
    <div className={`mainUserUpdateRow ${open ? "open" : ""}`} onClick={rowClick}>
      <div ref={topRef} className="top" onClick={toggleMenu}>
        <p name="topFields" className="topFields">
          {index}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.ISBN}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.title}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.author}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.genre}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.storageInfo.length}
        </p>
        <div className="seperator"></div>
        <div name="topFields" className="userSelection" onClick={toggleMenu}>
          <img className={open ? "open" : "close"} src={ChevronRight} alt="MenuArrow" onClick={toggleMenu} />
        </div>
      </div>
      <div className="bottom">
        <div className="content">
          <p id="title">Edit data</p>
        </div>
        <div className="datagrid">
          <div className="column1">
            <div className="editableFields">
              <p id="fillerRow"></p>
              <EditableField label={"Title"} initialValue={modifiedBookData.title} />
              <EditableField label={"Author"} initialValue={modifiedBookData.author} />
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button enable={false}>
            <p>Apply</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserUpdateRow;

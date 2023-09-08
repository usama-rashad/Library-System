import "./BookUpdateRow.scss";

import React, { useEffect, useState, useRef } from "react";

// Components
import EditableField from "../Form/EditableField/EditableField";
import PictureWithUpload from "../PictureWithUpload/PictureWithUpload";

// Images
import ChevronRight from "../../../assets/chevron-right-solid.svg";

const closeHeight = 40;
const openHeight = 150;
const charLimit = 2000;

function BookUpdateRow({ index, bookData, flex, rowSelected, isSelected }) {
  const topRef = useRef();
  const [open, setOpen] = useState(false);
  const [colorState, setColorState] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [modifiedBookData, setModifiedBookData] = useState({});

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

  useEffect(() => {
    console.log(modifiedBookData);
  }, [modifiedBookData]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const updateDescription = (input) => {
    let charCount = input.length;
    if (charCount <= charLimit) {
      setCharCount(charCount);
      setColorState("");
      setModifiedBookData({ ...modifiedBookData, description: input });
    } else {
      setColorState("error");
      let trimmedMessage = input.slice(0, charLimit);
      setModifiedBookData({ ...modifiedBookData, description: trimmedMessage });
    }
  };

  return (
    <div className={`mainBookUpdateRow ${open ? "open" : ""}`} onClick={() => rowSelected()}>
      <div ref={topRef} className="top" onClick={toggleMenu}>
        <p name="topFields" className="topFields">
          {index}
        </p>
        <div className="seperator"></div>
        <p name="topFields" className="topFields">
          {bookData.isbn}
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
          {bookData.qty}
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
          <div className="editableFields">
            <p id="fillerRow"></p>
            <EditableField label={"Title"} initialValue={"Usama Rashad"} />
            <EditableField label={"Author"} initialValue={"Usama Rashad"} />
            <EditableField label={"Genre"} initialValue={"Usama Rashad"} />
          </div>
          <div className="bookDescription">
            <p className="title">Description</p>
            <textarea type="text" value={modifiedBookData.description} onChange={(e) => updateDescription(e.target.value)} />
            <p className={`charCount ${colorState}`}>{`${charCount}/${charLimit} characters`}</p>
          </div>
          <div className="pictureSection">
            <p className="title">Pictures</p>
            <div className="pictures">
              <PictureWithUpload />
              <PictureWithUpload />
              <PictureWithUpload />
              <PictureWithUpload />
              <PictureWithUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookUpdateRow;

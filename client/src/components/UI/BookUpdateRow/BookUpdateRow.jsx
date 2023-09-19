import "./BookUpdateRow.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

// Components
import EditableField from "../Form/EditableField/EditableField";
import BookDetailsInput from "../BookDetailsInput/BookDetailsInput";
import ModalWindow from "../ModalWindow/ModalWindow";
import Button from "../Button/Button";
import SinglePictureUploader from "../../UI/SinglePictureUploader/SinglePictureUploader";
import DropDown from "../DropDown/DropDown";

// Icons
import DeleteIcon from "../../../assets/trash-can-regular.svg";
import AddIcon from "../../../assets/square-plus-regular.svg";

// Images
import ChevronRight from "../../../assets/chevron-right-solid.svg";

// Hooks
import useStorageInfo from "../../../reducers/useStorageInfo";
import useGetBookGenres from "../../../hooks/useGetBookGenres";

const closeHeight = 40;
const openHeight = 150;
const charLimit = 2000;

function BookUpdateRow({ index, bookData, flex, rowSelected, isSelected }) {
  const topRef = useRef();
  const [open, setOpen] = useState(false);
  const [pictureEditorOpenState, setPictureEditorOpenState] = useState(false);
  const [colorState, setColorState] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [modifiedBookData, setModifiedBookData] = useState(bookData);
  const { genres } = useGetBookGenres();

  const {
    array: storageInfo,
    push: appendStorageInfo,
    remove: reduceStorageInfo,
    updateRow,
    length,
  } = useStorageInfo(bookData.storageInfo);

  useEffect(() => {
    setModifiedBookData(bookData);
  }, [bookData.ISBN]);

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
    if (!open) {
      closePictureEditor();
    }
  }, [open]);

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

  const openPictureEditor = () => {
    setPictureEditorOpenState(true);
  };

  const closePictureEditor = () => {
    setPictureEditorOpenState(false);
  };

  const rowClick = () => {
    rowSelected();
  };

  // HELPER FUNCTIONS
  const addStorageInfo = () => {
    appendStorageInfo({ serialNumber: length + 1, aisle: "", shelf: "" });
  };
  const removeStorageInfo = () => {
    if (storageInfo.length === 1) {
      return;
    }
    reduceStorageInfo();
  };
  const storageInfoUpdate = (e) => {
    updateRow(e.data, e.index);
  };

  return (
    <div className={`mainBookUpdateRow ${open ? "open" : ""}`} onClick={rowClick}>
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
        <ModalWindow open={pictureEditorOpenState} closeAction={() => closePictureEditor()}>
          <div className="imageRow">
            {bookData.additionalImages.map((images, index) => {
              return (
                <div className="images" key={index}>
                  <img src={images.URL} />
                  <p className="imageName">{images.filename}</p>
                  <div className="controlPanel">
                    <SinglePictureUploader bookInfo={modifiedBookData} imageNumber={index} />
                  </div>
                </div>
              );
            })}
          </div>
        </ModalWindow>

        <div className="content">
          <p id="title">Edit data</p>
        </div>
        <div className="datagrid">
          <div className="column1">
            <div className="editableFields">
              <p id="fillerRow"></p>
              <EditableField label={"Title"} initialValue={modifiedBookData.title} />
              <EditableField label={"Author"} initialValue={modifiedBookData.author} />
              <div className="genreDiv">
                <DropDown title={"Genre"} options={genres} />
              </div>
            </div>
            <div className="editPictures">
              <p className="title">Edit pictures</p>
              <button onClick={() => openPictureEditor()}>Edit pictures</button>
            </div>
          </div>
          <div className="bookDescription">
            <p className="title">Description</p>
            <textarea type="text" value={modifiedBookData.description} onChange={(e) => updateDescription(e.target.value)} />
            <p className={`charCount ${colorState}`}>{`${charCount}/${charLimit} characters`}</p>
          </div>
          <div className="storageInfo">
            <div className="title">
              <p className="detailTitle">Enter storage information</p>
              <div className="iconButtons">
                <img src={AddIcon} className="icons addIcon" onClick={() => addStorageInfo()} />
                <img src={DeleteIcon} className="icons deleteIcon" onClick={() => removeStorageInfo()} />
              </div>
            </div>
            <div className="bookDetailsRows">
              {storageInfo.map((storageInfo, index) => {
                return (
                  <BookDetailsInput
                    key={index}
                    initialValue={storageInfo}
                    index={index}
                    onDataChange={(e) => {}}
                    serialNumber={index + 1}
                  />
                );
              })}
            </div>
            <div className="finalBookCount">
              <p>Total books : </p>
              <p>{storageInfo.length}</p>
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

export default BookUpdateRow;

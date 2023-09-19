import "./SinglePictureUploader.scss";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BOOKS_API, backEndRoot, backEndPort, imagesServerPath } from "../../../contants.js";

//Components
import ProgressBar from "../ProgressBar/ProgressBar";

// Hooks
import useLoginState from "../../../hooks/useLoginState.js";

// Icons
function SelectFileIcon() {
  return (
    <svg viewBox="0 0 384 512" className="leftChevron">
      <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />{" "}
    </svg>
  );
}
function UploadFileIcon() {
  return (
    <svg viewBox="0 0 384 512" className="rightChevron">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
    </svg>
  );
}

// Helpers
// Image upload status request
async function getImageUploadStatus() {
  return await axios.get(backEndRoot + ":" + backEndPort + BOOKS_API + "/getImageUploadStatus");
}

function SinglePictureUploader({ bookInfo, imageNumber }) {
  const { ISBN } = bookInfo;
  const fileRef = useRef();
  const { username } = useLoginState();

  // States
  const [progressPct, setProgressPct] = useState(0);
  const [fileName, setFileName] = useState(0);
  // Functions
  const selectFile = () => {
    fileRef.current.click();
  };

  const fileNameChange = (e) => {
    setFileName(e.target.files[0].name);
  };

  const uploadPictureAction = async () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("ISBN", ISBN);
    formData.append("imageNumber", imageNumber);

    let id = setInterval(async () => {
      let uploadStatus = await getImageUploadStatus();
      let uploadPct = uploadStatus.data.uploadStatus[imageNumber].uploadPct;
      setProgressPct(uploadPct);
      if (uploadPct >= 100) {
        console.log(`Intervale ID cleared ` + id);
        clearInterval(id);
      }
    }, 2000);

    let images = [];
    formData.append("bookImage", fileRef.current.files[0]);
    await axios({
      method: "put",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      url: backEndRoot + ":" + backEndPort + BOOKS_API + "/addSingleImage",
    })
      .then((result) => {})
      .catch((error) => {});
  };

  return (
    <div className="mainSinglePictureUploader">
      <input
        className="fileSelector"
        type="file"
        ref={fileRef}
        accept="image/png, image/jpeg"
        hidden={true}
        onChange={(e) => {
          fileNameChange(e);
        }}
      />
      <div className="buttonPanel">
        <div className="selectFileButton button" onClick={selectFile}>
          <UploadFileIcon />
        </div>
        <div className="uploadStartButton button" onClick={uploadPictureAction}>
          <SelectFileIcon />
        </div>
      </div>
      <div className="uploadProgressBar">
        <ProgressBar progress={progressPct} fileName={fileName} indentifier={imageNumber} />
      </div>
    </div>
  );
}

export default SinglePictureUploader;

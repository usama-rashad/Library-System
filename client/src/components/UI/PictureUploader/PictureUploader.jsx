import "./PictureUploader.scss";

import React, { useRef, useState } from "react";
import axios from "axios";
import { BOOKS_API, backEndRoot, backEndPort } from "../../../contants.js";

// Hooks
import useLoginState from "../../../hooks/useLoginState.js";

function PictureUploader({ bookInfo }) {
  const { ISBN } = bookInfo;
  const { username } = useLoginState();
  const fileInputRef = useRef();
  const [fileCount, setFileCount] = useState(0);

  const updateFileHandle = () => {
    setFileCount(fileInputRef.current.files.length);
    console.log(fileInputRef.current.files.length + " files selected.");
  };
  const uploadPictureAction = async () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("ISBN", ISBN);

    console.log("File count " + fileCount);
    for (let index = 0; index < fileCount; index++) {
      formData.append("bookImages", fileInputRef.current.files[index]);
    }

    // formData.append("bookImages", fileInputRef.current.files[0]);
    // formData.append("bookImages", fileInputRef.current.files[1]);

    await axios({
      method: "put",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      url: backEndRoot + ":" + backEndPort + BOOKS_API + "/addImage",
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewPictureAction = () => {};

  return (
    <div className="mainPictureUploader">
      <div className="pictureUploadLine">
        <input
          multiple
          className="buttons"
          type="file"
          ref={fileInputRef}
          onChange={() => {
            updateFileHandle();
          }}
          accept="image/png, image/jpeg"
        />
        <button className="buttons" onClick={uploadPictureAction}>
          Upload
        </button>
        <button className="buttons" onClick={viewPictureAction}>
          View
        </button>
      </div>
    </div>
  );
}

export default PictureUploader;

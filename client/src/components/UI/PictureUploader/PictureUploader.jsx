import "./PictureUploader.scss";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BOOKS_API, backEndRoot, backEndPort, imagesServerPath } from "../../../contants.js";

// Hooks
import useLoginState from "../../../hooks/useLoginState.js";

// Components
import ModalWindow from "../../UI/ModalWindow/ModalWindow";

// Constants
const bookImagePrefix = "bookImages";

function PictureUploader({ bookInfo }) {
  const { ISBN } = bookInfo;
  const { username } = useLoginState();
  const fileInputRef = useRef();
  const [fileCount, setFileCount] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [pictureUploadSuccess, setPictureUploadSuccess] = useState("");
  const [pictureUploadErrror, setPictureUploadError] = useState("");
  const [imageNames, setImageNames] = useState([]);

  const updateFileHandle = () => {
    setFileCount(fileInputRef.current.files.length);
  };
  const uploadPictureAction = async () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("ISBN", ISBN);

    let images = [];
    for (let index = 0; index < fileCount; index++) {
      let fileName = fileInputRef.current.files[index].name;
      images = [...images, `${fileName}`];
      formData.append(bookImagePrefix, fileInputRef.current.files[index]);
    }

    setImageNames(images);

    await axios({
      method: "put",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
      url: backEndRoot + ":" + backEndPort + BOOKS_API + "/addImage",
    })
      .then((result) => {
        setPictureUploadSuccess(result.data.message);
        setPictureUploadError("");
      })
      .catch((error) => {
        if (error.response.data) {
          setPictureUploadError(error.response.data.message);
        } else {
          setPictureUploadError(error.response);
        }
        setPictureUploadSuccess("");
      });
  };

  const viewPictureAction = () => {
    setModalState(true);
  };

  return (
    <div className="mainPictureUploader">
      {modalState && <div className="blurredBack"></div>}
      <div className="pictureViewer">
        <ModalWindow open={modalState} closeAction={() => setModalState(false)}>
          <div className="images">
            {imageNames.map((image, index) => {
              return (
                <div key={index} className="element">
                  <img crossorigin src={`${imagesServerPath}${bookImagePrefix}_${ISBN}_${image}`} alt={image} loading="eager" />
                  <p className="imageName">{image}</p>
                </div>
              );
            })}
          </div>
        </ModalWindow>
      </div>
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
        {pictureUploadErrror && <p className="errorMessage">{pictureUploadErrror}</p>}
        {pictureUploadSuccess && <p className="successMessage">{pictureUploadSuccess}</p>}
      </div>
    </div>
  );
}

export default PictureUploader;

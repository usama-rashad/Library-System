import "./PictureUploader.scss";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BOOKS_API, backEndRoot, backEndPort, imagesServerPath } from "../../../contants.js";

// Hooks
import useLoginState from "../../../hooks/useLoginState.js";
import useArray from "../../../hooks/useArray.js";

// Components
import ModalWindow from "../../UI/ModalWindow/ModalWindow";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";

// Constants
const bookImagePrefix = "bookImages";

// Image upload status request
async function getImageUploadStatus() {
  return await axios.get(backEndRoot + ":" + backEndPort + BOOKS_API + "/getImageUploadStatus");
}

function PictureUploader({ bookInfo }) {
  const { ISBN } = bookInfo;
  const { username } = useLoginState();
  const fileInputRef = useRef();
  const [fileCount, setFileCount] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [pictureUploadSuccess, setPictureUploadSuccess] = useState("");
  const [pictureUploadErrror, setPictureUploadError] = useState("");
  const [imageNames, setImageNames] = useState([]);
  const [pictureUploadStatus, stePictureUploadStatus] = useState([]);
  const [commonUploadStatus, setCommonUploadStatus] = useState("");
  const [startRequest, setStartRequest] = useState(false);

  const updateFileHandle = () => {
    setFileCount(fileInputRef.current.files.length);
  };
  const uploadPictureAction = async () => {
    setStartRequest(true);
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
        setStartRequest(false);
      })
      .catch((error) => {
        if (error.response.data) {
          setPictureUploadError(error.response.data.message);
        } else {
          setPictureUploadError(error.response);
        }
        setStartRequest(false);
        setPictureUploadSuccess("");
      });
  };

  const viewPictureAction = () => {
    setModalState(true);
  };

  // Effect to fetch upload status constantly
  useEffect(() => {
    let intervalID = setInterval(async () => {
      let response = await getImageUploadStatus()
        .then((result) => {
          stePictureUploadStatus(result.data.uploadStatus);
          setCommonUploadStatus(result.data.commonStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [2000]);
    return () => {
      clearInterval(intervalID);
    };
  });

  return (
    <div className="mainPictureUploader">
      {modalState && <div className="blurredBack"></div>}
      <div className="pictureViewer">
        <ModalWindow open={modalState} closeAction={() => setModalState(false)}>
          <div className="images">
            {pictureUploadStatus.map((image, index) => {
              return (
                <div key={index} className="element">
                  <img src={image.imageURL} alt={image.imageURL} />
                  <p className="imageName">{image.filename}</p>
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
        {commonUploadStatus && <p className="statusMessage">{commonUploadStatus}</p>}
      </div>
      <div className="pictureUploadProgress">
        {pictureUploadStatus.map((pictureUpload, index) => {
          return <ProgressBar key={index} progress={pictureUpload.uploadPct} fileName={pictureUpload.filename} indentifier={index} />;
        })}
      </div>
    </div>
  );
}

export default PictureUploader;

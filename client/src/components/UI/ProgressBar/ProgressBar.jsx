import "./ProgressBar.scss";

import React, { useEffect, useState } from "react";

function ProgressBar({ fileName, progress, indentifier }) {
  const [uploadComplete, setUploadComplete] = useState("");

  useEffect(() => {
    let progressBar = document.getElementById(`progressBar ${indentifier}`);
    progressBar.style.setProperty("width", `${progress}%`);

    if (progress === 100) {
      setUploadComplete("complete");
    }
  }, [progress]);

  return (
    <div className={`mainProgressBar ${uploadComplete}`}>
      <div className="info">
        <p className="fileName">{fileName}</p>
        <div className="progress" id={`progressBar ${indentifier}`}></div>
      </div>
      <p className="progressText">{progress}%</p>
    </div>
  );
}

export default ProgressBar;

import "./ProgressBar.scss";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProgressBar({ fileName, progress, indentifier }) {
  const [uploadComplete, setUploadComplete] = useState("");

  useEffect(() => {
    let progressBar = document.getElementById(`progressBar ${indentifier}`);
    progressBar.style.setProperty("width", `${progress}%`);
  }, [progress]);

  return (
    <motion.div className={`mainProgressBar`}>
      <div className="info">
        <p className="fileName">{fileName}</p>
        <div className="progress" id={`progressBar ${indentifier}`}></div>
      </div>
      <p className="progressText">{progress}%</p>
    </motion.div>
  );
}

export default ProgressBar;

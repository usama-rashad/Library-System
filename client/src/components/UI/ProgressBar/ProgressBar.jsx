import "./ProgressBar.scss";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProgressBar({ fileName, progress, indentifier }) {
  const [uploadComplete, setUploadComplete] = useState("");
  const progressBarRef = useRef();

  useEffect(() => {
    progressBarRef.current.style.setProperty("width", `${progress}%`);
  }, [progress]);

  return (
    <motion.div className={`mainProgressBar`}>
      <div className="info">
        <p className="fileName">{fileName}</p>
        <div ref={progressBarRef} className="progress"></div>
      </div>
      <p className="progressText">{progress}%</p>
    </motion.div>
  );
}

export default ProgressBar;

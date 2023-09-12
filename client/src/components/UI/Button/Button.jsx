import "./Button.scss";
import React, { useEffect, useState } from "react";

function Button({ width = "max-content", height = "30px", children, clickAction, enable = true }) {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    setEnabled(enable);
  }, [enable]);

  const clickPassThrough = () => {
    if (enable) {
      clickAction();
    }
  };

  return (
    <div
      className={`mainButton ${enabled ? "" : "disabled"}`}
      style={{ width: width, height: height }}
      onClick={clickPassThrough}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export default Button;

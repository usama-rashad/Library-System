import "./Button.scss";
import React from "react";

function Button({ width = "max-content", height = "30px", children, clickAction }) {
  return (
    <div className="mainButton" style={{ width: width, height: height }} onClick={clickAction} tabIndex={0}>
      {children}
    </div>
  );
}

export default Button;

import "./Button.scss";
import React from "react";

function Button({ width, height, children, clickAction }) {
  return (
    <div className="mainButton" style={{ width: width, height: height }} onClick={clickAction}>
      <p>{children}</p>
    </div>
  );
}

export default Button;

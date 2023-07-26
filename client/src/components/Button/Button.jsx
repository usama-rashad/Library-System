import "./Button.scss";
import React from "react";

function Button({ width = "80px", height = "30px", children, clickAction }) {
  return (
    <div className="mainButton" style={{ width: width, height: height }} onClick={clickAction}>
      <p>{children}</p>
    </div>
  );
}

export default Button;

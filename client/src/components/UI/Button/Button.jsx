import "./Button.scss";
import React from "react";

function Button({ width = "80px", height = "30px", children, clickAction }) {
  return (
    <div className="mainButton" style={{ width: width, height: height }} onClick={clickAction} tabIndex={0}>
      {/* <p>{children}</p> */}
      {children}
    </div>
  );
}

export default Button;

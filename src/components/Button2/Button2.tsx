import React, { ReactNode } from "react";
import "./Button2.scss";

interface IButton2 {
  children: ReactNode;
}

function Button2(props: IButton2) {
  return (
    <div className="mainButton2">
      <div className="buttonText">
        <p>{props.children}</p>
      </div>
    </div>
  );
}

export default Button2;

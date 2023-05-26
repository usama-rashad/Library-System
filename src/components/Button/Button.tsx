import React, { ReactNode } from "react";
import "./Button.scss";
import { styled } from "styled-components";

interface IButton {
  width: number;
  height: number;
  bcolor: string;
  fcolor?: string;
  children: ReactNode;
}

export default function Button(props: IButton) {
  return (
    <div className="mainButton">
      <div className="buttonOutside" style={{ width: props.width, height: props.height, backgroundColor: props.bcolor }}>
        <div className="buttonInside">
          <div className="title">
            <p className="titleText" style={{ color: props.fcolor }}>
              {props.children}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

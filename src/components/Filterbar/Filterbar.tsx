import React from "react";
import "./Filterbar.scss";
import { parameterList } from "../../data";

export interface IFilterParamater {
  parameter: string;
  selections: string[];
  options: string[];
  type: "string" | "option" | "value";
}

function Filterbar() {
  return <div className="mainFilterbar"></div>;
}

export default Filterbar;

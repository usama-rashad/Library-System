import "./DashboardInterface.scss";

import React from "react";

// Components
import Button from "./../Button/Button";
import DashboardMenu from "../DashboardMenu/DashboardMenu";

// Form layout
const formLayout = [
  { fieldName: "ISBN", inputType: "text", multiLine: false },
  { fieldName: "Title", inputType: "text", multiLine: false },
  { fieldName: "Author", inputType: "text", multiLine: false },
  { fieldName: "Quantity", inputType: "number", multiLine: false },
  { fieldName: "Details", inputType: "text", multiLine: true },
];

function DashboardInterface() {
  const addNewBookAction = () => {};
  return (
    <div className="mainDashboardInterface">
      <div className="interfaceLeft">
        <DashboardMenu />
      </div>
      <div className="interfaceRight">
        <div className="panel">
          <p className="panelTitle">Add a new book</p>
          <div className="form">
            <div className="fields">
              {formLayout.map((field, index) => {
                return (
                  <div key={index} className="field">
                    <div className="fieldName">
                      <p>{field.fieldName}</p>
                    </div>
                    <div className="fieldBox">
                      <div className="inputBox">{!field.multiLine ? <input className="inputBox" type="text" /> : <textarea className="inputBox" />}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button clickAction={addNewBookAction}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInterface;

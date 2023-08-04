import "./DashboardInterface.scss";

import React from "react";

// Components
import Button from "../../UI/Button/Button";
import DashboardMenu from "../DashboardMenu/DashboardMenu";

// Form layout
const formLayout = [
  { fieldName: "ISBN", inputType: "text", multiLine: false },
  { fieldName: "Title", inputType: "text", multiLine: false },
  { fieldName: "Author", inputType: "text", multiLine: false },
  { fieldName: "Quantity", inputType: "number", multiLine: false },
  { fieldName: "Description", inputType: "text", multiLine: true },
];

function DashboardInterface() {
  const addNewBookAction = () => {};
  return (
    <div className="mainDashboardInterface">
      <div className="interfaceLeft">
        <DashboardMenu />
      </div>
      <div className="interfaceRight">
        <AddBookInterface />
      </div>
    </div>
  );
}

export default DashboardInterface;

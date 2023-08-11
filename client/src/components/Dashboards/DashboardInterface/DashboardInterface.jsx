import "./DashboardInterface.scss";

import React from "react";

// Components
import Button from "../../UI/Button/Button";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import WelcomeDashboard from "../WelcomeDashboard/WelcomeDashboard";
import AddBookInterface from "../AddBooks/AddBookInterface/AddBookInterface";

function DashboardInterface() {
  return (
    <div className="mainDashboardInterface">
      <div className="interfaceLeft">
        <DashboardMenu />
      </div>
      <div className="interfaceRight">
        <WelcomeDashboard />
        {/* <AddBookInterface /> */}
      </div>
    </div>
  );
}

export default DashboardInterface;

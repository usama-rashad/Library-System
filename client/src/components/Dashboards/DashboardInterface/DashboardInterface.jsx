import "./DashboardInterface.scss";

import React from "react";

// Components
import Button from "../../UI/Button/Button";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import WelcomeDashboard from "../WelcomeDashboard/WelcomeDashboard";
import AddBooks from "../Dashes/AddBooks/AddBooks";
import UpdateBooks from "../Dashes/UpdateBooks/UpdateBooks";
import RemoveBooks from "../Dashes/RemoveBooks/RemoveBooks";
import AddUsers from "../Dashes/AddUsers/AddUsers";
import UpdateUsers from "../Dashes/UpdateUsers/UpdateUsers";
import RemoveUsers from "../Dashes/RemoveUsers/RemoveUsers";
import useDashboardInterfaceState from "../../../hooks/useDashboardInterfaceState";

function DashboardInterface() {
  const { dashboardType } = useDashboardInterfaceState();

  return (
    <div className="mainDashboardInterface">
      <div className="interfaceLeft">
        <DashboardMenu />
      </div>
      <div className="interfaceRight">
        {dashboardType === 0 && <WelcomeDashboard />}
        {dashboardType === 1 && <AddBooks />}
        {dashboardType === 2 && <UpdateBooks />}
        {dashboardType === 3 && <RemoveBooks />}
        {dashboardType === 4 && <AddUsers />}
        {dashboardType === 5 && <UpdateUsers />}
        {dashboardType === 6 && <RemoveUsers />}
      </div>
    </div>
  );
}

export default DashboardInterface;

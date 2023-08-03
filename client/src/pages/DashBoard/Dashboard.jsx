import "./Dashboard.scss";

import React from "react";

// Components
import Navbar from "../../components/Navbar/Navbar";
import DashboardInterface from "../../components/DashboardInterface/DashboardInterface";

function Dashboard() {
  return (
    <div className="mainDashboard">
      <div className="dashboardTop">
        <Navbar />
      </div>
      <div className="dashboardBottom">
        <DashboardInterface />
      </div>
    </div>
  );
}

export default Dashboard;

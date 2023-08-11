import "./CollapsableMenu.scss";

// Icons
import ChevronRight from "../../../assets/chevron-right-solid.svg";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Hooks
import useDashboardInterfaceState from "./../../../hooks/useDashboardInterfaceState";

function CollapsableMenu({ title = "Default", menuItems = ["Default"], menuActions = [], highLightIndex = [] }) {
  const [menuState, setMenuState] = useState("close");
  const { dashboardType } = useDashboardInterfaceState();

  useEffect(() => {
    console.log(dashboardType);
  }, [dashboardType]);

  const toggleMenuState = () => {
    setMenuState((prev) => (prev === "open" ? "close" : "open"));
  };
  return (
    <div className="mainCollapsableMenu">
      <div className="heading" onClick={toggleMenuState}>
        <p>{title}</p>
        <img className={`${menuState}`} src={ChevronRight} alt="MenuArrow" />
      </div>
      <div className={`menuItems ${menuState}`}>
        {menuItems.map((item, index) => {
          return (
            <p
              key={index}
              onClick={menuActions[index]}
              className={highLightIndex[index] === dashboardType ? "selected" : ""}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default CollapsableMenu;

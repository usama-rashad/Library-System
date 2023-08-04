import "./CollapsableMenu.scss";

// Icons
import ChevronRight from "../../../assets/chevron-right-solid.svg";

import React, { useState } from "react";

function CollapsableMenu({ title = "Default", menuItems = ["Default"] }) {
  const [menuState, setMenuState] = useState("close");

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
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}

export default CollapsableMenu;

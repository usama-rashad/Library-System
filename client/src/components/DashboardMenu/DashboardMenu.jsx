import "./DashboardMenu.scss";

import React from "react";
import CollapsableMenu from "../CollapsableMenu/CollapsableMenu";

function DashboardMenu() {
  return (
    <div className="mainDashboardMenu">
      <CollapsableMenu title="Books" menuItems={["Add Book", "Remove Book", "Update Book"]} />
      <CollapsableMenu title="Users" menuItems={["Add User", "Remove User", "Update User"]} />
    </div>
  );
}

export default DashboardMenu;

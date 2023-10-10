import "./UpdateUsers.scss";

import React from "react";

// Components
import UserFilter from "../../../UI/UserFilter/UserFilter";

function UpdateUsers() {
  return (
    <div className="mainUpdateUsers">
      <div className="pageLayout">
        <p className="dashTitle">Update Users</p>
        <div className="content">
          <UserFilter />
        </div>
      </div>
    </div>
  );
}

export default UpdateUsers;

import "./UpdateUsers.scss";

import React from "react";

// Components
import PaginatedView from "../../../UI/PaginatedViewBooks/PaginatedViewBooks";
import UserFilter from "../../../UI/UserFilter/UserFilter";
import UserUpdateRow from "../../../UI/UserUpdateRow/UserUpdateRow";

function UpdateUsers() {
  return (
    <div className="mainUpdateUsers">
      <div className="pageLayout">
        <p className="dashTitle">Update Users</p>
        <div className="content">
          <UserFilter />
          <PaginatedView
            headerCols={["S.No", "First Name", "Last Name", "E-Mail", "Admin"]}
            flex={[1, 3, 3, 4, 2]}
            baseComponent={UserUpdateRow}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateUsers;

import "./DashboardMenu.scss";

import React from "react";
import { useDispatch } from "react-redux";
import CollapsableMenu from "../../UI/CollapsableMenu/CollapsableMenu";

// Reducers
import {
  changeToAddNewBook,
  changeToAddNewUsers,
  changeToRemoveBook,
  changeToRemoveUsers,
  changeToUpdateBook,
  changeToUpdateUsers,
} from "../../../reducers/dashboardSelectionReducer";

function DashboardMenu() {
  const dispatch = useDispatch();

  const addBookAction = () => {
    dispatch(changeToAddNewBook());
  };
  const removeBookAction = () => {
    dispatch(changeToRemoveBook());
  };
  const updateBookAction = () => {
    dispatch(changeToUpdateBook());
  };
  const addUserAction = () => {
    dispatch(changeToAddNewUsers());
  };
  const removeUserAction = () => {
    dispatch(changeToRemoveUsers());
  };
  const updateUserAction = () => {
    dispatch(changeToUpdateUsers());
  };

  return (
    <div className="mainDashboardMenu">
      <CollapsableMenu
        title="Books"
        menuItems={["Add Book", "Update Book", "Remove Book"]} // Must correspond to the list of actions
        menuActions={[addBookAction, updateBookAction, removeBookAction]}
        highLightIndex={[1, 2, 3]}
      />
      <CollapsableMenu
        title="Users"
        menuItems={["Add User", "Update User", "Remove User"]} // Must correspond to the list of actions
        menuActions={[addUserAction, updateUserAction, removeUserAction]}
        highLightIndex={[4, 5, 6]}
      />
    </div>
  );
}

export default DashboardMenu;

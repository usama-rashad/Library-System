import "../WelcomeDashboard/WelcomeDashboard.scss";

import { useDispatch } from "react-redux";
import {
  changeToAddNewBook,
  changeToAddNewUsers,
  changeToRemoveBook,
  changeToRemoveUsers,
  changeToUpdateBook,
  changeToUpdateUsers,
} from "../../../reducers/dashboardSelectionReducer";

import React from "react";

function WelcomeDashboard() {
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
    <div className="mainWelcomeDashboard">
      <p>Welcome. Select an action from the left.</p>
      <button onClick={addBookAction}>Add Book</button>
      <button onClick={removeBookAction}>Remove Book</button>
      <button onClick={updateBookAction}>Update Book</button>
      <button onClick={addUserAction}>Add User</button>
      <button onClick={removeUserAction}>Remove User</button>
      <button onClick={updateUserAction}>Update User</button>
    </div>
  );
}

export default WelcomeDashboard;

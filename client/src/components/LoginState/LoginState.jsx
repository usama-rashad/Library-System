import "./LoginState.scss";
import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

// Constants
import { backEndPort, backEndRoot, USERS_API } from "../../contants.js";

// Hooks
import useLoginState from "./../../hooks/useLoginState.js";

// Reducers
import { loggedOut, loggedIn } from "../../reducers/authReducer";

// Components
import Button from "./../Button/Button";

function LoginState() {
  // States
  const { username, thumbnail, isLoggedIn, isAdmin } = useLoginState();

  // Reducers
  const dispatch = useDispatch();

  const logoutAction = () => {
    let response = axios
      .post(`${backEndRoot}:${backEndPort}${USERS_API}/logout`, {}, { withCredentials: true, timeout: 1000 })
      .then((result) => {
        dispatch(loggedOut());
      })
      .catch((error) => {
        dispatch(loggedOut());
      });
  };

  return (
    <div className="mainLoginState">
      <div className="status">
        <p className="statusText">Logged in as:</p>
        <p className="statusName">{username}</p>
        {isAdmin && <p className="adminStatus">Administrator</p>}
      </div>
      <div className="button">
        <Button clickAction={logoutAction}>Logout</Button>
      </div>
    </div>
  );
}

export default LoginState;

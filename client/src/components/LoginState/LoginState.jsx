import "./LoginState.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Constants
import { backEndPort, backEndRoot, USERS_API } from "../../contants.js";

// Hooks
import useLoginState from "./../../hooks/useLoginState.js";

// Components
import Button from "./../Button/Button";
import axios from "axios";

function LoginState() {
  const { username, thumbnail, isLoggedIn } = useLoginState();
  const dispatch = useDispatch();

  const logoutButtonAction = async () => {
    let logoutResponse = await axios
      .post(`${backEndRoot}:${backEndPort}${USERS_API}/logout`, { username: username })
      .then((success) => {
        dispatch(loggedOut());
        console.log(success.data.message);
      })
      .catch((failure) => {
        console.log(JSON.stringify(failure));
      });
  };

  return (
    <div className="mainLoginState">
      <div className="status">
        <p className="statusText">Logged in as:</p>
        <p className="statusName">{username}</p>
      </div>
      <div className="button">
        <Button clickAction={logoutButtonAction}>Logout</Button>
      </div>
    </div>
  );
}

export default LoginState;

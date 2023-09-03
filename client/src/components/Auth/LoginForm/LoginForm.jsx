import "./LoginForm.scss";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Constants
import { backEndPort, backEndRoot, USERS_API } from "../../../contants.js";

// Reducers
import { close } from "../../../reducers/loginSignupReducer";
import { loggedIn } from "../../../reducers/authReducer";

// Components
import Button from "../../../components/UI/Button/Button";

// Icons
import LoginIcon from "../../../assets/right-to-bracket-solid.svg";

function LoginForm({ errorMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(" ");
  const [rememberFlag, setRememberFlag] = useState("");

  const dispatch = useDispatch();
  const closeButtonAction = () => {
    dispatch(close());
  };

  // Login request
  const loginRequest = async () => {
    console.log(`${backEndRoot}:${backEndPort}`);
    let loginResponse = await axios
      .post(`${backEndRoot}:${backEndPort}${USERS_API}/login`, { username: username, password: password, rememberFlag: rememberFlag }, { withCredentials: true, timeout: 1000 })
      .then((result) => {
        console.log(`${username} ${result.data.isAdmin ? " is an admin." : " is not an admin"}`);
        setError({});
        setSuccess(result.data.message);
        dispatch(loggedIn({ username: username, isAdmin: result.data.isAdmin, name: result.data.name }));
        dispatch(close());
      })
      .catch((failure) => {
        let { message } = failure.response.data;
        setError(message);
        setSuccess("");
      });
  };

  return (
    <div className="mainLoginForm">
      <div className="whiteTriangle">
        <div className="closeIconDiv" onClick={closeButtonAction}>
          <p>x</p>
        </div>
        <div className="orangeTriangle"></div>
      </div>
      <div className="formOutline">
        <div className="form">
          <div className="section1">
            <p className="loginTitle">Login</p>
            <img src={LoginIcon} className="loginIcon" />
          </div>
          <div className="section2">
            <p className="label">Username</p>
            <input
              className="input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p className="label">Password:</p>
            <input
              className="input"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="option">
              <p className="label">Remember me</p>
              <input
                type="checkbox"
                className="input"
                onChange={(e) => {
                  setRememberFlag(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="section3">
            <Button height={"30px"} width={"80px"} clickAction={loginRequest}>
              <p>Login</p>
            </Button>
            <div className="forgotPassword">
              <p>Forgot password? Click</p>
              <a href="/forgotPassword">here</a>
            </div>
            {error.message && <p className="errorMessage">{error.message ? error.message : ""}</p>}
            {success && <p className="successMessage">{success ? success : ""}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

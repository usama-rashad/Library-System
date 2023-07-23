import "./LoginForm.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { close } from "../../Reducers/authReducer";

// Components
import Button from "../Button/Button";

// Icons
import LoginIcon from "./../../assets/right-to-bracket-solid.svg";

function LoginForm() {
  const dispatch = useDispatch();

  const closeButtonAction = () => {
    dispatch(close());
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
            <p className="label">E-mail:</p>
            <input className="input" />
            <p className="label">Password:</p>
            <input className="input" type="password" />
            <div className="option">
              <p className="label">Remember me</p>
              <input type="checkbox" className="input" />
            </div>
          </div>
          <div className="section3">
            <Button height={"30px"} width={"80px"}>
              Login
            </Button>
            <div className="forgotPassword">
              <p>Forgot password? Click</p>
              <a href="/forgotPassword">here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

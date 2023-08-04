import "./SignupForm.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { close } from "../../../reducers/loginSignupReducer.js";

// Components
import Button from "../../UI/Button/Button";

// Icons
import SignupIcon from "../../../assets/address-card-regular.svg";

function SignupForm({ errorMessage = "" }) {
  const dispatch = useDispatch();

  const closeButtonAction = () => {
    dispatch(close());
  };
  return (
    <div className="mainSignupForm">
      <div className="whiteTriangle">
        <div className="closeIconDiv" onClick={closeButtonAction}>
          <p>x</p>
        </div>
        <div className="orangeTriangle"></div>
      </div>
      <div className="formOutline">
        <div className="form">
          <div className="section1">
            <p className="signupTitle">Sign up</p>
            <img src={SignupIcon} className="signupIcon" />
          </div>
          <div className="section2">
            <div className="names">
              <div className="firstNameBox">
                <p className="label">First name:</p>
                <input className="input" type="text" />
              </div>
              <div className="lastNameBox">
                <p className="label">Last name:</p>
                <input className="input" type="text" />
              </div>
            </div>
            <p className="label">E-mail:</p>
            <input className="input" />
            <p className="label">Password:</p>
            <input className="input" type="password" />
            <p className="label">Re-enter password:</p>
            <input className="input" type="password" />
          </div>
          <div className="section3">
            <Button height={"30px"} width={"80px"}>
              Sign up
            </Button>
            <div className="errorMessage">
              <p>{errorMessage ? errorMessage : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

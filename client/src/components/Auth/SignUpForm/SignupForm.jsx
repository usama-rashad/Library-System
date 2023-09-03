import "./SignupForm.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { close } from "../../../reducers/loginSignupReducer.js";

// Constants
import { backEndPort, backEndRoot, USERS_API } from "../../../contants.js";

// Components
import Button from "../../UI/Button/Button";

// Icons
import SignupIcon from "../../../assets/address-card-regular.svg";

function SignupForm({ errorMessage = "" }) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(" ");
  const dispatch = useDispatch();

  // Signup reqeust
  const signupRequest = async () => {
    console.log(`${backEndRoot}:${backEndPort}`);
    let signupResponse = await axios
      .put(`${backEndRoot}:${backEndPort}${USERS_API}/signup`, { firstname: firstName, lastname: lastName, username: username, password: password1 }, { withCredentials: true, timeout: 1000 })
      .then((result) => {
        setError({});
        setSuccess(result.data.message);
        dispatch(close());
      })
      .catch((failure) => {
        let { message } = failure.response.data;
        setError(message);
        setSuccess("");
      });
  };

  const updatePassword1 = (p1) => {
    setPassword1(p1);
    verifyPasswords(p1, password2);
  };
  const updatePassword2 = (p2) => {
    setPassword2(p2);
    verifyPasswords(p2, password1);
  };
  const verifyPasswords = (value1, value2) => {
    console.log(value1);
    console.log(value2);
    if (value1 !== value2) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

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
                <input className="input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="lastNameBox">
                <p className="label">Last name:</p>
                <input className="input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <p className="label">E-mail:</p>
            <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <p className="label">Password:</p>
            <input className="input" type="password" value={password1} onChange={(e) => updatePassword1(e.target.value)} />
            <p className="label">Re-enter password:</p>
            <input className="input" type="password" value={password2} onChange={(e) => updatePassword2(e.target.value)} />
          </div>
          <div className="section3">
            <Button height={"30px"} width={"80px"} clickAction={signupRequest}>
              <p>Sign up</p>
            </Button>
            <div className="errorMessage">
              <p>{error ? error : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

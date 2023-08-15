import "./Navbar.scss";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Constants
import { backEndPort, backEndRoot, USERS_API } from "../../../contants.js";

// Images
import LibraryIcon from "../../../assets/LibraryIcon.png";

// Components
import Button from "../Button/Button";
import NavButton from "../NavButton/NavButton";
import LoginForm from "../../Auth/LoginForm/LoginForm";
import SignupForm from "../../Auth/SignUpForm/SignupForm";
import LoginState from "../../Auth/LoginState/LoginState";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../../reducers/loginSignupReducer.js";

// Hooks
import useAuthBlurState from "../../../hooks/useAuthBlurState.js";
import useLoginState from "../../../hooks/useLoginState.js";

// Reducers
import { loggedOut, loggedIn } from "../../../reducers/authReducer";

function Navbar() {
  const { authState, blurText } = useAuthBlurState();
  const { username, thumbnail, isLoggedIn, isAdmin } = useLoginState();

  const dispatch = useDispatch();
  const signupAction = () => {
    dispatch(signup());
  };
  const loginButtonAction = () => {
    dispatch(login());
  };
  // Effects
  React.useEffect(() => {
    setTimeout(() => {
      autoLogin();
    }, 1000);
  }, []);

  const autoLogin = () => {
    let response = axios
      .post(`${backEndRoot}:${backEndPort}${USERS_API}/checkLogin`, {}, { withCredentials: true, timeout: 1000 })
      .then((result) => {
        let username = result.data.username;
        console.log("Admin flag " + result.data.isAdmin);
        dispatch(loggedIn({ username: username, isAdmin: result.data.isAdmin }));
      })
      .catch((error) => {
        console.log("Login failed " + error);
      });
  };

  return (
    <div className="mainNavbar">
      {authState == 1 && (
        <div className={`loginForm ${blurText}`}>
          <LoginForm />
        </div>
      )}
      {authState == 2 && (
        <div className={`signupForm ${blurText}`}>
          <SignupForm />
        </div>
      )}
      <div className="left">
        <img className="libraryIcon" src={LibraryIcon} alt={LibraryIcon} />
        <div className="logoName">
          <p className="logoName1">Modern </p>
          <p className="logoName2"> Library</p>
        </div>
      </div>
      <div className="middle">
        <NavButton linkTo={"/"}>Home</NavButton>
        {isAdmin && <NavButton linkTo={"/dashboard"}>Dashboard</NavButton>}
        <NavButton linkTo={"/books"}>Books</NavButton>
        <NavButton linkTo={"/contact"}>Contact</NavButton>
        <NavButton linkTo={"/aboutus"}>About us</NavButton>
      </div>
      <div className="right">
        {!isLoggedIn && (
          <div className="loggedOutState">
            <Button width={"80px"} height={"30px"} clickAction={loginButtonAction}>
              <p>Login</p>
            </Button>
            <Button width={"80px"} height={"30px"} clickAction={signupAction}>
              <p>Sign up</p>
            </Button>
          </div>
        )}
        {isLoggedIn && (
          <div className="loggedInState">
            <LoginState />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

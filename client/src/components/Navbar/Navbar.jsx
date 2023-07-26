import "./Navbar.scss";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Images
import LibraryIcon from "./../../assets/LibraryIcon.png";

// Components
import Button from "./../Button/Button";
import NavButton from "./../NavButton/NavButton";
import LoginForm from "./../LoginForm/LoginForm";
import SignupForm from "./../SignUpForm/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../reducers/authReducer";

// Hooks
import useAuthBlurState from "../../hooks/useAuthBlurState.js";

function Navbar() {
  const { authState, blurText } = useAuthBlurState();

  const dispatch = useDispatch();
  const signupAction = () => {
    dispatch(signup());
  };
  const loginButtonAction = () => {
    dispatch(login());
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
        <NavButton linkTo={"/books"}>Books</NavButton>
        <NavButton linkTo={"/contact"}>Contact</NavButton>
        <NavButton linkTo={"/aboutus"}>About us</NavButton>
      </div>
      <div className="right">
        <Button width={"80px"} height={"30px"} clickAction={loginButtonAction}>
          Login
        </Button>
        <Button width={"80px"} height={"30px"} clickAction={signupAction}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

import "./Navbar.scss";

import React, { useContext } from "react";

// Images
import LibraryIcon from "./../../assets/LibraryIcon.png";

// Components
import Button from "./../Button/Button";
import NavButton from "./../NavButton/NavButton";
import { useDispatch } from "react-redux";
import { login } from "../../Reducers/authReducer";

function Navbar() {
  const dispatch = useDispatch();

  const loginButtonAction = () => {
    dispatch(login());
  };

  return (
    <div className="mainNavbar">
      <div className="left">
        <img className="libraryIcon" src={LibraryIcon} alt={LibraryIcon} />
        <div className="logoName">
          <p className="logoName1">Modern </p>
          <p className="logoName2"> Library</p>
        </div>
      </div>
      <div className="middle">
        <NavButton>Home</NavButton>
        <NavButton>Contact</NavButton>
        <NavButton>About us</NavButton>
      </div>
      <div className="right">
        <Button width={"80px"} height={"30px"} clickAction={loginButtonAction}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Navbar;

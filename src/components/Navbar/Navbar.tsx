import React, { MouseEventHandler, useEffect, useState } from "react";
import "./Navbar.scss";

// MUI
import MyButton from "./../Button/Button";
import Searchbar from "../Searchbar/Searchbar";
import Button2 from "../Button2/Button2";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  let searchStyle: React.CSSProperties = { backgroundColor: searchOpen ? "red" : "blue" };

  useEffect(() => {
    let searchExtension = document.getElementsByClassName("searchBarOutline");
  });

  const changeColor = (e: MouseEventHandler<HTMLInputElement>) => {
    console.log(e);
  };

  return (
    <div className="navbarMain">
      <div className="navigation">
        <div className="left">
          <div className="buttons">
            <Button2>Home</Button2>
            <Button2>Info</Button2>
            <Button2>Contact</Button2>
          </div>
        </div>
        <div className="right">
          <div className="container">
            <Searchbar />
            <MyButton width={80} height={32} bcolor={"rgb(84, 13, 177)"}>
              Login
            </MyButton>
          </div>
        </div>
      </div>
      {/* <div className="searchBarOutline"></div> */}
    </div>
  );
}

export default Navbar;

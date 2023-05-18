import React from "react";
import "./Navbar.scss";

// MUI
import Button from "@mui/material/Button";
import Searchbar from "../Searchbar/Searchbar";

function Navbar() {
  return (
    <div className="navbarMain">
      <div className="left">
        <div className="buttons">
          <Button variant="contained" size="small">
            Home
          </Button>
          <Button variant="contained" size="small">
            Info
          </Button>
          <Button variant="contained" size="small">
            Contact
          </Button>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <Searchbar />
          <Button variant="contained" size="small">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import "./NavButton.scss";
import React from "react";

function NavButton({ children }) {
  return (
    <div className="mainNavButton">
      <p>{children}</p>
    </div>
  );
}

export default NavButton;

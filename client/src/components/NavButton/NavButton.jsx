import "./NavButton.scss";
import React from "react";
import { createBrowserRouter, RouterProvider, Route, Link, useLocation } from "react-router-dom";

function NavButton({ children, linkTo }) {
  const currentBrowserLocation = useLocation();

  return (
    <div className="mainNavButton">
      <div className="background">
        <div className={`foreground ${currentBrowserLocation.pathname == linkTo ? "selected" : ""}`}>
          <Link className="link" to={linkTo}>
            {children}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavButton;

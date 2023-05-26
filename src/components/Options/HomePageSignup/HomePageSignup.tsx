import React, { useState } from "react";
import Button from "./../../Button/Button";
import "./HomePageSignup.scss";
import Button2 from "../../Button2/Button2";

function HomePageSignup() {
  const [email, setEmail] = useState<string>("");
  return (
    <div className="homepageSignupMain">
      <div className="content">
        <input
          className="emailInput"
          placeholder="Enter e-mail."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button className="btn">Sign-up</button>
      </div>
      <div className="blur"></div>
    </div>
  );
}

export default HomePageSignup;

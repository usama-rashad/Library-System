import "./PersonCard.scss";

import React from "react";

function PersonCard({ picture, name, position }) {
  return (
    <div className="mainPersonCard">
      <div className="inner">
        <img src={picture} />
        <p>{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
}

export default PersonCard;

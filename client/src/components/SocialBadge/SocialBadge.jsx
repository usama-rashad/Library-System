import "./SocialBadge.scss";
import React from "react";

function SocialBadge({ badgecolor, faclass }) {
  React.useEffect(() => {
    let bagdeElement = document.getElementsByClassName(faclass)[0];
    bagdeElement.style.color = badgecolor;
    let swipeElement = document.getElementsByClassName(`${faclass} swipe`)[0];
    swipeElement.style.backgroundColor = badgecolor;
  }, []);

  return (
    <div className="mainSocialBadge">
      <i id="badge" className={faclass}></i>
      <div className={`${faclass} swipe`}></div>
    </div>
  );
}

export default SocialBadge;

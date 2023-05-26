import React from "react";
import "./Title.scss";
import BookshelfPic from "./../../assets/bookshelf.jpg";
import HomePageSignup from "../Options/HomePageSignup/HomePageSignup";

function Title() {
  return (
    <div className="titleMain">
      <div className="title">
        <div className="top">
          <p className="mainTitle1">
            Mainland <em>Technical</em>
          </p>
          <p className="mainTitle2">Library</p>
        </div>
        <p className="subTitle">Your gateway to knowledge.</p>
        <HomePageSignup />
      </div>
      <img src={BookshelfPic} alt={BookshelfPic} />
    </div>
  );
}

export default Title;

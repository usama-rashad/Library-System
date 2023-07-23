import "./HomePageDailyMessage.scss";

import React from "react";

function HomePageDailyMessage({ dailyMessage, author }) {
  return (
    <div className="mainHomePageDailyMessage">
      <div className="welcomeBox">
        <p className="welcomeMessage1">Welcome to the Modern</p>
        <p className="welcomeMessage2">Library</p>
      </div>
      <div className="messageBox">
        <p className="message">{dailyMessage}</p>
        <p className="author">{author}</p>
      </div>
    </div>
  );
}

export default HomePageDailyMessage;

import "./App.scss";
import React, { useEffect, useState } from "react";

// Components
import Navbar from "../../components/UI/Navbar/Navbar";

import HomePageSearch from "../../components/UI/HomePageSearch/HomePageSearch";
import HomePageDailyMessage from "../../components/UI/HomePageDailyMessage/HomePageDailyMessage";

// Hooks
import useAuthBlurState from "../../hooks/useAuthBlurState.js";

// Images
import backgroundImage from "./../../assets/library.png";
import { useSelector } from "react-redux";

function App() {
  const { blurState, blurText } = useAuthBlurState();

  return (
    <div className="mainApp">
      <div className={`top ${blurText}`}>
        <Navbar />
      </div>
      <div className={`bottom ${blurText}`}>
        <div className="searchBox">
          <HomePageSearch />
        </div>
        <div className="dailyMessage">
          <HomePageDailyMessage
            dailyMessage={"Everything you need for a better future and success has already been written. All you have to do is go to library."}
            author={"Henri Frederic Ameil"}
          />
        </div>
        <div className="background">
          <img className="backgroundImage" src={backgroundImage} alt={backgroundImage} />
        </div>
      </div>
    </div>
  );
}

export default App;

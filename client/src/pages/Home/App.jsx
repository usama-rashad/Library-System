import "./App.scss";
import React, { useEffect, useState } from "react";

// Components
import Navbar from "../../components/UI/Navbar/Navbar";

import HomePageSearch from "../../components/UI/HomePageSearch/HomePageSearch";
import HomePageDailyMessage from "../../components/UI/HomePageDailyMessage/HomePageDailyMessage";

// Hooks
import useAuthBlurState from "../../hooks/useAuthBlurState.js";
import useGeolocation from "../../hooks/useGeoLocation.js";

// Images
import backgroundImage from "./../../assets/library.png";
import { useSelector } from "react-redux";

function App() {
  const { error, data } = useGeolocation();
  const { blurState, blurText } = useAuthBlurState();

  useEffect(() => {
    console.log("Geo-location data " + JSON.stringify(data));
    console.log("Geo-location error " + JSON.stringify(error));
  });

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
            dailyMessage={
              "Everything you need for a better future and success has already been written. All you have to do is go to library."
            }
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

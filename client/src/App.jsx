import "./App.scss";
import React, { useEffect, useState } from "react";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePageSearch from "./components/HomePageSearch/HomePageSearch";
import HomePageDailyMessage from "./components/HomePageDailyMessage/HomePageDailyMessage";

// Images
import backgroundImage from "./assets/library.png";
import { useSelector } from "react-redux";

function App() {
  const [blurState, setBlurState] = useState("");
  const [loginState, setLoginState] = useState("disable");

  const authState = useSelector((state) => state.state);

  useEffect(() => {
    if (authState == 0) {
      setBlurState("");
      setLoginState("disable");
    } else {
      setBlurState("looseFocus");
      setLoginState("");
    }
  }, [authState]);

  return (
    <div className="mainApp">
      <div className={`loginForm ${loginState}`}>
        <LoginForm />
      </div>
      <div className={`top ${blurState}`}>
        <Navbar />
      </div>
      <div className={`bottom ${blurState}`}>
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

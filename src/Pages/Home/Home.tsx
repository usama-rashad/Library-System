import React from "react";
import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";
import Title from "../../components/Title/Title";

function Home() {
  return (
    <div className="appHome">
      <Navbar />
      <Title />
    </div>
  );
}

export default Home;

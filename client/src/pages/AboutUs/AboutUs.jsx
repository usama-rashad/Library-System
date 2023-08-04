import "./AboutUs.scss";
import React from "react";
import useAuthBlurState from "../../hooks/useAuthBlurState.js";

import backgroundImage from "./../../assets/library.png";

// Components
import Navbar from "../../components/UI/Navbar/Navbar";

function AboutUs() {
  const { authState, blurText } = useAuthBlurState();

  return (
    <div className="mainAboutUs">
      <div className="aboutusTop">
        <Navbar />
      </div>
      <div className={`aboutusBottom ${blurText}`}>
        <div className="background">
          <img className="backgroundImage" src={backgroundImage} />
        </div>
        <div className="text">
          <p className="title">Who we are</p>

          <p className="aboutUsMessage">
            Welcome to our digital library! We are a passionate team of book lovers, technologists, and educators, dedicated to providing a vast collection of knowledge and
            literature to readers from all walks of life. Our mission is to make the world's knowledge accessible to everyone, regardless of location or resources. With a diverse
            range of books, research papers, articles, and educational resources, we strive to inspire and empower individuals to expand their horizons, spark their curiosity, and
            foster a love for lifelong learning. Whether you're a student, a researcher, or simply a curious mind, we invite you to embark on a journey of exploration and discovery
            with us. Join our vibrant community and let's explore the endless world of ideas together.
          </p>
          <p className="callToAction">&#128070; Sign up today &#128070;</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

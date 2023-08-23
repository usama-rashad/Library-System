import "./Contact.scss";
import React, { useEffect } from "react";

// Components
import Navbar from "../../components/UI/Navbar/Navbar";
import PersonCard from "../../components/UI/PersonCard/PersonCard";
import Button from "../../components/UI/Button/Button";

// Hooks
import useAuthBlurState from "../../hooks/useAuthBlurState.js";

function Contact() {
  const { authState, blurText } = useAuthBlurState();

  return (
    <div className="mainContact">
      <div className="contactsTop">
        <Navbar />
      </div>
      <div className={`contactsBottom ${blurText}`}>
        <div className="left">
          <p className="title">The People</p>
          <div className="peopleGrid">
            <PersonCard
              picture={"https://randomuser.me/api/portraits/women/86.jpg"}
              name={"Jean Coleman"}
              position={"Managment"}
            />
            <PersonCard
              picture={"https://randomuser.me/api/portraits/men/29.jpg"}
              name={"Ian Graham"}
              position={"Accounting"}
            />
            <PersonCard
              picture={"https://randomuser.me/api/portraits/women/85.jpg"}
              name={"Jean Johnston"}
              position={"Logistics"}
            />
            <PersonCard
              picture={"https://randomuser.me/api/portraits/men/33.jpg"}
              name={"Julio Phillips"}
              position={"Assistance"}
            />
          </div>
        </div>
        <div className="right">
          <p className="title">Contact</p>
          <div className="form">
            <p className="fieldName">Your name</p>
            <input className="fieldInput" />
            <p className="fieldName">E-mail</p>
            <input className="fieldInput" />
            <p className="fieldName">Subject</p>
            <input className="fieldInput" />
            <p className="fieldName">Message</p>
            <textarea className="messageInput" />
          </div>
          <Button>
            <p>Submit</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;

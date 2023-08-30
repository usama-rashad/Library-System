import "./ModalWindow.scss";

import React from "react";

function ModalWindow({ children, open, closeAction }) {
  const closeModal = () => {
    closeAction();
  };
  return (
    <div className={`mainModalWindow ${open ? "open" : "close"}`}>
      <div className="closeButton" onClick={closeModal}>
        <p className="closeText">x</p>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default ModalWindow;

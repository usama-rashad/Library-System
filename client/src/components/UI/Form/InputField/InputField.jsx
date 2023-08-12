import { isAlphabetsOnly, isDigitsOnly } from "../../../../utility/InputValidation";
import "./InputField.scss";

import React, { useState } from "react";

function InputField({ label, placeholder, type, updateValue, validationHint }) {
  const [currentValue, setCurrentValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const update = (e) => {
    setCurrentValue(e);

    if (validateInput(Array.from(e))) {
      updateValue(e);
      setValidationMessage("");
    } else {
      setValidationMessage(validationHint);
      setCurrentValue("");
    }
  };

  const validateInput = (e) => {
    if (type === "text") {
      if (isAlphabetsOnly(e)) {
        return true;
      } else {
        return false;
      }
    } else if (type === "number") {
      if (isDigitsOnly(e)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="mainInputField">
      <p>{label}</p>
      <input placeholder={placeholder} type={type} value={currentValue} onChange={(e) => update(e.target.value)} />
      <p className="message">{validationMessage}</p>
    </div>
  );
}

export default InputField;

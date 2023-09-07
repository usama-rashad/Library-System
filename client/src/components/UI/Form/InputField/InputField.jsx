import "./InputField.scss";

import React, { useEffect, useState } from "react";
import { isAlpha, isNumeric } from "validator";

function InputField({ label, placeholder, type, source, updateValue, validationHint, showLabel = true }) {
  const [currentValue, setCurrentValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    setCurrentValue(source);
  }, [source]);

  const updateCurrentValue = (e) => {
    if (e.length > 0) {
      if (validateInput(e)) {
        finalUpdate(e);
        setValidationMessage("");
      } else {
        setValidationMessage(validationHint);
      }
    } else {
      finalUpdate(e);
      setValidationMessage("");
    }
  };

  const finalUpdate = (e) => {
    setCurrentValue(e);
    updateValue(e);
  };

  const validateInput = (e) => {
    if (type === "text") {
      if (isAlpha(e.toString(), "en-US", { ignore: " " })) {
        return true;
      } else {
        return false;
      }
    } else if (type === "number") {
      if (isNumeric(e.toString())) {
        return true;
      } else {
        return false;
      }
    } else if (type === "ISBN") {
      if (isNumeric(e.toString()) && e.toString().length <= 13) {
        return true;
      } else {
        return false;
      }
    } else if (type === "any") {
      return true;
    }
  };

  return (
    <div className="mainInputField">
      {showLabel && <p>{label}</p>}
      <input placeholder={placeholder} value={currentValue} onChange={(e) => updateCurrentValue(e.target.value)} />
      <p className="message">{validationMessage}</p>
    </div>
  );
}

export default InputField;

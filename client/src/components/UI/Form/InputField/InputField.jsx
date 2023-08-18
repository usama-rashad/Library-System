import "./InputField.scss";

import React, { useEffect, useState } from "react";
import { isAlpha, isNumeric } from "validator";

function InputField({ label, placeholder, type, source, updateValue, validationHint, enableQuickSelect = false }) {
  const [currentValue, setCurrentValue] = useState("");
  const [qs, setQs] = useState(false); // qs = quick select
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    setQs(enableQuickSelect);
  }, [enableQuickSelect]);

  useEffect(() => {
    update(source);
  }, [source]);

  const update = (e) => {
    if (e.length > 0) {
      if (validateInput(e)) {
        updateValue(e);
        setValidationMessage("");
        setCurrentValue(e);
      } else {
        setValidationMessage(validationHint);
      }
    } else {
      setCurrentValue(e);
      setValidationMessage("");
      updateValue(e);
    }
  };

  const validateInput = (e) => {
    if (type === "text") {
      if (isAlpha(e.toString())) {
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
      <p>{label}</p>
      <input placeholder={placeholder} value={currentValue} onChange={(e) => update(e.target.value)} />
      <p className="message">{validationMessage}</p>
      {qs && (
        <div className="quickSelect">
          <button onClick={() => setCurrentValue(1)}>1</button>
          <button onClick={() => setCurrentValue(2)}>2</button>
          <button onClick={() => setCurrentValue(3)}>3</button>
          <button onClick={() => setCurrentValue(4)}>4</button>
          <button onClick={() => setCurrentValue(5)}>5</button>
          <button onClick={() => setCurrentValue(6)}>6</button>
          <button onClick={() => setCurrentValue(7)}>7</button>
          <button onClick={() => setCurrentValue(8)}>8</button>
          <button onClick={() => setCurrentValue(9)}>9</button>
        </div>
      )}
    </div>
  );
}

export default InputField;

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
    setCurrentValue(source);
  }, [source]);

  const update = (e) => {
    if (e.length > 0) {
      if (validateInput(e)) {
        qsAction(e);
        setValidationMessage("");
      } else {
        setValidationMessage(validationHint);
      }
    } else {
      qsAction(e);
      setValidationMessage("");
    }
  };

  const qsAction = (e) => {
    setCurrentValue(e);
    updateValue(e);
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
          <button onClick={() => qsAction(1)}>1</button>
          <button onClick={() => qsAction(2)}>2</button>
          <button onClick={() => qsAction(3)}>3</button>
          <button onClick={() => qsAction(4)}>4</button>
          <button onClick={() => qsAction(5)}>5</button>
          <button onClick={() => qsAction(6)}>6</button>
          <button onClick={() => qsAction(7)}>7</button>
          <button onClick={() => qsAction(8)}>8</button>
          <button onClick={() => qsAction(9)}>9</button>
        </div>
      )}
    </div>
  );
}

export default InputField;

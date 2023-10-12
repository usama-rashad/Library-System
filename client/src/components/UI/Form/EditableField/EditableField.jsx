import "./EditableField.scss";

import React, { useEffect, useState } from "react";

function EditableField({ label, initialValue, updateCb }) {
  const [fieldLabel, setFieldLabel] = useState(label);
  const [inputValue, setInputValue] = useState(initialValue);
  const [editMode, setEditMode] = useState(false);

  // Initial value changed
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Enter key press
  useEffect(() => {
    document.addEventListener("keyup", detectEnterPress);
    return () => {
      document.removeEventListener("keyup", detectEnterPress);
    };
  }, []);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const detectEnterPress = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (!editMode) {
      if (typeof updateCb === "function") updateCb(inputValue);
    }
  }, [editMode]);

  return (
    <div className="mainEditableField">
      <p className="labelText">{label}</p>
      <div className="inputs">
        {editMode && (
          <input placeholder={inputValue} className="editableInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        )}
        {!editMode && <p className="editableLabel">{inputValue}</p>}
      </div>
      <button className={`toggleEdit ${editMode ? "apply" : "edit"}`} onClick={toggleEditMode}>
        {editMode ? "Apply" : "Edit"}
      </button>
    </div>
  );
}

export default EditableField;

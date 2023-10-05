import "./AddUsers.scss";

// This component will not be used since users will have to signup on the home page to add themselves
// The admins can only delete users

import React, { useState } from "react";

//Components
import Button from "../../../UI/Button/Button";
import InputField from "../../../UI/Form/InputField/InputField";

function AddUsers() {
  const [addBookFormData, setAddBookFormData] = useState({
    ISBN: "", // Store the ISBN as 13 digits. No hyphen.
    title: "",
    author: "",
    description: "",
  });
  return (
    <div className="mainAddUsers">
      <div className="pageLayout">
        <p className="dashTitle">Add a new user</p>
        <div className="fieldGrid">
          <div className="col1">
            <InputField
              label="First Name"
              placeholder={"Enter name"}
              type={"text"}
              validationHint={"Can only be letters."}
              source={addBookFormData.ISBN}
              updateValue={(e) => updateISBN(e)}
            />
            <InputField
              label="Title"
              placeholder={"Enter title"}
              type={"any"}
              validationHint={""}
              source={addBookFormData.title}
              updateValue={(e) => updateTitle(e)}
            />
            <InputField
              label="Author"
              placeholder={"Enter author name"}
              type={"text"}
              validationHint={"Can only be letters"}
              source={addBookFormData.author}
              updateValue={(e) => updateAuthor(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUsers;

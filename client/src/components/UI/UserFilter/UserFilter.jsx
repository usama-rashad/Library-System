import "./UserFilter.scss";

import React, { useEffect, useState, useContext } from "react";

// Components
import InputField from "../Form/InputField/InputField";
import Button from "../Button/Button";

// Reducer
import { useDispatch } from "react-redux";
import { getUsersByFirstName, clearUsers } from "../../../reducers/updateUsersReducer.js";
import { deleteUsersAsyncThunk } from "../../../reducers/deleteUsersReducer";
import { clearList, addToList, removeFromList } from "../../../reducers/UserEmailListReducer";

// Hooks
import useUserEmailList from "../../../hooks/useUserEmailList";
import useLoginState from "../../../hooks/useLoginState";

function UserFilter({ showDeleteButton }) {
  const [username, setUsername] = useState("");
  const { emailList, isEmpty } = useUserEmailList();
  const dispatch = useDispatch();
  const { name } = useLoginState();

  const updateSearchUsername = (e) => {
    setUsername(e);
  };

  const startSearch = () => {
    dispatch(clearUsers());
    dispatch(getUsersByFirstName({ firstname: username }));
    dispatch(clearList());
  };

  const deleteUsersByEmail = () => {
    console.log(`Deleting users ${usersList}`);
    dispatch(deleteUsersAsyncThunk({ username: name, emailList: emailList }));
    dispatch(clearList());

    setTimeout(() => {
      dispatch(clearUsers());
      dispatch(getUsersByFirstName({ firstName: username }));
    }, 1000);
  };

  return (
    <div className="mainUserFilter">
      <div className="left">
        <p id="titleText">Filter options</p>
        <InputField
          showLabel={false}
          label={"First Name"}
          placeholder={`Enter name`}
          type={"text"}
          validationHint={"Letters only."}
          source={username}
          updateValue={(e) => updateSearchUsername(e)}
        />
        <button id="searchButton" onClick={startSearch}>
          Search
        </button>
      </div>
      <div className="right">
        {showDeleteButton && (
          <Button enable={!isEmpty} clickAction={deleteUsersByEmail}>
            <p>Delete</p>
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserFilter;

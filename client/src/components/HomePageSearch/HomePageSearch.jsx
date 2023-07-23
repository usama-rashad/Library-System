import "./HomePageSearch.scss";
import React from "react";
import Button from "./../Button/Button";
import { useDispatch } from "react-redux";
import { signup } from "../../Reducers/authReducer";

function HomePageSearch() {
  const dispatch = useDispatch();
  const signupAction = () => {
    dispatch(signup());
  };
  return (
    <div className="mainHomePageSearch">
      <div className="search">
        <input placeholder="Search..." className="searchText" />
      </div>
      <Button width={"80px"} height={"30px"} clickAction={signupAction}>
        Sign up
      </Button>
    </div>
  );
}

export default HomePageSearch;

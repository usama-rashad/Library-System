import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React, { LegacyRef, MouseEventHandler, useEffect, useRef, useState } from "react";
import "./Searchbar.scss";

function Searchbar() {
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputClicked = () => {
    console.log("Input clicked");
    setIsClicked(true);
  };
  const inputUnClicked = () => {
    console.log("Input unclicked");
    setIsClicked(false);
  };

  useEffect(() => {
    inputRef.current?.addEventListener("click", inputClicked);
    inputRef.current?.addEventListener("blur", inputUnClicked);
    return () => {
      inputRef.current?.removeEventListener("click", inputClicked);
      inputRef.current?.removeEventListener("blur", inputUnClicked);
    };
  });

  return (
    <div className="searchbarMain">
      <input ref={inputRef} placeholder="Search" />
      <Button disableRipple startIcon={<SearchIcon />} />
    </div>
  );
}

export default Searchbar;

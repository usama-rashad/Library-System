import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";
import "./Searchbar.scss";

function Searchbar() {
  return (
    <div className="searchbarMain">
      <input placeholder="Search" />
      <Button disableRipple startIcon={<SearchIcon />} />
    </div>
  );
}

export default Searchbar;

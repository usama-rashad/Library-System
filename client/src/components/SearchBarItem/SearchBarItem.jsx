import "./SearchBarItem.scss";
import React, { useEffect, useState } from "react";

function SearchBarItem({ itemName, boldCount }) {
  const [boldStyleName, setBoldStyleName] = useState("");
  const [normalStyleName, setNormalStyleName] = useState("");

  useEffect(() => {
    let resultName = itemName;
    setBoldStyleName(String(resultName).slice(0, boldCount));
    setNormalStyleName(String(resultName).slice(boldCount));
  }, [itemName, boldCount]);

  return (
    <div className="mainSearchBarItem">
      <p className="boldName">{boldStyleName}</p>
      <p className="normalName">{normalStyleName}</p>
    </div>
  );
}

export default SearchBarItem;

import React from "react";
import "./SearchFilter.scss";
import { parameterList as FilterParameters } from "./../../data";

/* Create a search filter layout based on the parameters list */

function SearchFilter() {
  console.table(FilterParameters);
  return (
    <div className="mainSearchFilter">
      <p className="titleText">Search Filter</p>
      {/* Show all the parameters in a list  */}
      {FilterParameters.map((parameter) => {
        switch (parameter.type) {
          case "option":
            <div className="parameter">
              <p className="parameterText">{parameter.parameter}</p>
              {/* List the options */}
            </div>;
            break;
          case "string":
            return (
              <div className="parameter">
                <p className="parameterText">{parameter.parameter}</p>
                <input className="parameterValue" placeholder={parameter.value} />
              </div>
            );
            break;
        }
      })}
    </div>
  );
}

export default SearchFilter;

import { createContext, useContext, useEffect, useState } from "react";

let ISBNList = [];

const ISBNListContext = createContext({ ISBNList, setISBNList: () => {} });

export const ISBNListProvider = ({ children }) => {
  const [ISBNList, setISBNList] = useState([]);

  return <ISBNListContext.Provider value={{ ISBNList: ISBNList, setISBNList: setISBNList }}>{children}</ISBNListContext.Provider>;
};

export default ISBNListContext;

import { useEffect, useState } from "react";

const useArray = (initialValue) => {
  const [array, setArray] = useState(initialValue);
  const [length, setLength] = useState(0);

  const push = (input) => {
    setArray([...array, input]);
  };
  const remove = () => {
    setArray([...array.splice(0, array.length - 1)]);
  };

  useEffect(() => {
    setLength(array.length);
  }, [array]);

  return { array, setArray, push, remove, length };
};

export default useArray;

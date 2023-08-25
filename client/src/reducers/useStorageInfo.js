import { useEffect, useState } from "react";

const useStorageInfo = (initialValue) => {
  const [array, setArray] = useState(initialValue);
  const [length, setLength] = useState();

  const push = (input) => {
    setArray([...array, input]);
  };
  const remove = () => {
    setArray([...array.splice(0, array.length - 1)]);
  };
  const updateRow = (data, index) => {
    let newRow = data;
    array.splice(index, 1, newRow);
    setArray([...array]);
  };

  useEffect(() => {
    setLength(array.length);
  }, [array]);

  return { array, push, remove, length, updateRow };
};

export default useStorageInfo;

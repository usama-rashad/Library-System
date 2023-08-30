import { useEffect, useState } from "react";
import { produce } from "immer";

const useArray = (initialValue) => {
  const [array, setArray] = useState(initialValue);
  const [length, setLength] = useState(0);

  const push = (input) => {
    setArray([...array, input]);
  };
  const remove = () => {
    setArray([...array.splice(0, array.length - 1)]);
  };
  const update = (value, index) => {
    let modifiedArray = produce(array, (draft) => {
      draft[index] = value;
    });
    setArray(modifiedArray);
  };
  const clear = () => {
    setArray([]);
  };

  useEffect(() => {}, [array]);

  useEffect(() => {
    setLength(array.length);
  }, [array]);

  return { array, setArray, push, remove, update, length, clear };
};

export default useArray;

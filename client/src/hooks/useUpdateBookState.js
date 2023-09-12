import { useDispatch, useSelector } from "react-redux";

const useUpdateBookState = () => {
  const { success, fail, pending, message, state, books } = useSelector((state) => state.updateBooks);
  return { success, fail, pending, message, state, books };
};

export default useUpdateBookState;

import { useDispatch, useSelector } from "react-redux";

const useAddBookState = () => {
  const { success, fail, pending, message, state } = useSelector((state) => state.addBooks);
  return { success, fail, pending, message, state };
};

export default useAddBookState;

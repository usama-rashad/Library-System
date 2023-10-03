import { useDispatch, useSelector } from "react-redux";

const useUpdateUsersState = () => {
  const { success, fail, pending, message, state, users } = useSelector((state) => state.updateUsers);
  return { success, fail, pending, message, state, users };
};

export default useUpdateUsersState;

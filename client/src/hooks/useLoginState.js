import { useDispatch, useSelector } from "react-redux";

const useLoginState = () => {
  const { username, thumbnail, isLoggedIn, isAdmin, name } = useSelector((state) => state.auth);
  return { username, thumbnail, isLoggedIn, isAdmin, name };
};

export default useLoginState;

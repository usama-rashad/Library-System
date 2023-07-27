import { useDispatch, useSelector } from "react-redux";

const useLoginState = () => {
  const { username, thumbnail, isLoggedIn } = useSelector((state) => state.auth);
  return { username, thumbnail, isLoggedIn };
};

export default useLoginState;

import { useDispatch, useSelector } from "react-redux";

const useLoginState = () => {
  const { username, thumbnail, isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  return { username, thumbnail, isLoggedIn, isAdmin };
};

export default useLoginState;

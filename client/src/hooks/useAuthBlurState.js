import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import rootStore from "../stores/rootStore";

const useAuthBlurState = () => {
  const authState = useSelector((state) => state.loginSignup.state);
  let blurText;
  if (authState !== 0) {
    blurText = "looseFocus";
  } else {
    blurText = "";
  }
  return { authState, blurText };
};

export default useAuthBlurState;

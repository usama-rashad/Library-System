import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthStore from "../stores/authStore";

const useAuthBlurState = () => {
  const authState = useSelector((state) => state.state);
  let blurText;
  if (authState !== 0) {
    blurText = "looseFocus";
  } else {
    blurText = "";
  }
  return { authState, blurText };
};

export default useAuthBlurState;

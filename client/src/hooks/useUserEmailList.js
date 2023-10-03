import { useSelector } from "react-redux";

function useUserEmailList() {
  const { userEmailList, isEmpty } = useSelector((state) => state.userEmailList);

  return { userEmailList, isEmpty };
}

export default useUserEmailList;

import { useSelector } from "react-redux";

function useISBNList() {
  const { ISBNList, isEmpty } = useSelector((state) => state.ISBNList);

  return { ISBNList, isEmpty };
}

export default useISBNList;

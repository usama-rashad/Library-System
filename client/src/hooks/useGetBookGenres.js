import axios from "axios";
import { BOOKS_API, backEndRoot, backEndPort, imagesServerPath } from "../contants.js";
import { useSelector } from "react-redux";

function useGetBookGenres() {
  const { genres } = useSelector((state) => state.getGenres);
  return { genres };
}

export default useGetBookGenres;

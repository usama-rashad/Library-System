import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SearchResults from "./Pages/SearchResults/SearchResults";

/*

Pages :
1) User login 
2) Search results
3) Book search
4) Add book
5) Borrow feature
6) Profile book overview

*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/searchResults",
    element: <SearchResults />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
    element: (
      <div className="appMain">
        <Navbar />
        <Title />
      </div>
    ),
  },
  {
    path: "/searchResults",
    element: (
      <div className="appMain">
        <Navbar />
        <Title />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import rootStore from "./stores/rootStore.js";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";

// Pages
import App from "./pages/Home/App.jsx";
import SearchResults from "./components/SearchResults/SearchResults";
import BooksPage from "./pages/BooksPage/BooksPage";
import Contact from "./pages/Contact/Contact";
import AboutUs from "./pages/AboutUs/AboutUs";

const browseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/searchresults",
    element: <SearchResults />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={rootStore}>
    <RouterProvider router={browseRouter} />
  </Provider>
  // </React.StrictMode>
);

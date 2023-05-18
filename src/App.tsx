import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";

/*

Pages :
1) User login 
2) Search results
3) Book search
4) Add book
5) Borrow feature
6) Profile book overview

*/

function App() {
  return (
    <div className="appMain">
      <Navbar />
      <Title />
    </div>
  );
}

export default App;

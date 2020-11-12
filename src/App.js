import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./travel.png";
import Todos from "./components/Todos";

const App = () => {
  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="bar-holder">
            <p>To-do app for backpackers</p>
            <img src={logo} alt="logo" className="logo" />
          </div>
        </div>
      </div>
      <div className="container">
        <Router>
          <Route path="/" component={Todos} />
        </Router>
      </div>
    </>
  );
};

export default App;

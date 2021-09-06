import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddDevice from "./page/AddDevice";
import Dashboard from "./page/Dashboard";
import UpdateDevice from "./page/UpdateDevice";

function App() {
  return (
    <div className="App container mx-auto">
      <Router>
        <header className="header">
          <Link to="/">
            <img
              className="header__logo"
              src="/asset/img/logo.png"
              alt="Ninja RMM"
            />
          </Link>
        </header>
        <Switch>
          <Route path="/add-device">
            <AddDevice />
          </Route>
          <Route path="/:deviceId">
            <UpdateDevice />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

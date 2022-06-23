import "./App.css";
import Home  from "./components/Home";
import Vehiculo  from "./components/Vehiculo";
import Piloto from "./components/Piloto";
import { BrowserRouter, Route, NavLink, Routes as Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">React JS</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/vehiculo"
              >
                Vehículos
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/piloto"
              >
                Pilotos
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/home" element={< Home />} />
          <Route exact path="/vehiculo" element={<Vehiculo/>} />
          <Route exact path="/piloto" element={<Piloto/>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

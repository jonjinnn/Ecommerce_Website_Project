import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPhone from "./components/add-phone.component";
import Phone from "./components/phone.component";
import PhonesList from "./components/phones-list.component";

class App extends Component {
  render() {
    return (

      <div>
        <div id="logo-bar">
          <div id="title">G11 eCommerce</div>
        </div>

        <nav id="top_nav">
          <Link to={"/phones"} className="navbar-brand">
            MyApp
          </Link>
          <Link to={"/phones"} className="nav-link">
            Phones
          </Link>
          <Link to={"/add"} className="nav-link">
            Add
          </Link>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/phones"]} component={PhonesList} />
            <Route exact path="/add" component={AddPhone} />
            <Route path="/phones/:id" component={Phone} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

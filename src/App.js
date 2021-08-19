import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import PageNotFound from "./components/pageNotFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <menu className="container" style={{ width: "70%", margin: "auto" }}>
          <Switch>
            <Route path="/movies/:movie_id" component={MovieForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegistrationForm}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/not-found" component={PageNotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </menu>
      </React.Fragment>
    );
  }
}

export default App;

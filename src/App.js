import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Form from "./pages/Form";
import Output from "./pages/Output";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/output" component={Output} />
        </Switch>
      </Router>
    );
  }
}

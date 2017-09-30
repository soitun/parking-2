// App is responsible for all the view setup.

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="page-flexbox-wrapper">
        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route render={() => <h3>Not Found</h3>} />
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

// Now the Actions will be available as props inside of App:
// this.props.actionName
export default connect(null, actions)(App);

// App is responsible for all the view setup.

import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import Header from "./Header";
import CreateListing from "./CreateListing";
import Dashboard from "./Dashboard";
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
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/list-spot" component={CreateListing} />
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
export default withRouter(connect(null, actionCreators)(App));

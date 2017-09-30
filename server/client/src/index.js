// This top-level index.js file is responsible for all the Redux setup.

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import "materialize-css/dist/css/materialize.min.css";
import "./Styles.css";

import App from "./components/App";
import reducers from "./reducers";

// The second argument is concerned with server-side rendering stuff.
// Redux Thunk will inspect whatever values we return from the Action Creators,
// which then will be forwarded to the reducers.
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Provider is a React component that knows how to read changes from the
// Redux store. Anytime the Redux store gets some new state produced inside
// of it, the Provider will inform all of its children components (everything
// that App renders) and update all of them with the new state.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

import { App } from "./components/App";

const ConnectedApp = connect(x => x)(App);

const reducer = (state = { modalOpened: false }, action) => {
  switch (action.type) {
    case "OPEN":
      return { ...state, modalOpened: true };
    case "CLOSE":
      return { ...state, modalOpened: false };
    default:
      return state;
  }
};

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <ConnectedApp />
  </Provider>,
  document.querySelector(".container")
);

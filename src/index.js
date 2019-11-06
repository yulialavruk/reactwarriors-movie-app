import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";
import { createStore } from "redux";

const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

const initialState = {
  user: null,
  session_id: null
};

const reducerApp = (state = initialState, action) => {
  console.log("reducer", state, action);
  switch (action.type) {
    case "UPDATE_AUTH":
      console.log("yo");
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id
      };
    default:
      return state;
  }
};

const store = createStore(reducerApp);
console.log(store);
console.log(store.getState());
store.dispatch(
  actionCreatorUpdateAuth({
    user: {
      name: "Yuliia"
    },
    session_id: "text"
  })
);
console.log(store.getState());

ReactDOM.render(<App />, document.getElementById("root"));

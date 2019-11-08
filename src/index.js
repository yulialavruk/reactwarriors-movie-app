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
  switch (action.type) {
    case "UPDATE_AUTH":
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

store.subscribe(() => {
  console.log("change", store.getState());
});

store.dispatch(
  actionCreatorUpdateAuth({
    user: {
      name: "Yuliia"
    },
    session_id: "text"
  })
);

ReactDOM.render(<App store={store} />, document.getElementById("root"));

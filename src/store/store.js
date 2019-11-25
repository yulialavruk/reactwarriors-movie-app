import { createStore } from "redux";
import reducer from "../reducers/combineReducers";

const store = createStore(reducer);

export default store;

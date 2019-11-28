import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerMovies from "./reducerMovies";

const reducers = combineReducers({
  auth: reducerAuth,
  movies: reducerMovies
});

export default reducers;

import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerMovies from "./reducerMovies";

const reducer = combineReducers({
  auth: reducerAuth,
  movies: reducerMovies
});

export default reducer;

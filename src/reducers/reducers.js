import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showLoginModal: false,
  favorite_movies: [],
  watchlist: []
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id
      };
    case "LOGOUT":
      cookies.remove("session_id");
      return {
        initialState
      };
    case "LOGINMODAL":
      return {
        ...state,
        showLoginModal: true
      };
    case "FAVORITEMOVIES":
      return {
        ...state,
        favorite_movies: action.payload.favorite_movies
      };
    case "WATCHMOVIES":
      return {
        ...state,
        watchlist: action.payload.watchlist
      };
    default:
      return state;
  }
};

export default reducerApp;

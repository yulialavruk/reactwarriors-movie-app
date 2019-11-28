const initialState = {
  favorite_movies: [],
  watchlist: []
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case "FAVORITE_MOVIES":
      return {
        ...state,
        favorite_movies: action.payload.favorite_movies
      };
    case "WATCH_MOVIES":
      return {
        ...state,
        watchlist: action.payload.watchlist
      };
    default:
      return state;
  }
};

export default reducerMovies;

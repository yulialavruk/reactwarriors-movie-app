const initialState = {
  favorite_movies: [],
  watchlist: []
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
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

export default reducerMovies;

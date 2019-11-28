import CallApi from "../api/api";

export const actionCreatorGetUser = session_id => {
  return dispatch => {
    CallApi.get("/account", {
      params: {
        session_id
      }
    }).then(user => {
      dispatch({
        type: "GET_USER",
        payload: {
          user,
          session_id
        }
      });
    });
  };
};

export const actionCreatorOnLogOut = session_id => {
  return dispatch => {
    CallApi.delete("/authentication/session", {
      body: {
        session_id
      }
    }).then(() => {
      dispatch({
        type: "LOG_OUT"
      });
    });
  };
};

export const actionCreatorToggleLoginModal = () => {
  return {
    type: "TOGGLE_LOGIN_MODAL"
  };
};

export const actionCreatorGetFavoriteList = (session_id, user_id) => {
  return dispatch => {
    CallApi.get(`/account/${user_id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let favorite_movies = data.results;
      dispatch({
        type: "FAVORITE_MOVIES",
        payload: {
          favorite_movies
        }
      });
    });
  };
};

export const actionCreatorGetWatchList = (session_id, user_id) => {
  return dispatch => {
    return CallApi.get(`/account/${user_id}/watchlist/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let watchlist = data.results;
      dispatch({
        type: "WATCHMOVIES",
        payload: {
          watchlist
        }
      });
    });
  };
};

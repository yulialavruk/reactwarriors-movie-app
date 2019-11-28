import CallApi from "../api/api";

export const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

export const actionCreatorGetUser = session_id => {
  console.log("yo");
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

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const actionCreatorShowLoginModal = () => {
  return {
    type: "LOGINMODAL"
  };
};

export const actionCreatorFavoriteList = payload => {
  return {
    type: "FAVORITEMOVIES",
    payload
  };
};

export const actionCreatorWatchList = payload => {
  return {
    type: "WATCHMOVIES",
    payload
  };
};

export const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
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

import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showLoginModal: false
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id
      };
    case "LOG_OUT":
      cookies.remove("session_id");
      return {
        initialState
      };
    case "TOGGLE_LOGIN_MODAL":
      return {
        ...state,
        showLoginModal: true
      };
    default:
      return state;
  }
};

export default reducerAuth;

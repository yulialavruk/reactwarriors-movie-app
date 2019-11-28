import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  actionCreatorOnLogOut,
  actionCreatorToggleLoginModal,
  actionCreatorGetFavoriteList,
  actionCreatorGetWatchList,
  actionCreatorGetUser
} from "../actions/actions";

export const UserContext = React.createContext();
export const AuthContext = React.createContext();

class App extends React.Component {
  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      console.log("yo");
      this.props.getUser(session_id);
      // .then(() => {
      //   this.getFavoriteList();
      //   this.getWatchList();
      // });
    }
  }

  render() {
    console.log(this.props);
    const {
      user,
      session_id,
      watchlist,
      showLoginModal,
      favorite_movies,
      toggleLoginModal,
      getUser,
      onLogOut,
      getFavoriteList,
      getWatchList
    } = this.props;
    return (
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            getUser,
            favorite_movies,
            getFavoriteList,
            watchlist,
            getWatchList
          }}
        >
          <AuthContext.Provider
            value={{
              session_id,
              onLogOut,
              showLoginModal,
              toggleLoginModal
            }}
          >
            <div>
              <Header />
              <Route exact path="/" component={MoviesPage} />
              <Route path="/movie/:id" component={MoviePage} />
            </div>
          </AuthContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    showLoginModal: state.auth.showLoginModal,
    favorite_movies: state.movies.favorite_movies,
    watchlist: state.movies.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    getUser: session_id => dispatch(actionCreatorGetUser(session_id)),
    toggleLoginModal: () => dispatch(actionCreatorToggleLoginModal()),
    getFavoriteList: (session_id, user_id) =>
      dispatch(actionCreatorGetFavoriteList(session_id, user_id)),
    getWatchList: (session_id, user_id) =>
      dispatch(actionCreatorGetWatchList(session_id, user_id)),
    onLogOut: session_id => dispatch(actionCreatorOnLogOut(session_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

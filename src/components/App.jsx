import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorShowLoginModal,
  actionCreatorFavoriteList,
  actionCreatorWatchList
} from "../actions/actions";

export const UserContext = React.createContext();
export const AuthContext = React.createContext();

class App extends React.Component {
  handleLogOut = () => {
    const { session_id } = this.props;
    CallApi.delete("/authentication/session", {
      body: {
        session_id
      }
    }).then(() => {
      this.props.onLogOut();
    });
  };

  getFavoriteList = () => {
    const { session_id, user } = this.props;
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let favorite_movies = data.results;
      this.props.updateFavoriteList(favorite_movies);
    });
  };

  getWatchList = () => {
    const { session_id, user } = this.props;
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let watchlist = data.results;
      this.props.updateWatchList(watchlist);
    });
  };

  getUser = session_id => {
    return CallApi.get("/account", {
      params: {
        session_id
      }
    });
  };

  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      this.getUser(session_id).then(user => {
        this.props.updateAuth(user, session_id);
        this.getFavoriteList();
        this.getWatchList();
      });
    }
  }

  render() {
    const {
      user,
      session_id,
      watchlist,
      showLoginModal,
      favorite_movies,
      updateAuth,
      toggleLoginModal
    } = this.props;
    return (
      <BrowserRouter basename="/reactwarriors-movie-app">
        <UserContext.Provider
          value={{
            user,
            updateAuth,
            getUser: this.getUser,
            favorite_movies,
            getFavoriteList: this.getFavoriteList,
            watchlist,
            getWatchList: this.getWatchList
          }}
        >
          <AuthContext.Provider
            value={{
              session_id,
              handleLogOut: this.handleLogOut,
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
    updateAuth: (user, session_id) =>
      dispatch(
        actionCreatorUpdateAuth({
          user,
          session_id
        })
      ),
    toggleLoginModal: () => dispatch(actionCreatorShowLoginModal()),
    updateFavoriteList: favorite_movies =>
      dispatch(actionCreatorFavoriteList({ favorite_movies })),
    updateWatchList: watchlist =>
      dispatch(actionCreatorWatchList({ watchlist })),
    onLogOut: () => dispatch(actionCreatorLogOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

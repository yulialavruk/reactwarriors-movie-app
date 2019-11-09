import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorShowLoginModal,
  actionCreatorFavoriteList,
  actionCreatorWatchList
} from "../actions/actions";

export const UserContext = React.createContext();
export const AuthContext = React.createContext();

export default class App extends React.Component {
  updateAuth = (user, session_id) => {
    this.props.store.dispatch(
      actionCreatorUpdateAuth({
        user,
        session_id
      })
    );
  };

  toggleLoginModal = () => {
    this.props.store.dispatch(actionCreatorShowLoginModal());
  };

  handleLogOut = () => {
    const { session_id } = this.props.store.getState();
    CallApi.delete("/authentication/session", {
      body: {
        session_id
      }
    }).then(() => {
      this.props.store.dispatch(actionCreatorLogOut());
    });
  };

  getFavoriteList = () => {
    const { session_id, user } = this.props.store.getState();
    return CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let favorite_movies = data.results;
      this.props.store.dispatch(actionCreatorFavoriteList({ favorite_movies }));
    });
  };

  getWatchList = () => {
    const { session_id, user } = this.props.store.getState();
    return CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      let watchlist = data.results;
      this.props.store.dispatch(actionCreatorWatchList({ watchlist }));
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
    this.props.store.subscribe(() => {
      console.log("change", this.props.store.getState());
      this.forceUpdate();
    });
    const { session_id } = this.props.store.getState();
    if (session_id) {
      this.getUser(session_id).then(user => {
        this.updateAuth(user, session_id);
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
      favorite_movies
    } = this.props.store.getState();
    return (
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            updateAuth: this.updateAuth,
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
              toggleLoginModal: this.toggleLoginModal
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

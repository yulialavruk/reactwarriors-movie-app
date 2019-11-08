import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";

const cookies = new Cookies();

export const UserContext = React.createContext();
export const AuthContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      showLoginModal: false,
      favorite_movies: [],
      watchlist: []
    };
    this.state = { ...this.initialState };
  }

  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id,
      user
    });
  };

  toggleLoginModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  handleLogOut = () => {
    const { session_id } = this.state;
    CallApi.delete("/authentication/session", {
      body: {
        session_id
      }
    }).then(() => {
      this.onLogOut();
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({ ...this.initialState });
  };

  getFavoriteList = () => {
    const { session_id } = this.state;
    return CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      this.setState({
        favorite_movies: data.results
      });
    });
  };

  getWatchList = () => {
    const { session_id } = this.state;
    return CallApi.get(`/account/${this.state.user.id}/watchlist/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      this.setState({
        watchlist: data.results
      });
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
    const session_id = cookies.get("session_id");
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
    } = this.state;
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

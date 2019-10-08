import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const withUser = React.createContext();
export const withAuth = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      showLoginModal: false,
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: "",
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 1
      },
      favorite_movies: [],
      watchlist: []
    };
    this.state = { ...this.initialState };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
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
    this.setState({
      session_id: null,
      user: null,
      showLoginModal: false,
      favorite_movies: [],
      watchlist: []
    });
  };

  onChangeFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePagination = (
    page,
    total_pages = this.state.pagination.total_pages
  ) => {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        page,
        total_pages
      }
    }));
  };

  onReset = () => {
    const { user, session_id, favorite_movies, watchlist } = this.state;
    this.setState({
      ...this.initialState,
      user,
      session_id,
      favorite_movies,
      watchlist
    });
  };

  getFavoriteList = () => {
    const {
      session_id,
      filters: { sort_by },
      pagination: { page }
    } = this.state;
    return CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
      params: {
        session_id,
        language: "ru-RU",
        sort_by,
        page
      }
    }).then(data => {
      this.setState({
        favorite_movies: data.results
      });
    });
  };

  getWatchList = () => {
    const {
      session_id,
      filters: { sort_by },
      pagination: { page }
    } = this.state;
    return CallApi.get(`/account/${this.state.user.id}/watchlist/movies`, {
      params: {
        session_id,
        language: "ru-RU",
        sort_by,
        page
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
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getFavoriteList();
        this.getWatchList();
      });
    }
  }

  render() {
    const {
      filters,
      pagination,
      user,
      session_id,
      watchlist,
      showLoginModal,
      favorite_movies
    } = this.state;
    return (
      <withUser.Provider
        value={{
          user,
          updateUser: this.updateUser,
          getUser: this.getUser,
          favorite_movies,
          getFavoriteList: this.getFavoriteList,
          watchlist,
          getWatchList: this.getWatchList
        }}
      >
        <withAuth.Provider
          value={{
            session_id,
            updateSessionId: this.updateSessionId,
            handleLogOut: this.handleLogOut,
            showLoginModal,
            toggleLoginModal: this.toggleLoginModal
          }}
        >
          <div>
            <Header />
            <div className="container">
              <div className="row mt-4">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h3>Фильтры:</h3>
                      <Filters
                        filters={filters}
                        pagination={pagination}
                        onChangeFilter={this.onChangeFilter}
                        onChangePagination={this.onChangePagination}
                        onReset={this.onReset}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <MoviesList
                    filters={filters}
                    pagination={pagination}
                    onChangePagination={this.onChangePagination}
                  />
                </div>
              </div>
            </div>
          </div>
        </withAuth.Provider>
      </withUser.Provider>
    );
  }
}

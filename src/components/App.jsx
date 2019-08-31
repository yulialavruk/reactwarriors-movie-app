import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: "",
        with_genres: []
      },
      pagination: {
        page: 1,
        total_pages: 1
      },
      favorite_movies: []
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

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null
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
    this.setState({ ...this.initialState });
  };

  getFavoriteList = () => {
    CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
      params: {
        session_id: this.state.session_id,
        language: "ru-RU",
        sort_by: this.state.filters.sort_by,
        page: this.state.pagination.page
      }
    }).then(data => {
      this.setState({
        favorite_movies: data.results
      });
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      })
        .then(user => {
          this.updateUser(user);
          this.updateSessionId(session_id);
        })
        .then(() => {
          return CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
            params: {
              session_id: this.state.session_id,
              language: "ru-RU",
              sort_by: this.state.filters.sort_by,
              page: this.state.pagination.page
            }
          });
        })
        .then(data => {
          this.setState({
            favorite_movies: data.results
          });
        });
    }
  }

  render() {
    const { filters, pagination, user, session_id } = this.state;
    //console.log(this.state.favorite_list);
    return (
      <AppContext.Provider
        value={{
          user,
          session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          favorite_movies: this.state.favorite_movies,
          getFavoriteList: this.getFavoriteList
        }}
      >
        <div>
          <Header user={user} />
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
                  favorite_movies={this.state.favorite_movies}
                  user={user}
                  session_id={session_id}
                  filters={filters}
                  pagination={pagination}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

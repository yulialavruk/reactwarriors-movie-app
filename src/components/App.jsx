import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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
      }
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

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, pagination, user } = this.state;
    return (
      <div>
        <Header
          updateUser={this.updateUser}
          user={user}
          updateSessionId={this.updateSessionId}
        />
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
    );
  }
}

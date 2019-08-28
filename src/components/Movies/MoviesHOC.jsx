import React from "react";
import CallApi from "../../api/api";
import _ from "lodash";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: []
      };
    }

    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
        with_genres: with_genres
      };
      CallApi.get("/discover/movie", {
        params: queryStringParams
      }).then(data => {
        this.props.onChangePagination(page, data.total_pages);
        this.setState({
          movies: data.results
        });
      });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.pagination.page);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.getMovies(this.props.filters, 1);
      }
      if (!_.isEqual(this.props.pagination, prevProps.pagination)) {
        this.getMovies(this.props.filters, this.props.pagination.page);
      }
    }

    render() {
      const { movies } = this.state;
      return <Component movies={movies} />;
    }
  };

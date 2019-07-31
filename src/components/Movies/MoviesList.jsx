import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";
import queryString from 'query-string';

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  };

  getMovies = (filters,page) =>{
    const {sort_by, primary_release_year, with_genres} = filters;
    const queryStringParams = {
      "api_key": API_KEY_3,
      "language": "ru-RU",
      "sort_by": sort_by,
      "page": page,
      "primary_release_year": primary_release_year,
      "with_genres": with_genres
    };
    const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.onChangePage(page, data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.pagination.page);
  };

  componentDidUpdate(prevProps){
    if(!_.isEqual(this.props.filters, prevProps.filters)){
      this.getMovies(this.props.filters, 1);
    }
    if(!_.isEqual(this.props.pagination, prevProps.pagination)){
      this.getMovies(this.props.filters, this.props.pagination.page)
    }
  };

  // componentWillReceiveProps(nextProps){
  //   console.log("props", this.props, "nextProps", nextProps);
  //   if(nextProps.filters.sort_by !== this.props.filters.sort_by){
  //     this.getMovies(nextProps.filters);
  //   }
  // };

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

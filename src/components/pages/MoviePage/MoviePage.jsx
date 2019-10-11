import React from "react";
import CallApi from "../../../api/api";
import { Star, StarBorder } from "@material-ui/icons";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

export default class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: []
    };
  }
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({ movieDetails: data });
    });
  }

  render() {
    console.log(this.state);
    const { movieDetails } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-3">
            <img
              className=""
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt=""
              width="100%"
            />
          </div>
          <div className="col-6">
            <h1>{movieDetails.title}</h1>
            <div className="mb-3">
              <StarBorder />
              <BookmarkBorder />
            </div>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import CallApi from "../../../api/api";

export default class MovieActors extends React.Component {
  constructor() {
    super();

    this.state = {
      movieActors: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.movieId}/credits`).then(data => {
      this.setState({ movieActors: data });
    });
  }

  render() {
    const { movieActors } = this.state;
    return movieActors && movieActors.cast
      ? movieActors.cast.map(item => {
          if (item.profile_path) {
            return (
              <img
                key={item.id}
                className="pr-1"
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt=""
                width="150px"
                height="200px"
              />
            );
          } else {
            return false;
          }
        })
      : "";
  }
}

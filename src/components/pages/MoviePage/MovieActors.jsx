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
    return <div></div>;
  }
}

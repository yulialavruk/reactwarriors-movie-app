import React from "react";
import CallApi from "../../../api/api";

export default class MovieVideo extends React.Component {
  constructor() {
    super();

    this.state = {
      movieVideo: []
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.movieId}/videos`).then(data => {
      this.setState({ movieVideo: data.results });
    });
  }

  render() {
    const { movieVideo } = this.state;
    //console.log(this.state.movieVideo);
    return (
      <div className="row">
        {movieVideo.map(item => (
          <div className="col-6" key={item.id}>
            <iframe
              title="video"
              width="100%"
              height="260"
              src={`https://www.youtube.com/embed/${item.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    );
  }
}

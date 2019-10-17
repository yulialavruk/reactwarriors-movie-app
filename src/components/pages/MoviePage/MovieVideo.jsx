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
    console.log(this.state.movieVideo);
    return movieVideo.map(item => {
      return (
        <div className="col-6" key={item.id}>
          {/* <div className="col-6"> */}
          <iframe
            title="video"
            width="100%"
            height="260"
            src={`https://www.youtube.com/embed/${item.key}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {/* </div> */}
        </div>

        // <div key={item.id} className="d-flex">
        //   <div>
        //     <iframe
        //       title="video"
        //       width="340"
        //       height="260"
        //       src={`https://www.youtube.com/embed/${item.key}`}
        //       frameBorder="0"
        //       allowFullScreen
        //     ></iframe>
        //   </div>
        // </div>
      );
    });
  }
}

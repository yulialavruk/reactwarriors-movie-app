import React from "react";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";
import Loader from "../../UIComponents/Loader";

class MovieVideos extends React.Component {
  constructor() {
    super();

    this.state = {
      movieVideos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    CallApi.get(`/movie/${params.id}/videos`).then(data => {
      this.setState({
        movieVideos: data.results,
        isLoading: false
      });
    });
  }

  render() {
    const { movieVideos, isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <div className="row">
        {movieVideos.map(item => (
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

export default withRouter(MovieVideos);

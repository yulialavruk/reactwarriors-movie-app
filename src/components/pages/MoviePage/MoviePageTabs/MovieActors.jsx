import React from "react";
import { withRouter } from "react-router-dom";
import CallApi from "../../../../api/api";
import Image from "../../../UIComponents/Image";
import Loader from "../../../UIComponents/Loader";

class MovieActors extends React.Component {
  constructor() {
    super();

    this.state = {
      movieActors: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    CallApi.get(`/movie/${params.id}/credits`).then(data => {
      this.setState({
        movieActors: data,
        isLoading: false
      });
    });
  }

  render() {
    const { movieActors, isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <div className="row movie-actors">
        {movieActors.cast.map(
          item =>
            item.profile_path && (
              <div key={item.id} className="col-3 movie-actors__item">
                <Image alt="" path={item.profile_path} />
                <div className="movie-actors__name">
                  <h3>{item.name}</h3>
                  <span>{item.character}</span>
                </div>
              </div>
            )
        )}
      </div>
    );
  }
}
export default withRouter(MovieActors);

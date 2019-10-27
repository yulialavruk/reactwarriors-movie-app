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
      movieActors.cast.map(
        item =>
          item.profile_path && (
            <Image
              key={item.id}
              className="pr-1 pb-1"
              alt=""
              path={item.profile_path}
              width="150px"
              height="200px"
            />
          )
      )
    );
  }
}
export default withRouter(MovieActors);

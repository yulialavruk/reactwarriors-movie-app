import React from "react";
import CallApi from "../../../api/api";
import MoviePageTabs from "./MoviePageTabs/MoviePageTabs";
import Image from "../../UIComponents/Image";
import MovieOverview from "./MovieOverview";
import Loader from "../../UIComponents/Loader";

export default class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: [],
      isLoading: true
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    CallApi.get(`/movie/${params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        movieDetails: data,
        isLoading: false
      });
    });
  }

  render() {
    const { movieDetails, isLoading } = this.state;
    return (
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="row justify-content-center mt-4">
              <div className="col-3">
                <Image path={movieDetails.poster_path} width="100%" alt="" />
              </div>
              <div className="col-6">
                <MovieOverview
                  title={movieDetails.title}
                  overview={movieDetails.overview}
                />
              </div>
            </div>
            <MoviePageTabs movieDetails={movieDetails} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

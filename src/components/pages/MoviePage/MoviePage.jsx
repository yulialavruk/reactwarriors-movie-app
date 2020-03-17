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
    const imgUrl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;
    return isLoading ? (
      <Loader />
    ) : (
      <React.Fragment>
        <section
          className="movie-overview"
          style={{ backgroundImage: `url(${imgUrl})` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-4">
                <Image path={movieDetails.poster_path} width="100%" alt="" />
              </div>
              <div className="col-6">
                <MovieOverview
                  title={movieDetails.title}
                  overview={movieDetails.overview}
                  vote_average={movieDetails.vote_average}
                />
              </div>
            </div>
          </div>
        </section>
        <MoviePageTabs movieDetails={movieDetails} />
      </React.Fragment>
    );
  }
}

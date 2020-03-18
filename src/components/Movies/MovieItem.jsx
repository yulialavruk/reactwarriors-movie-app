import React from "react";
import Favorite from "./Favorite";
import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";
import Image from "../UIComponents/Image";
import Progressbar from "../UIComponents/Progressbar";

class MovieItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="card ">
        <div className="card-body card-movie">
          <div className="card-movie__img">
            <Link to={`/movie/${item.id}/details`}>
              <Image
                className="card-img-top card-img--height"
                alt=""
                path={item.poster_path || item.backdrop_path}
              />
            </Link>
          </div>
          <div className="card-movie__description">
            <div className="card-movie__icons">
              <Progressbar vote_average={item.vote_average} />
              <Favorite movieId={item.id} />
              <WillWatch movieId={item.id} />
            </div>
            <Link
              className="card-title card-movie__name"
              to={`/movie/${item.id}/details`}
            >
              {item.title}
            </Link>
            <div className="card-movie__details">
              <Link to={`/movie/${item.id}/details`}>Подробнее</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;

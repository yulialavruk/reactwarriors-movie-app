import React from "react";
import Favorite from "./Favorite";
import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";

class MovieItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}`}>
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite movieId={item.id} />
          <WillWatch movieId={item.id} />
        </div>
      </div>
    );
  }
}

export default MovieItem;

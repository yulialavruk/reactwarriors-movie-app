import React from "react";
import Favorite from "./Favorite";
import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";
import Image from "../UIComponents/Image";

class MovieItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <Image
          className="card-img-top card-img--height"
          alt=""
          path={item.backdrop_path || item.poster_path}
        />
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}/details`}>
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

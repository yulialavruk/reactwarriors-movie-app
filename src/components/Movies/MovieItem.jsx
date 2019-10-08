import React from "react";
import Favorite from "./Favorite";
import WillWatch from "./WillWatch";

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
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Favorite movieId={item.id} />
          <WillWatch movieId={item.id} />
        </div>
      </div>
    );
  }
}

export default MovieItem;

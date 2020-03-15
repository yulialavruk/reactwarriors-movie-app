import React from "react";
import Favorite from "./Favorite";
import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";
import Image from "../UIComponents/Image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class MovieItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    const percentage = item.vote_average * 10;
    const color = percentage > 70 ? "#21D07A" : "#D0D331";
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
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#081c24",
                  textColor: "#fff",
                  pathColor: color,
                  trailColor: "transparent"
                })}
              />
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

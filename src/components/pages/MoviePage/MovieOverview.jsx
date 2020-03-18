import React from "react";
import Favorite from "../../Movies/Favorite";
import WillWatch from "../../Movies/WillWatch";
import Progressbar from "../../UIComponents/Progressbar";

const MovieOverview = ({ title, overview, vote_average, movieId }) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <div className="movie-overwiew__mark">
        <Progressbar vote_average={vote_average} />
        <Favorite movieId={movieId} />
        <WillWatch movieId={movieId} />
      </div>
      <p>{overview}</p>
    </React.Fragment>
  );
};
export default MovieOverview;

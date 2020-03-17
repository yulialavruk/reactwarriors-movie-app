import React from "react";
import { StarBorder } from "@material-ui/icons";
import { BookmarkBorder } from "@material-ui/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieOverview = ({ title, overview, vote_average }) => {
  const percentage = vote_average * 10;
  const color = percentage > 70 ? "#21D07A" : "#D0D331";
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <div className="mb-3">
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
        <StarBorder />
        <BookmarkBorder />
      </div>
      <p>{overview}</p>
    </React.Fragment>
  );
};
export default MovieOverview;

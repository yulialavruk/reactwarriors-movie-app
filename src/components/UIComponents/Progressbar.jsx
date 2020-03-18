import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progressbar = ({ vote_average }) => {
  const percentage = vote_average * 10;
  const color = percentage > 70 ? "#21D07A" : "#D0D331";
  return (
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
  );
};
export default Progressbar;

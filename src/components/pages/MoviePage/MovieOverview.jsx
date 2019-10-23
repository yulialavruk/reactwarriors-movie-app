import React from "react";
import { StarBorder } from "@material-ui/icons";
import { BookmarkBorder } from "@material-ui/icons";

const MovieOverview = ({ title, overview }) => (
  <React.Fragment>
    <h1>{title}</h1>
    <div className="mb-3">
      <StarBorder />
      <BookmarkBorder />
    </div>
    <p>{overview}</p>
  </React.Fragment>
);
export default MovieOverview;

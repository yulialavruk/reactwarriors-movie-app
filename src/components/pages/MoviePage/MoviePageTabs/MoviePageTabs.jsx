import React from "react";
import { Route, Switch } from "react-router-dom";
import NavTabs from "./NavTabs";
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieActors from "./MovieActors";

export default class MoviePageTabs extends React.Component {
  render() {
    const { movieDetails } = this.props;
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-9">
          <NavTabs />
          <div className="content">
            <Switch>
              <Route path="/movie/:id/details">
                <MovieDetail movieDetails={movieDetails} />
              </Route>
              <Route path="/movie/:id/videos" component={MovieVideos} />
              <Route path="/movie/:id/actors" component={MovieActors} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

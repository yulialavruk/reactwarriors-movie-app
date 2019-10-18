import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MovieVideo from "./MovieVideo";
import MovieActors from "./MovieActors";

export default class MoviePageTabs extends React.Component {
  render() {
    const { movieDetails, movieId } = this.props;
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-9">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink
                to={`/movie/${movieId}/details`}
                className="nav-link"
                activeClassName="active"
              >
                Детали
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/movie/${movieId}/video`} className="nav-link">
                Видео
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/movie/${movieId}/actors`} className="nav-link">
                Актеры
              </NavLink>
            </li>
          </ul>
          <div className="content">
            <Switch>
              <Route path="/movie/:id/details">
                <MovieDetail movieDetails={movieDetails} />
              </Route>
              <Route path="/movie/:id/video">
                <MovieVideo movieId={movieId} />
              </Route>
              <Route path="/movie/:id/actors">
                <MovieActors movieId={movieId} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const tabs = [
  {
    link: "Детали",
    path: "details"
  },
  {
    link: "Видео",
    path: "videos"
  },
  {
    link: "Актеры",
    path: "actors"
  }
];

const NavTabs = ({ match }) => (
  <ul className="nav nav-tabs movie-tabs">
    {tabs.map((item, index) => (
      <li className="nav-item movie-tabs__item" key={index}>
        <NavLink to={`${match.url}/${item.path}`} className="nav-link">
          {item.link}
        </NavLink>
      </li>
    ))}
  </ul>
);
export default withRouter(NavTabs);

import React from "react";
import DefaultImg from "./default-image.png";
//import PropTypes from "prop-types";

const Image = ({ path, ...rest }) =>
  path ? (
    <img src={`https://image.tmdb.org/t/p/w500${path}`} {...rest} alt="" />
  ) : (
    <img src={DefaultImg} {...rest} alt="" />
  );

// Image.propTypes = {
//   path: PropTypes.string.isRequired
// };

export default Image;

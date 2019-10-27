import React from "react";
import PropTypes from "prop-types";

const Image = ({ path, ...rest }) => (
  <img src={`https://image.tmdb.org/t/p/w500${path}`} {...rest} />
);

Image.propTypes = {
  path: PropTypes.string.isRequired
};

export default Image;

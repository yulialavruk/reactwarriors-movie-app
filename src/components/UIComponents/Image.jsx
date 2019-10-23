import React from "react";
import PropTypes from "prop-types";

const Image = ({ className, imagePath, width, height, alt }) => (
  <img
    className={className}
    src={`https://image.tmdb.org/t/p/w500${imagePath}`}
    alt={alt}
    width={width}
    height={height}
  />
);

Image.defaultProps = {
  className: "",
  imagePath: "",
  height: "",
  width: "",
  alt: ""
};

Image.propTypes = {
  imagePath: PropTypes.string.isRequired
};

export default Image;

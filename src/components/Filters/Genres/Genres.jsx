import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";

const Genres = ({ genres, with_genres, onChangeGenres }) => (
  <div>
    <div>Выберите жанр:</div>
    {genres.map(genre => (
      <div className="form-check" key={genre.id}>
        <input
          className="form-check-input"
          type="checkbox"
          id={`genre-${genre.id}`}
          name="with_genres"
          checked={with_genres.includes(String(genre.id))}
          value={genre.id}
          onChange={onChangeGenres}
        />
        <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
          {genre.name}
        </label>
      </div>
    ))}
  </div>
);

Genres.defaultProps = {
  genres: [],
  with_genres: []
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func.isRequired
};
export default GenresHOC(Genres);

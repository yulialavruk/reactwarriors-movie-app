import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";

export default class Genres extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }
  static propTypes = {
    with_genres: PropTypes.array.isRequired,
    onChangeFilter: PropTypes.func.isRequired
  };

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  onChangeGenres = event => {
    const { with_genres } = this.props;
    const check = event.target.checked;
    const value = event.target.value;
    this.props.onChangeFilter({
      target: {
        name: "with_genres",
        value: check
          ? [...with_genres, value]
          : with_genres.filter(genre => Number(genre) !== Number(value))
      }
    });
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
    return (
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
              onChange={this.onChangeGenres}
            />
            <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
              {genre.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

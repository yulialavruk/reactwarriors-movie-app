import React from "react";
import CallApi from "../../../api/api";
import PropTypes from "prop-types";

export default Component =>
  class GenresHOC extends React.PureComponent {
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
      CallApi.get("/genre/movie/list", {
        params: {
          language: "ru-RU"
        }
      }).then(data => {
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
        <Component
          genres={genres}
          with_genres={with_genres}
          onChangeGenres={this.onChangeGenres}
        />
      );
    }
  };

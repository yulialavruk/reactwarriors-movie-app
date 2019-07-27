import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";
import { API_URL, API_KEY_3 } from "../../api/api";
import Genres from "./Genres";

export default class Filters extends React.Component {
  constructor(){
    super();

    this.state = {
      genres: []
    };
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
  };

  render() {
    const {genres} = this.state;
    const {filters: {sort_by, primary_release_year, with_genres}, onChangeFilter, page, onChangePage, onReset} = this.props;
    return (
      <form className="mb-3">
        <div>
          <button
            type="button" 
            className="btn btn-light"
            onClick={onReset}
          >
            Очистить фильтры
          </button>
        </div>
        <SortBy 
          onChangeFilter={onChangeFilter}
          sort_by={sort_by}
        />
        <ReleaseYear 
          onChangeFilter={onChangeFilter}
          primary_release_year={primary_release_year}
        />
        <div className="btn-group">
          <button 
            type="button" 
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null,page-1)}
          >
            Назад
          </button>
          <button 
            type="button" 
            className="btn btn-light"
            onClick={onChangePage.bind(null,page+1)}
          >
            Вперед
          </button>
        </div>
          <Genres 
            genres = {genres}
            onChangeFilter = {onChangeFilter}
            with_genres={with_genres} 
          />
      </form>
    );
  }
}

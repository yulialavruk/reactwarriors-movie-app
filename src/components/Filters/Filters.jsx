import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";

export default class Filters extends React.Component {
  render() {
    const {filters: {sort_by, primary_release_year}, onChangeFilter, page, onChangePage, onReset} = this.props;
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
      </form>
    );
  }
}

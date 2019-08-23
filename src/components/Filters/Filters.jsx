import React from "react";
import SortBy from "./SortBy";
import ReleaseYear from "./ReleaseYear";
import Genres from "./Genres/Genres";
import Pagination from "./Pagination";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      pagination: { page, total_pages },
      onChangeFilter,
      onChangePagination,
      onReset
    } = this.props;
    return (
      <form className="mb-3">
        <div>
          <button type="button" className="btn btn-light" onClick={onReset}>
            Очистить фильтры
          </button>
        </div>
        <SortBy onChangeFilter={onChangeFilter} sort_by={sort_by} />
        <ReleaseYear
          onChangeFilter={onChangeFilter}
          primary_release_year={primary_release_year}
        />
        <Genres onChangeFilter={onChangeFilter} with_genres={with_genres} />
        <Pagination
          onChangePagination={onChangePagination}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}

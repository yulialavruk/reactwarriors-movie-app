import React from "react";
import SortBy from "./SortBy";

export default class Filters extends React.Component {
  render() {
    const {filters: {sort_by}, onChangeFilter, page, onChangePage} = this.props;
    return (
      <form className="mb-3">
        <SortBy 
          onChangeFilter={onChangeFilter}
          sort_by={sort_by}
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

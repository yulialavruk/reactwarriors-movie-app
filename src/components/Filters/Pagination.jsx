import React from "react";
import PropTypes from "prop-types";

export default class Pagination extends React.PureComponent {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangePagination: PropTypes.func.isRequired
  };

  render() {
    const { onChangePagination, page, total_pages } = this.props;
    return (
      <div>
        <div className="btn-group btn-pagination">
          <button
            type="button"
            className="btn mr-2"
            disabled={page === 1}
            onClick={onChangePagination.bind(null, page - 1, total_pages)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn"
            onClick={onChangePagination.bind(null, page + 1, total_pages)}
          >
            Вперед
          </button>
        </div>
        <div className="page-pagination">
          {page} из {total_pages}
        </div>
      </div>
    );
  }
}
